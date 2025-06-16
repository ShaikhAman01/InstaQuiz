import { Server } from 'socket.io'
import { prisma } from '../lib/prisma.js'
import { redisClient } from '../utils/redis.util.js'
import { createAdapter } from '@socket.io/redis-adapter'
import { v4 as uuidv4 } from 'uuid'

// Initialize Redis adapter
const pubClient = redisClient
const subClient = redisClient.duplicate()

// Add error handlers
pubClient.on('error', (err) => console.error('Redis Pub Error:', err))
subClient.on('error', (err) => console.error('Redis Sub Error:', err))

// Use Redis for broadcasting across multiple instances
export const quizSocket = (server: any) => {
  const io: Server = server.io
  // Apply Redis adapter
  io.adapter(createAdapter(pubClient, subClient))
  io.on('connection', async (socket) => {
    console.log('Client connected:', socket.id)
    // Generate stable session ID for reconnect handling
    const sessionId = uuidv4()
    // Store session metadata
    await redisClient.set(`session:${sessionId}:socket`, socket.id)
    // Handle room joining
    socket.on('join_room', async ({ roomId, nickname }) => {
      try {
        // Validate room exists
        const room = await prisma.room.findUnique({ 
          where: { id: roomId },
          include: { players: true }
        })
        if (!room) {
          socket.emit('error', { code: 'ROOM_NOT_FOUND' })
          return
        }
        // Create stable player ID
        const playerId = uuidv4()
        // Store player in Redis for quick access
        await redisClient.hSet(`room:${roomId}:players`, playerId, JSON.stringify({
          nickname,
          socketId: socket.id
        }))
        // Store in PostgreSQL
        await prisma.player.create({
          data: {
            id: playerId,
            nickname,
            roomId,
            score: 0
          }
        })
        // Join room
        socket.join(roomId)
        // Broadcast connection
        io.to(roomId).emit('user_joined', {
          playerId,
          nickname,
          score: 0
        })
        // Set TTL for session cleanup
        await redisClient.expire(`room:${roomId}:players`, 3600) // 1 hour
      } catch (error) {
        console.error('Join room error:', error)
        socket.emit('error', { code: 'INTERNAL_ERROR' })
      }
    })
    // Handle quiz start
    socket.on('start_quiz', async (roomId, quizId) => {
      try {
        // Validate room and quiz
        const room = await prisma.room.findUnique({
          where: { id: roomId },
          include: {
            quiz: {
              include: {
                questions: true
              }
            }
          }
        })
        if (!room || !room.quiz) {
          socket.emit('error', { code: 'INVALID_ROOM_OR_QUIZ' })
          return
        }
        // Start question flow
        sendNextQuestion(io, roomId, room.quiz.questions)
      } catch (error) {
        console.error('Start quiz error:', error)
        socket.emit('error', { code: 'INTERNAL_ERROR' })
      }
    })
    // Handle answer submission
    socket.on('submit_answer', async (data) => {
      const { roomId, playerId, questionId, selected } = data
      try {
        // Get question start time from Redis
        const startTimeStr = await redisClient.get(`question:${questionId}:startTime`)
        if (!startTimeStr) {
          // Question already ended
          socket.emit('error', { code: 'QUESTION_ENDED' })
          return
        }
        const startTime = parseInt(startTimeStr)
        const submissionTime = Date.now()
        const timeTaken = submissionTime - startTime
        const isCorrect = selected === (await prisma.question.findUnique({
          where: { id: questionId }
        }))?.answer
        // Calculate score
        const speedScore = Math.max(0, 1000 - timeTaken)
        const totalScore = isCorrect ? speedScore : 0
        // Update player score in DB
        const updatedPlayer = await prisma.player.update({
          where: { id: playerId },
          data: { score: { increment: totalScore } }
        })
        // Save response
        await prisma.response.create({
          data: {
            id: uuidv4(),
            playerId,
            questionId,
            selected,
            timeTaken,
            isCorrect
          }
        })
        // Store response in Redis for distribution
        await redisClient.hSet(`question:${questionId}:responses`, playerId, selected)
        // Update Redis leaderboard
        await redisClient.zAdd(`leaderboard:${roomId}`, [
          { score: updatedPlayer.score, value: playerId }
        ])
        // Get top 10 players
        const leaderboard = await redisClient.zRangeWithScores(
          `leaderboard:${roomId}`, 0, 9
        )
        // Broadcast update
        io.to(roomId).emit('update_leaderboard', leaderboard.reverse())
      } catch (error) {
        console.error('Answer submission error:', error)
        socket.emit('error', { code: 'INTERNAL_ERROR' })
      }
    })
    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log('Client disconnected:', socket.id)
      // Clean up session data
      await redisClient.del(`session:${sessionId}:socket`)
      // Notify room
      io.emit('user_disconnected', { socketId: socket.id })
    })
    // Handle change nickname
    socket.on('change_nickname', async ({ roomId, playerId, newNickname }) => {
      try {
        await prisma.player.update({
          where: { id: playerId },
          data: { nickname: newNickname }
        })
        io.to(roomId).emit('nickname_updated', {
          playerId,
          nickname: newNickname
        })
      } catch (error) {
        console.error('Change nickname error:', error)
        socket.emit('error', { code: 'INTERNAL_ERROR' })
      }
    })
  })
}

function sendNextQuestion(io: Server, roomId: string, questions: any[], index = 0) {
  if (index >= questions.length) {
    io.to(roomId).emit('quiz_ended')
    return
  }
  const question = questions[index]
  const startTime = Date.now()
  // Store question start time in Redis
  redisClient.setEx(`question:${question.id}:startTime`, 
                   question.timeLimit + 5, // TTL: question time + 5s buffer
                   startTime.toString())
  // Broadcast question
  io.to(roomId).emit('new_question', {
    ...question,
    startTime
  })
  // Fetch and broadcast answer distribution
  setTimeout(async () => {
    const responses = await redisClient.hGetAll(`question:${question.id}:responses`)
    const distribution = Object.values(responses).reduce((acc, choice) => {
      acc[choice] = (acc[choice] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    io.to(roomId).emit('answer_distribution', {
      questionId: question.id,
      distribution
    })

    redisClient.del(`question:${question.id}:responses`) // Clean up
    sendNextQuestion(io, roomId, questions, index + 1)
  }, question.timeLimit * 1000)
}
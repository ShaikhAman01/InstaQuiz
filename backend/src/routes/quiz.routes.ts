import type { FastifyPluginAsync } from 'fastify';
import { createQuiz, addQuestion } from '../services/quiz.service.js'
import { verifyAuth } from '../middlewares/auth.middleware.js';

export const quizRoutes: FastifyPluginAsync = async (server) => {
  // Create quiz
  server.post('/quizzes', {preValidation: verifyAuth},async (request, reply) => {
    const { title } = request.body as { title: string }
    const quiz = await createQuiz(title)
    reply.send(quiz)
  })

  // Add question to quiz
  server.post('/quizzes/:id/questions',{preValidation: [verifyAuth]}, async (request, reply) => {
    const { id } = request.params as { id: string }
    const { text, options, answer, timeLimit } = request.body as {
      text: string
      options: string[]
      answer: string
      timeLimit: number
    }

    const question = await addQuestion(id, text, options, answer, timeLimit)
    reply.send(question)
  })
}
import type { FastifyPluginAsync } from 'fastify';
import { createQuiz, addQuestion } from '../services/quiz.service.js'
import { verifyAuth } from '../middlewares/auth.middleware.js';

import { z } from 'zod'

const createQuizSchema = z.object({
  title: z.string().min(3),
})

const addQuestionSchema = z.object({
  text: z.string().min(1),
  options: z.array(z.string()).min(2),
  answer: z.string(),
  timeLimit: z.number().positive(),
})

export const quizRoutes: FastifyPluginAsync = async (server) => {
  // Create quiz
  server.post('/quizzes', { preValidation: verifyAuth }, async (request, reply) => {
    const { title } = createQuizSchema.parse(request.body)
    const quiz = await createQuiz(title)
    reply.send(quiz)
  })

  // Add question to quiz
  server.post('/quizzes/:id/questions', { preValidation: [verifyAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const { text, options, answer, timeLimit } = addQuestionSchema.parse(request.body)
    const question = await addQuestion(id, text, options, answer, timeLimit)
    reply.send(question)
  })
}
import { prisma } from "../lib/prisma.js";


export async function createQuiz(title: string, ) {
  return await prisma.quiz.create({
    data: {
      title
    }
  })
}

export async function addQuestion(quizId: string, text: string, options: string[], answer: string, timeLimit: number) {
  return await prisma.question.create({
    data: {
      text,
      options,
      answer,
      timeLimit,
      quizId
    }
  })
}
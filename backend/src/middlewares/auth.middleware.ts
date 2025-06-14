import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// General authentication
export const verifyAuth = async (request: any, reply: any) => {
  const authHeader = request.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    reply.status(401).send({ error: 'Missing token' })
    return
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string
      exp: number
    }

    // Check expiration
    if (Date.now() >= decoded.exp * 1000) {
      reply.status(401).send({ error: 'Token expired' })
      return
    }

    // Attach user data
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      reply.status(401).send({ error: 'User not found' })
      return
    }

    request.user = user
  } catch (error) {
    reply.status(401).send({ error: 'Invalid token' })
  }
}
import { type FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const userRoutes: FastifyPluginAsync = async (server) => {
  // POST /api/users
  server.post('/users', async (request, reply) => {
    const { email, name, image } = request.body as { 
      email: string
      name: string
      image?: string
    }
    
    
    try{let user = await prisma.user.findUnique({ where: { email } })
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          image,
        }
      })
    }

    reply.send({
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      })}
      catch (error) {
        console.error('Error creating or finding user:', error)
        reply.status(500).send({ error: 'Internal Server Error' })
      }
  })
}
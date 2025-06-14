import type { FastifyPluginAsync } from 'fastify'
import { createRoom } from '../services/room.service.js'
import { verifyAuth } from '../middlewares/auth.middleware.js'
import { prisma } from '../lib/prisma.js';

const roomRoutes: FastifyPluginAsync = async (server) => {
  // Create room (admin only)
  server.post('/rooms', { preValidation: [verifyAuth] }, async (request, reply) => {
    const { hostId } = request.body as { hostId: string }
    const roomId = await createRoom(hostId)
    reply.send({ roomId })
  })

  // Get room details
  server.get('/rooms/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const room = await prisma.room.findUnique({ 
      where: { id },
      include: { players: true, quiz: { include: { questions: true } } }
    })
    reply.send(room)
  })
}

export default roomRoutes
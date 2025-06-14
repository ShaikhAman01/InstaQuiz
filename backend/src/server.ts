import fastify, { type FastifyPluginAsync } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySocketIO from 'fastify-socket.io';
import roomRoutes  from './routes/room.routes.js'
import { quizRoutes } from './routes/quiz.routes.js'
import { quizSocket } from './sockets/quiz.socket.js'
import { userRoutes } from './routes/user.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify()

await server.register(fastifyCors, { origin: '*' })
// Cast required because fastify-socket.io does not export proper plugin types
await server.register(fastifySocketIO as unknown as FastifyPluginAsync);

await server.register(roomRoutes, { prefix: '/api' })
await server.register(quizRoutes, { prefix: '/api' })
await server.register(userRoutes, { prefix: '/api' })
await server.register(userRoutes, { prefix: '/api' })

server.ready().then(() => {
  quizSocket(server)
})

server.listen({ port: 3001 }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Server running on http://localhost:3001')
})
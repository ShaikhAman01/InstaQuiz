import Fastify, { FastifyRequest, FastifyReply } from 'fastify';

const fastify = Fastify({
    logger: true
})

fastify.get('/', async(request:FastifyRequest, reply:FastifyReply ) => {
    reply.send({ hello:'world' });
})

fastify.listen({port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
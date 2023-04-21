import { FastifyInstance } from 'fastify';
import { countQueue } from '../configs/count-queue';
import { prisma } from '../configs/prisma';

export async function QueueRoutes(router: FastifyInstance) {
  router.get('/ping', (req, reply) => {
    reply.send('pong');
  });
  
  router.get('/non-queue',async (req, reply) => {
    const { count } = req.body as { count: number };

    const prevCount = await prisma.count.findFirstOrThrow();

    const tx = await prisma.count.update({
      where: {
        id: prevCount?.id,
      },
      data: {
        count: count + prevCount.count,
      },
    });
  
    return reply.send(tx.count);
  });
  router.post('/queue', async (req, reply) => {
    const { count } = req.body as { count: number };
    console.log('request');
    await countQueue.add({ count });

    reply.send('ok');
  });
}

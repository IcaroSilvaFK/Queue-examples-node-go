import fastify from 'fastify';
import { QueueRoutes } from './routes/queue';
import {createBullBoard} from '@bull-board/api'
import {BullAdapter} from '@bull-board/api/bullAdapter'
import {FastifyAdapter} from '@bull-board/fastify'
import { countQueue } from './configs/count-queue';

async function bootstrap() {
  const app = fastify({ logger: false });
  const serverAdapter = new FastifyAdapter()
  try {
    
    createBullBoard({
      queues: [new BullAdapter(countQueue)],
      serverAdapter
    })
    serverAdapter.setBasePath("/ui")
    
    app.register(QueueRoutes);
    app.register(serverAdapter.registerPlugin(),{prefix: "/ui",basePath:'/ui'})

    await app.listen({ port: 8000 });
    console.log(`🚀 server running at localhost:8000`)
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();

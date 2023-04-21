import fastify from 'fastify';
import { QueueRoutes } from './routes/queue';

async function bootstrap() {
  const app = fastify({ logger: false });
  try {
    app.register(QueueRoutes);

    await app.listen({ port: 8000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();

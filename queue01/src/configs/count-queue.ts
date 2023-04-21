import Queue from 'bull';

const countQueue = new Queue('count', {
  redis: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT!,
    password: process.env.REDIS_PASSWORD,
  },
});
countQueue.on('failed', (job) => {
  console.log(job);
});

export { countQueue };

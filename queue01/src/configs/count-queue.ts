import Queue from 'bull';

const countQueue = new Queue('count', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: +process.env.REDIS_PORT! || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },
});
countQueue.on('failed', (job) => {
  console.log(job);
});

export { countQueue };

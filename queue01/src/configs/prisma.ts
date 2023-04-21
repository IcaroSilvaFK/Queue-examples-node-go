import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info'],
});

async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
  }
}

main();

export { prisma };

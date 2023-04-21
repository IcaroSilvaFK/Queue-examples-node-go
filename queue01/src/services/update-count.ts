import { prisma } from '../configs/prisma';

export async function updateCount(count: number): Promise<number> {
  const prevCount = await prisma.count.findFirstOrThrow();

  const tx = await prisma.count.update({
    where: {
      id: prevCount?.id,
    },
    data: {
      count: count + prevCount.count,
    },
  });

  return tx.count;
}

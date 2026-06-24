import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const subs = await prisma.subscription.findMany({
    select: {
      id: true,
      status: true,
      createdAt: true,
      startDate: true,
    }
  });
  console.log("Subscriptions in database:");
  console.log(JSON.stringify(subs, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());

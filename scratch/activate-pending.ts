import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Update all PENDING subscriptions to ACTIVE
  const subs = await prisma.subscription.updateMany({
    where: { status: 'PENDING' },
    data: { status: 'ACTIVE' }
  });
  console.log("Updated subscriptions count:", subs.count);

  // Update all PENDING payments to SUCCESS
  const payments = await prisma.payment.updateMany({
    where: { status: 'PENDING' },
    data: {
      status: 'SUCCESS',
      paidAt: new Date()
    }
  });
  console.log("Updated payments count:", payments.count);
}

main().catch(console.error).finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'leelakrishnakurra4@gmail.com' }
  });
  console.log("User in database:", user);
}

main().finally(() => prisma.$disconnect());

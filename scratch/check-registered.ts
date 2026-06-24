import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'leelakrishnakurra4@gmail.com' },
    include: {
      studentProfile: {
        include: {
          class: true,
          board: true
        }
      }
    }
  });
  console.log("Database user details:", JSON.stringify(user, null, 2));
}

main().finally(() => prisma.$disconnect());

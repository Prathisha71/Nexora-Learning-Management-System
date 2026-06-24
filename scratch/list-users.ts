import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      firstName: true,
      lastName: true,
    }
  });
  console.log("ALL USERS:", JSON.stringify(users, null, 2));

  const teachers = await prisma.teacher.findMany({
    include: {
      user: true
    }
  });
  console.log("TEACHERS:", JSON.stringify(teachers, null, 2));
}

main().finally(() => prisma.$disconnect());

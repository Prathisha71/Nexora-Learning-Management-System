import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
      class: true,
      board: true
    }
  });
  console.log("Students in database:");
  students.forEach(s => {
    console.log(`Name: ${s.user.firstName} ${s.user.lastName}, Email: ${s.user.email}, Class: ${s.class?.name} (${s.classId}), Board: ${s.board?.name}`);
  });
}

main().finally(() => prisma.$disconnect());

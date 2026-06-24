import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password123', 10);
  const updated = await prisma.user.update({
    where: { email: 'leelakrishnakurra4@gmail.com' },
    data: { passwordHash: hash }
  });
  console.log("Updated student password to 'password123':", updated.email);
}

main().finally(() => prisma.$disconnect());

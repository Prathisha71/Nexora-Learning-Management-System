import { prisma } from '../server/lib/prisma.js';

async function main() {
  const assignments = await prisma.assignment.findMany();
  console.log("Assignments in database:", JSON.stringify(assignments, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());

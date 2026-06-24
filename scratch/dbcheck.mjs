import { PrismaClient } from '../node_modules/@prisma/client/index.js';

const p = new PrismaClient();
try {
  // Check role values in DB
  const roles = await p.user.groupBy({ by: ['role'], _count: true });
  console.log('DB roles:', JSON.stringify(roles));

  const sample = await p.user.findFirst({ select: { email: true, role: true, firstName: true } });
  console.log('Sample user:', JSON.stringify(sample));

  const totalUsers = await p.user.count();
  const totalStudents = await p.student.count();
  const totalBoards = await p.board.count();
  const totalNotes = await p.courseNote.count();
  const totalAssignments = await p.assignment.count();
  const totalLiveClasses = await p.liveClass.count();
  
  console.log(`\nStats:`);
  console.log(`  Total users: ${totalUsers}`);
  console.log(`  Students: ${totalStudents}`);
  console.log(`  Boards: ${totalBoards}`);
  console.log(`  Notes: ${totalNotes}`);
  console.log(`  Assignments: ${totalAssignments}`);
  console.log(`  Live Classes: ${totalLiveClasses}`);

} catch(e) {
  console.error('Error:', e.message);
} finally {
  await p.$disconnect();
}

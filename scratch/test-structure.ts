import { PrismaClient } from '@prisma/client';
import { mapBoard } from '../server/lib/mappers';
const prisma = new PrismaClient();

const topicInclude = () => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    notes: { orderBy: { sortOrder: 'asc' as const } },
    videos: { orderBy: { sortOrder: 'asc' as const } },
  },
});

const chapterInclude = () => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    topics: topicInclude(),
  },
});

const unitInclude = () => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    chapters: chapterInclude(),
  },
});

const subjectInclude = () => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    units: unitInclude(),
  },
});

const classInclude = () => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    subjects: subjectInclude(),
  },
});

async function main() {
  const boards = await prisma.board.findMany({
    orderBy: { name: 'asc' },
    include: {
      classes: classInclude(),
    },
  });
  console.log("Mapped structure count:", boards.length);
  const mapped = boards.map(mapBoard);
  console.log("Boards titles and class levels:");
  mapped.forEach(b => {
    console.log(`Board: ${b.title} (${b.id})`);
    b.classes.forEach(c => {
      console.log(`  - Class: ${c.title} (${c.id})`);
    });
  });
}

main().finally(() => prisma.$disconnect());

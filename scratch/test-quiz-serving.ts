import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function getCategoryKey(subjectName: string, chapterName: string, topicName: string): string {
  const cleanSubject = subjectName.toLowerCase();
  const cleanChapter = chapterName.toLowerCase();
  const cleanTopic = topicName.toLowerCase();

  if (cleanSubject.includes("math")) {
    if (
      cleanChapter.includes("matrix") ||
      cleanChapter.includes("determinant") ||
      cleanTopic.includes("matrix") ||
      cleanTopic.includes("determinant")
    ) {
      return "math-matrix";
    }
  }
  return "science-physics-motion";
}

async function getQuestionsForTopic(subjectName: string, chapterName: string, topicName: string, topicId?: string) {
  try {
    const questionsPath = path.join(process.cwd(), 'server', 'data', 'question-bank.json');
    if (fs.existsSync(questionsPath)) {
      const fileContent = fs.readFileSync(questionsPath, 'utf-8');
      const db = JSON.parse(fileContent);

      if (topicId) {
        const topicKey = topicId;
        const cleanTopicKey = topicName.toLowerCase().replace(/[^a-z0-9]/g, '-');

        if (db[topicKey]) {
          return db[topicKey];
        }
        if (db[cleanTopicKey]) {
          return db[cleanTopicKey];
        }
      }

      const catKey = getCategoryKey(subjectName, chapterName, topicName);
      const allCatQuestions = db[catKey] || [];

      if (topicId) {
        const topic = await prisma.topic.findUnique({
          where: { id: topicId },
          select: { chapterId: true }
        });

        if (topic) {
          const siblingTopics = await prisma.topic.findMany({
            where: { chapterId: topic.chapterId },
            orderBy: { sortOrder: 'asc' }
          });
          const topicIndex = siblingTopics.findIndex(t => t.id === topicId);

          const questionsPerTopic = 5;
          const start = Math.max(0, topicIndex) * questionsPerTopic;
          const sliced = allCatQuestions.slice(start, start + questionsPerTopic);

          if (sliced.length > 0) return sliced;
        }
      }

      return allCatQuestions.slice(0, 5);
    }
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function runTest() {
  console.log("=== Testing Quiz Question Serving ===");

  // Find the topics for Maths 12 Chapter 1
  const board = await prisma.board.findFirst({
    where: { name: "Tamil Nadu State Board" }
  });
  if (!board) {
    console.log("Board not found!");
    return;
  }

  const cls = await prisma.class.findFirst({
    where: { boardId: board.id, name: "Class 12" }
  });
  if (!cls) {
    console.log("Class not found!");
    return;
  }

  const subject = await prisma.subject.findFirst({
    where: { classId: cls.id, name: "Mathematics Volume 1" }
  });
  if (!subject) {
    console.log("Subject not found!");
    return;
  }

  const chapter = await prisma.chapter.findFirst({
    where: { unit: { subjectId: subject.id }, name: { contains: "Matrices" } }
  });
  if (!chapter) {
    console.log("Chapter not found!");
    return;
  }

  const topics = await prisma.topic.findMany({
    where: { chapterId: chapter.id },
    orderBy: { sortOrder: 'asc' }
  });

  console.log(`Found ${topics.length} topics in chapter "${chapter.name}":`);
  for (const t of topics) {
    console.log(`- ID: ${t.id}, Name: "${t.name}"`);
  }

  for (const t of topics) {
    const qList = await getQuestionsForTopic(subject.name, chapter.name, t.name, t.id);
    console.log(`\nTopic: "${t.name}" -> Returned ${qList.length} questions:`);
    qList.forEach((q: any, i: number) => {
      console.log(`  ${i + 1}. ${q.question}`);
    });
  }

  console.log("\n=== Testing Slicing Fallback (using a dummy topic ID that isn't matched) ===");
  // Test fallback slicing by passing a dummy topic ID but valid chapterId context:
  // We'll simulate finding it:
  const firstTopic = topics[0];
  const qListFallback = await getQuestionsForTopic(subject.name, chapter.name, "Unmatched Topic Name", firstTopic.id);
  console.log(`Fallback for Index 0 returned: ${qListFallback.length} questions`);
  qListFallback.forEach((q: any, i: number) => {
    console.log(`  ${i + 1}. ${q.question}`);
  });
}

runTest()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

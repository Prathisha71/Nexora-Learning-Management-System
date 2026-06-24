import { authAPI } from '../src/services/api';

// Since we run in Node, we don't have localStorage. Let's mock a simple fetch or use direct db queries since it's the same.
import { prisma } from '../server/lib/prisma.js';

async function main() {
  const activeSubscriptionsCount = await prisma.subscription.count({
    where: { status: 'ACTIVE' }
  });

  const monthlyCounts = Array(12).fill(0);
  const activeSubs = await prisma.subscription.findMany({
    where: { status: 'ACTIVE' },
    select: { createdAt: true }
  });
  for (const sub of activeSubs) {
    const month = new Date(sub.createdAt).getMonth();
    monthlyCounts[month]++;
  }

  const users = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    select: { location: true }
  });

  const stateCounts: { [state: string]: number } = {};
  let totalCount = 0;
  for (const u of users) {
    if (u.location) {
      const state = u.location.trim();
      stateCounts[state] = (stateCounts[state] || 0) + 1;
      totalCount++;
    }
  }

  const regionalDistribution = Object.entries(stateCounts).map(([state, count]) => {
    const percentage = totalCount > 0 ? parseFloat(((count / totalCount) * 100).toFixed(1)) : 0;
    return { state, count, percentage: percentage + "%", students: count.toString() };
  }).sort((a, b) => b.count - a.count);

  console.log("Calculated Admin Analytics:");
  console.log(JSON.stringify({
    activeSubscriptionsCount,
    monthlyActiveSubscriptions: monthlyCounts,
    regionalDistribution
  }, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());

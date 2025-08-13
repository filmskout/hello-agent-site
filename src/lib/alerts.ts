import { prisma } from './prisma';

export async function evaluateAlerts() {
  const rules = await prisma.alertRule.findMany({ where: { active: true } });
  // Placeholder evaluation - just return rules count
  console.warn('evaluateAlerts called; implement real logic');
  return rules.length;
}

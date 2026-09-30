import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const bookings = await prisma.booking.findMany({
    where: { OR: [{ referenceNumber: null }, { referenceNumber: '' }] },
  });

  console.log(`Backfilling ${bookings.length} bookings...`);

  const usedRefs = new Set<string>();

  for (const booking of bookings) {
    let ref: string;
    const year = new Date(booking.createdAt).getFullYear();
    do {
      ref = `FIN-${year}-${Math.floor(100000 + Math.random() * 900000)}`;
    } while (usedRefs.has(ref));
    usedRefs.add(ref);

    await prisma.booking.update({ where: { id: booking.id }, data: { referenceNumber: ref } });
    console.log(`  ${booking.id} → ${ref}`);
  }

  console.log('Done.');
}

main().finally(() => prisma.$disconnect());

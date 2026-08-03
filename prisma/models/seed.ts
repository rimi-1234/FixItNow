import prisma from "../../src/lib/prisma.js";
import { ensureDefaults } from "../../src/lib/ensure-defaults.js";

async function main() {
  console.log("Starting database seed...");
  await ensureDefaults();
  console.log("\nSeed completed successfully!");
  console.log("\nDefault accounts:");
  console.log("  Admin:      admin@fixitnow.com / Admin@1234");
  console.log("  Technician: technician@fixitnow.com / tech123");
  console.log("  Customer:   customer@fixitnow.com / customer123");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { insertClusters, insertDrivers, insertPackage } = require("../test_data");

async function main() {
    await insertPackage(prisma);
    await insertClusters(prisma);
    await insertDrivers(prisma);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });
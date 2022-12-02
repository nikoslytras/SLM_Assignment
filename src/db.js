const { PrismaClient } = require('@prisma/client');
//this is a ORM that handles the db.
const prisma = new PrismaClient();
module.exports = prisma;
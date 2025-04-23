import { PrismaClient } from "@/../generated/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });
};

const prisma = prismaClientSingleton();

export default prisma;

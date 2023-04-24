import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// BEST PRACTICE TO USE PRISMA WITH NEXT 13. TO AVOID A ERROR WHEN HOT RELOAD
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;

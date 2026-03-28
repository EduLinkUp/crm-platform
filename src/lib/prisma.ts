import prismaClient from '@prisma/client'

declare global {
  var __prisma: any | undefined
}

const prisma = global.__prisma ?? prismaClient

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma
}

export { prisma }

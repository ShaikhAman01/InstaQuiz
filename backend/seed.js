// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'host@example.com' },
    update: {},
    create: {
      email: 'host@example.com',
      name: 'Host User',
      isAdmin: true
    }
  })

  const user = await prisma.user.findUnique({ where: { email: 'host@example.com' } })
  if (user) {
    const roomId = await prisma.room.create({
      data: {
        hostId: user.id,
        players: {
          create: {
            nickname: 'Host',
            score: 0
          }
        }
      }
    })
    console.log(`Created room: ${roomId.id}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
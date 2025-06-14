import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getLeaderboard(roomId: string) {
    const players = await prisma.player.findMany({
      where: { roomId },
      orderBy: { score: 'desc' },
      select: { nickname: true, score: true }
    })
  
    return players
  }
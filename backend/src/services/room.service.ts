import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createRoom(hostId: string) {
    const host = await prisma.user.findUnique({
    where: { id: hostId }
    })
    if (!host) {
        throw new Error(`Host with ID ${hostId} does not exist`)
      }
  const roomId = generateUniqueRoomId()
  await prisma.room.create({
    data: {
      id: roomId,
      hostId,
      players: {
        create: {
          nickname: 'Host',
          score: 0
        }
      }
    }
  })
  return roomId
}

function generateUniqueRoomId(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
} 
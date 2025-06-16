import { prisma } from "../lib/prisma.js";
import { v4 as uuidv4 } from 'uuid'
import { nanoid } from 'nanoid'

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
          nickname: generateRandomNickname(),
          avatar: generateRandomProfilePic(),
          score: 0
        }
      }
    }
  })
  return roomId
}

function generateUniqueRoomId(): string {
  return uuidv4().substring(0, 6).toUpperCase()
}

function generateRandomNickname(): string {
  const adjectives = ['Brave', 'Clever', 'Energetic', 'Fierce', 'Gentle', 'Happy']
  const nouns = ['Lion', 'Tiger', 'Bear', 'Wolf', 'Dragon', 'Phoenix']
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`
}

function generateRandomProfilePic(): string {
  return `https://source.unsplash.com/random/100x100/?${nanoid(5)}`
}
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import socket from '@/app/lib/socketClient';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator'

export default function JoinQuizPage() {
  const [roomId, setRoomId] = useState('')
  const [nickname, setNickname] = useState('')
  const router = useRouter()

    // Generate a random nickname if not provided
    const generateNickname = () => {
        uniqueNamesGenerator({
            dictionaries: [adjectives, animals],
            style: 'capital',
            length: 2,
            separator: ' '
        });
    }

  const joinRoom = () => {
    if (!roomId) {
      alert('Enter room code')
      return
    }

    const finalNickname = nickname.trim() || generateNickname()

    localStorage.setItem('session', JSON.stringify({ nickname, roomId }))
    socket.emit('join_room', { roomId, nickname: finalNickname })
    router.push(`/room/${roomId}`)
  }

  return (
    <div>
      <h1>Join Quiz</h1>
      <input
        placeholder="Enter Room Code"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        placeholder="Choose Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  )
}
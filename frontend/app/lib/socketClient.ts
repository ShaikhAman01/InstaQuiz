// lib/socketClient.ts
'use client'
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  reconnection: true,
  reconnectionAttempts: Infinity,
  auth: {
    token: localStorage.getItem('quizAuthToken') // From NextAuth session
  }
})

export default socket

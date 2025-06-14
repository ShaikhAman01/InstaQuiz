import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

socket.on('connect', () => {
  console.log('Connected!', socket.id)

  // Emit a test event
  socket.emit('join_room', { roomId: 'test-room', nickname: 'Tester' })
})

socket.on('user_joined', (data) => {
  console.log('Someone joined:', data)
})

socket.on('error', (err) => {
  console.error('Socket error:', err)
})

'use client'
import socket from '@/app/lib/socketClient';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Question {
  id: string;
  text: string;
  options: string[];
}
export default function RoomPage() {
  const { roomId } = useParams()
  const [question, setQuestion] = useState<Question | null>(null)
  const [leaderboard, setLeaderboard] = useState<{ value: string; score: number }[]>([])

  useEffect(() => {
    socket.emit('join_room', {
      roomId,
      nickname: localStorage.getItem('nickname') || `Player_${Math.random().toString(36).substring(7)}`
    })

    socket.on('new_question', (q: Question) => {
      setQuestion(q)
    })

    socket.on('update_leaderboard', (scores: { value: string; score: number }[]) => {
      setLeaderboard(scores)
    })

    return () => {
      socket.off('new_question')
      socket.off('update_leaderboard')
    }
  }, [roomId])

  const submitAnswer = (selected: string) => {
    const playerId = localStorage.getItem('playerId')
    if (question) {
      socket.emit('submit_answer', {
        roomId,
        playerId,
        questionId: question.id,
        selected
      })
    }
  }

  return (
    <div>
      <h1>Room: {roomId}</h1>
      {question ? (
        <div>
          <p>{question.text}</p>
          <ul>
            {question.options.map((opt: string, i: number) => (
              <li key={i} onClick={() => submitAnswer(opt)}>
                {opt}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Waiting for quiz to start...</p>
      )}
      <div>
        <h3>Leaderboard</h3>
        <ul>
          {leaderboard.map((entry, i) => (
            <li key={i}>
              {entry.value}: {entry.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
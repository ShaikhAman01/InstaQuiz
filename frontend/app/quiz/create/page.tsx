'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateQuizPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [quizTitle, setQuizTitle] = useState('')

  if (status === 'loading') return <p>Loading...</p>
  if (!session) router.push('/login')

  const createQuiz = async () => {
    const res = await fetch('/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: quizTitle })
    })

    const data = await res.json()
    router.push(`/quiz/${data.id}/questions`)
  }

  return (
    <div>
      <h1>Create Quiz</h1>
      <input
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      <button onClick={createQuiz}>Create</button>
    </div>
  )
}
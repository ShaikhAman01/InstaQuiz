'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'


export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/quiz/create')
    }
  }, [session, router, status])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button 
        onClick={() => signIn('google')} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  )
}
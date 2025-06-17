"use client"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Card } from "@/components/ui/card"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    router.push("/")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access this page</p>
          <button 
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-violet-600 text-white rounded-md"
          >
            Login with Google
          </button>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
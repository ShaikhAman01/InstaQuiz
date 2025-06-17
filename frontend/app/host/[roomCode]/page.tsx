"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Play,
  SkipForward,
  Users,
  Settings,
  Share2,
  Copy,
  Zap,
  Trophy,
  Clock,
  BarChart3,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function HostPage() {
  const params = useParams()
  const roomCode = params.roomCode as string

  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [participants, setParticipants] = useState([
    { id: 1, name: "Alex Johnson", joinedAt: "2 min ago", score: 0, status: "ready", avatar: "AJ" },
    { id: 2, name: "Sarah Chen", joinedAt: "1 min ago", score: 0, status: "ready", avatar: "SC" },
    { id: 3, name: "Mike Rodriguez", joinedAt: "30 sec ago", score: 0, status: "ready", avatar: "MR" },
    { id: 4, name: "Emma Wilson", joinedAt: "15 sec ago", score: 0, status: "connecting", avatar: "EW" },
    { id: 5, name: "David Kim", joinedAt: "5 sec ago", score: 0, status: "connecting", avatar: "DK" },
  ])
  const [quizData, setQuizData] = useState<any>(null)

  useEffect(() => {
    // Load quiz data from localStorage
    const savedQuiz = localStorage.getItem("publishedQuiz")
    if (savedQuiz) {
      setQuizData(JSON.parse(savedQuiz))
    }
  }, [])

  useEffect(() => {
    // Simulate participants joining
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && participants.length < 8) {
        const names = ["Lisa Wang", "Tom Brown", "Ana Garcia", "James Wilson", "Maya Patel"]
        const randomName = names[Math.floor(Math.random() * names.length)]
        const newParticipant = {
          id: Date.now(),
          name: randomName,
          joinedAt: "just now",
          score: 0,
          status: "connecting",
          avatar: randomName
            .split(" ")
            .map((n) => n[0])
            .join(""),
        }
        setParticipants((prev) => [...prev, newParticipant])

        // Update status to ready after a moment
        setTimeout(() => {
          setParticipants((prev) => prev.map((p) => (p.id === newParticipant.id ? { ...p, status: "ready" } : p)))
        }, 2000)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [participants.length])

  const handleStartQuiz = () => {
    setQuizStarted(true)
    // In a real app, this would broadcast to all participants
  }

  const handleNextQuestion = () => {
    if (quizData && currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleEndQuiz = () => {
    // Navigate to results
    window.location.href = "/leaderboard"
  }

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode.toUpperCase())
    alert("Room code copied to clipboard!")
  }

  const shareQuiz = () => {
    const shareUrl = `${window.location.origin}/join?code=${roomCode.toUpperCase()}`
    navigator.clipboard.writeText(shareUrl)
    alert("Quiz link copied to clipboard!")
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">No quiz data found for this room code.</p>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700">
                Create New Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  InstaQuiz Host
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="font-mono text-lg px-4 py-2">
                Room: {roomCode.toUpperCase()}
              </Badge>
              <Button variant="outline" size="sm" onClick={copyRoomCode}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
              <Button variant="outline" size="sm" onClick={shareQuiz}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Control Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quiz Info */}
              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{quizData.title}</CardTitle>
                  <CardDescription className="text-base">{quizData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-violet-600">{quizData.questions.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-600">{participants.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Participants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {quizStarted ? `${currentQuestion + 1}/${quizData.questions.length}` : "0"}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quiz Controls */}
              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Quiz Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizStarted ? (
                    <div className="text-center space-y-4">
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {participants.length} participants are waiting to start
                      </p>
                      <Button
                        onClick={handleStartQuiz}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-6"
                        size="lg"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start Quiz
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">
                          Question {currentQuestion + 1}: {quizData.questions[currentQuestion]?.question}
                        </h3>
                        <div className="flex justify-center space-x-4">
                          <Button
                            onClick={handleNextQuestion}
                            disabled={currentQuestion >= quizData.questions.length - 1}
                            className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
                          >
                            <SkipForward className="w-4 h-4 mr-2" />
                            Next Question
                          </Button>
                          <Button onClick={handleEndQuiz} variant="outline">
                            <Trophy className="w-4 h-4 mr-2" />
                            End Quiz
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Current Question Preview */}
              {quizStarted && quizData.questions[currentQuestion] && (
                <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Current Question Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">{quizData.questions[currentQuestion].question}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {quizData.questions[currentQuestion].options.map((option: string, index: number) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border-2 ${
                              index === quizData.questions[currentQuestion].correctAnswer
                                ? "bg-green-100 border-green-400 text-green-800"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{quizData.questions[currentQuestion].timeLimit}s</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4" />
                          <span>{quizData.questions[currentQuestion].points} points</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Participants Sidebar */}
            <div className="space-y-6">
              {/* Participants List */}
              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Participants ({participants.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                          participant.status === "ready"
                            ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                            : "bg-gray-50 dark:bg-gray-800/50"
                        }`}
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarFallback
                            className={`text-white font-bold ${
                              participant.status === "ready"
                                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                : "bg-gradient-to-r from-gray-400 to-gray-500"
                            }`}
                          >
                            {participant.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-semibold flex items-center space-x-2">
                            <span>{participant.name}</span>
                            {participant.status === "connecting" && (
                              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                            )}
                            {participant.status === "ready" && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">
                            Joined {participant.joinedAt} • {participant.status}
                          </div>
                        </div>
                        {quizStarted && (
                          <div className="text-right">
                            <div className="font-bold text-violet-600">{participant.score}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Quick Stats
                  </h3>
                  <div className="space-y-2 text-sm text-blue-600 dark:text-blue-300">
                    <div className="flex justify-between">
                      <span>Room Code:</span>
                      <span className="font-mono font-bold">{roomCode.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={quizStarted ? "text-green-600" : "text-orange-600"}>
                        {quizStarted ? "In Progress" : "Waiting"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants:</span>
                      <span className="font-bold">{participants.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Host Tips */}
              <Card className="border-0 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-orange-700 dark:text-orange-300">💡 Host Tips</h3>
                  <ul className="text-sm text-orange-600 dark:text-orange-300 space-y-1">
                    <li>• Share the room code with participants</li>
                    <li>• Wait for everyone to join before starting</li>
                    <li>• Monitor the participant list</li>
                    <li>• Control quiz pace with next question</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

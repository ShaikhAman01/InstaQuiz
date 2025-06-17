"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Zap, ArrowLeft, Users, Clock, Trophy, Wifi, WifiOff, CheckCircle, XCircle, Loader2, Play } from "lucide-react"
import Link from "next/link"

export default function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [roomInfo, setRoomInfo] = useState<any>(null)
  const [waitingForHost, setWaitingForHost] = useState(false)

  // Get room code from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const codeFromUrl = urlParams.get("code")
    if (codeFromUrl) {
      setRoomCode(codeFromUrl.toUpperCase())
    }
  }, [])

  // Mock participants for demonstration
  const participants = [
    { id: 1, name: "Alex Johnson", avatar: "AJ", joinedAt: "2 min ago" },
    { id: 2, name: "Sarah Chen", avatar: "SC", joinedAt: "1 min ago" },
    { id: 3, name: "Mike Rodriguez", avatar: "MR", joinedAt: "30 sec ago" },
    { id: 4, name: "Emma Wilson", avatar: "EW", joinedAt: "15 sec ago" },
  ]

  const handleJoinRoom = async () => {
    if (!roomCode.trim() || !playerName.trim()) {
      setErrorMessage("Please enter both room code and your name")
      return
    }

    setIsConnecting(true)
    setConnectionStatus("connecting")
    setErrorMessage("")

    // Simulate API call
    setTimeout(() => {
      const mockRoomCodes = ["ABC123", "XYZ789", "DEF456"]

      if (mockRoomCodes.includes(roomCode.toUpperCase())) {
        setConnectionStatus("connected")
        setRoomInfo({
          title: "JavaScript Fundamentals Quiz",
          host: "John Doe",
          participants: 24,
          questions: 15,
          timePerQuestion: 30,
        })
        setWaitingForHost(true)
      } else {
        setConnectionStatus("error")
        setErrorMessage("Room not found. Please check the code and try again.")
      }
      setIsConnecting(false)
    }, 2000)
  }

  const handleStartQuiz = () => {
    // Navigate to quiz page with room info
    window.location.href = `/quiz/${roomCode.toLowerCase()}`
  }

  if (waitingForHost && roomInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="border-b border-white/20 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  InstaQuiz
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Connected</span>
                </div>
                <Badge variant="outline" className="font-mono">
                  Room: {roomCode.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Waiting Screen */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Play className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Get Ready!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">Waiting for the host to start the quiz...</p>
              <div className="flex items-center justify-center space-x-1 mb-8">
                <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>

            {/* Quiz Info */}
            <Card className="mb-8 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{roomInfo.title}</CardTitle>
                <CardDescription className="text-base">Hosted by {roomInfo.host}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-violet-600" />
                    </div>
                    <div className="text-2xl font-bold text-violet-600">{roomInfo.participants}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Participants</div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div className="text-2xl font-bold text-cyan-600">{roomInfo.questions}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Questions</div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-bold text-emerald-600">{roomInfo.timePerQuestion}s</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Per Question</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants List */}
            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Participants ({participants.length + 1})
                </CardTitle>
                <CardDescription>Players who have joined the quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Current player */}
                  <div className="flex items-center space-x-3 p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg border-2 border-violet-200 dark:border-violet-800">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold">
                        {playerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{playerName} (You)</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Just joined</div>
                    </div>
                    <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200">Host</Badge>
                  </div>

                  {/* Other participants */}
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold">
                          {participant.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{participant.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Joined {participant.joinedAt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mock Start Button (for demo) */}
            <div className="text-center mt-8">
              <Button
                onClick={handleStartQuiz}
                className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-lg px-8 py-6 rounded-xl font-semibold"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz (Demo)
              </Button>
              <p className="text-sm text-gray-500 mt-2">Click to simulate quiz start</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-violet-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
              InstaQuiz
            </span>
          </div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold">Join a Quiz</CardTitle>
            <CardDescription className="text-base">Enter the room code to participate in a live quiz</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Connection Status */}
            {connectionStatus !== "idle" && (
              <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                {connectionStatus === "connecting" && (
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting to room...</span>
                  </div>
                )}
                {connectionStatus === "connected" && (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Successfully connected!</span>
                  </div>
                )}
                {connectionStatus === "error" && (
                  <div className="flex items-center justify-center space-x-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Connection failed</span>
                  </div>
                )}
              </div>
            )}

            {connectionStatus === "connecting" && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
                <Card className="w-80">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <h3 className="font-semibold mb-2">Connecting to room...</h3>
                    <p className="text-sm text-gray-600">Please wait while we connect you to {roomCode}</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roomCode" className="text-sm font-medium">
                  Room Code
                </Label>
                <Input
                  id="roomCode"
                  placeholder="Enter 6-digit code (e.g., ABC123)"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="text-center font-mono text-lg h-12 tracking-widest"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500">Ask your host for the room code</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="playerName" className="text-sm font-medium">
                  Your Name
                </Label>
                <Input
                  id="playerName"
                  placeholder="Enter your display name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            </div>

            <Button
              onClick={handleJoinRoom}
              disabled={isConnecting || !roomCode.trim() || !playerName.trim()}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 disabled:opacity-50"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Joining Room...
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 mr-2" />
                  Join Room
                </>
              )}
            </Button>

            {/* Connection Status Indicator */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              {connectionStatus === "connected" ? (
                <>
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span>Not connected</span>
                </>
              )}
            </div>

            {/* Sample Codes for Demo */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 mb-3">Try these active demo rooms:</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: "ABC123", title: "JS Quiz", participants: 24 },
                  { code: "XYZ789", title: "React Test", participants: 18 },
                  { code: "DEF456", title: "CSS Grid", participants: 31 },
                ].map((room) => (
                  <Button
                    key={room.code}
                    variant="outline"
                    size="sm"
                    onClick={() => setRoomCode(room.code)}
                    className="font-mono text-xs p-2 h-auto flex flex-col hover:bg-violet-50 hover:border-violet-300"
                  >
                    <span className="font-bold">{room.code}</span>
                    <span className="text-[10px] text-gray-500">{room.title}</span>
                    <span className="text-[10px] text-green-600">{room.participants} online</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="text-center mt-6">
          <Card className="border-0 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
            <CardContent className="p-4">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">💡 Quick Tips</h3>
              <ul className="text-sm text-orange-600 dark:text-orange-300 space-y-1">
                <li>• Make sure you have a stable internet connection</li>
                <li>• Use a memorable display name</li>
                <li>• Keep your device charged for longer quizzes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

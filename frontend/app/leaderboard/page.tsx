"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Crown, Zap, TrendingUp, Share2, Download } from "lucide-react"

interface Participant {
  id: number
  name: string
  avatar?: string
  score: number
  correctAnswers: number
  totalQuestions: number
  avgTime: number
  streak: number
}

export default function LeaderboardPage() {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: "Alex Johnson",
      score: 2450,
      correctAnswers: 8,
      totalQuestions: 10,
      avgTime: 12.5,
      streak: 5,
    },
    {
      id: 2,
      name: "Sarah Chen",
      score: 2380,
      correctAnswers: 9,
      totalQuestions: 10,
      avgTime: 15.2,
      streak: 3,
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      score: 2290,
      correctAnswers: 7,
      totalQuestions: 10,
      avgTime: 11.8,
      streak: 4,
    },
    {
      id: 4,
      name: "Emma Wilson",
      score: 2180,
      correctAnswers: 8,
      totalQuestions: 10,
      avgTime: 18.3,
      streak: 2,
    },
    {
      id: 5,
      name: "David Kim",
      score: 2050,
      correctAnswers: 6,
      totalQuestions: 10,
      avgTime: 14.7,
      streak: 1,
    },
  ])

  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // More realistic leaderboard updates
    const interval = setInterval(() => {
      setParticipants((prev) =>
        prev
          .map((p) => ({
            ...p,
            score: Math.max(0, p.score + Math.floor(Math.random() * 20) - 10),
          }))
          .sort((a, b) => b.score - a.score),
      )
    }, 4000)

    // Add entrance animation
    setTimeout(() => setIsAnimating(false), 1500)

    return () => clearInterval(interval)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold">
            {rank}
          </div>
        )
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800"
      case 2:
        return "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border-gray-200 dark:border-gray-700"
      case 3:
        return "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800"
      default:
        return "bg-white/60 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700"
    }
  }

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

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Final Results
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">JavaScript Fundamentals Quiz</p>

            {/* Quiz Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-violet-600 mb-1">{participants.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Participants</div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600 mb-1">10</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Questions</div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {Math.round(
                      (participants.reduce((acc, p) => acc + p.correctAnswers / p.totalQuestions, 0) /
                        participants.length) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Avg Score</div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {Math.round(participants.reduce((acc, p) => acc + p.avgTime, 0) / participants.length)}s
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Avg Time</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="mb-12">
            <div className="flex items-end justify-center space-x-4 mb-8">
              {/* Second Place */}
              {participants[1] && (
                <div className="text-center">
                  <div className="w-20 h-16 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg flex items-end justify-center mb-4 relative">
                    <div className="absolute -top-12">
                      <Avatar className="w-16 h-16 border-4 border-gray-300">
                        <AvatarFallback className="bg-gradient-to-r from-gray-400 to-gray-500 text-white text-lg font-bold">
                          {participants[1].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-white font-bold text-lg mb-2">2</div>
                  </div>
                  <div className="font-semibold">{participants[1].name}</div>
                  <div className="text-2xl font-bold text-gray-600">{participants[1].score.toLocaleString()}</div>
                </div>
              )}

              {/* First Place */}
              {participants[0] && (
                <div className="text-center">
                  <div className="w-24 h-20 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg flex items-end justify-center mb-4 relative">
                    <div className="absolute -top-14">
                      <div className="relative">
                        <Avatar className="w-20 h-20 border-4 border-yellow-400">
                          <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xl font-bold">
                            {participants[0].name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <Crown className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 text-yellow-600" />
                      </div>
                    </div>
                    <div className="text-white font-bold text-xl mb-2">1</div>
                  </div>
                  <div className="font-semibold text-lg">{participants[0].name}</div>
                  <div className="text-3xl font-bold text-yellow-600">{participants[0].score.toLocaleString()}</div>
                </div>
              )}

              {/* Third Place */}
              {participants[2] && (
                <div className="text-center">
                  <div className="w-20 h-12 bg-gradient-to-t from-amber-500 to-amber-600 rounded-t-lg flex items-end justify-center mb-4 relative">
                    <div className="absolute -top-12">
                      <Avatar className="w-16 h-16 border-4 border-amber-500">
                        <AvatarFallback className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-bold">
                          {participants[2].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-white font-bold text-lg mb-2">3</div>
                  </div>
                  <div className="font-semibold">{participants[2].name}</div>
                  <div className="text-2xl font-bold text-amber-600">{participants[2].score.toLocaleString()}</div>
                </div>
              )}
            </div>
          </div>

          {!isAnimating && (
            <div className="fixed inset-0 pointer-events-none z-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Full Leaderboard */}
          <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Complete Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <Card
                    key={participant.id}
                    className={`transition-all duration-500 border ${getRankStyle(index + 1)} ${
                      isAnimating ? "transform translate-y-4 opacity-0" : "transform translate-y-0 opacity-100"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            {getRankIcon(index + 1)}
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold">
                                {participant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div>
                            <div className="font-semibold text-lg">{participant.name}</div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                              <span>
                                {participant.correctAnswers}/{participant.totalQuestions} correct
                              </span>
                              <span>Avg: {participant.avgTime}s</span>
                              {participant.streak > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  🔥 {participant.streak} streak
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-violet-600">{participant.score.toLocaleString()}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {Math.round((participant.correctAnswers / participant.totalQuestions) * 100)}% accuracy
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
              size="lg"
              onClick={() => (window.location.href = "/quiz/demo")}
            >
              Play Again
            </Button>
            <Button variant="outline" size="lg" onClick={() => (window.location.href = "/create")}>
              Create New Quiz
            </Button>
            <Button variant="outline" size="lg" onClick={() => (window.location.href = "/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

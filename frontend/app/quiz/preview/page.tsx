"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowLeft, Zap, Play, Eye } from "lucide-react"
import Link from "next/link"

export default function QuizPreviewPage() {
  const [quizData, setQuizData] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  useEffect(() => {
    // Load quiz data from localStorage
    const savedQuiz = localStorage.getItem("previewQuiz")
    if (savedQuiz) {
      setQuizData(JSON.parse(savedQuiz))
    }
  }, [])

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No Preview Available</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Please create a quiz first to preview it.</p>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700">
                Create Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = quizData.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/create">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Editor
                </Button>
              </Link>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  Quiz Preview
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Eye className="w-3 h-3 mr-1" />
                Preview Mode
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Info */}
          <Card className="mb-8 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h1 className="text-3xl font-bold mb-2">{quizData.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{quizData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-600">{quizData.questions.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">
                    {Math.round(quizData.questions.reduce((acc: number, q: any) => acc + q.timeLimit, 0) / 60)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Est. Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {quizData.questions.reduce((acc: number, q: any) => acc + q.points, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card className="mb-6 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {quizData.questions.length}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentQuestion(Math.min(quizData.questions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === quizData.questions.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
              <Progress value={((currentQuestion + 1) / quizData.questions.length) * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Question Preview */}
          <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200">{currentQ.points} points</Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentQ.timeLimit}s
                  </Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{currentQ.question}</h2>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((option: string, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      index === currentQ.correctAnswer
                        ? "bg-green-50 border-green-300 text-green-800"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-gray-700 flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {index === currentQ.correctAnswer && (
                        <Badge className="bg-green-100 text-green-700 text-xs">Correct</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Question Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <div>Question Type: {currentQ.type.replace("-", " ").toUpperCase()}</div>
                  <div>Time Limit: {currentQ.timeLimit} seconds</div>
                  <div>Points: {currentQ.points}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Link href="/create">
              <Button variant="outline" size="lg">
                Edit Quiz
              </Button>
            </Link>
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
              onClick={() => {
                // Simulate publishing
                const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
                const publishedQuiz = {
                  ...quizData,
                  roomCode,
                  publishedAt: new Date().toISOString(),
                }
                localStorage.setItem("publishedQuiz", JSON.stringify(publishedQuiz))
                window.location.href = `/host/${roomCode.toLowerCase()}`
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              Publish & Host
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

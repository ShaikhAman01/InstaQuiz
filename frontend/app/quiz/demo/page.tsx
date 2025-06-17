"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Users, Trophy, CheckCircle, XCircle, Zap, Star, Flame, Target, Award, Crown } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
  points: number
  difficulty: "easy" | "medium" | "hard"
  category: string
}

interface Participant {
  id: number
  name: string
  score: number
  streak: number
  isYou?: boolean
}

export default function QuizDemoPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "You", score: 0, streak: 0, isYou: true },
    { id: 2, name: "Alex Johnson", score: 850, streak: 3 },
    { id: 3, name: "Sarah Chen", score: 720, streak: 2 },
    { id: 4, name: "Mike Rodriguez", score: 680, streak: 1 },
    { id: 5, name: "Emma Wilson", score: 590, streak: 0 },
  ])
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [powerUps, setPowerUps] = useState({
    doublePoints: 1,
    extraTime: 1,
    skipQuestion: 1,
  })

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
      ],
      correctAnswer: 0,
      timeLimit: 30,
      points: 100,
      difficulty: "easy",
      category: "Web Development",
    },
    {
      id: 2,
      question: "Which CSS property is used to change the text color?",
      options: ["font-color", "text-color", "color", "foreground-color"],
      correctAnswer: 2,
      timeLimit: 25,
      points: 150,
      difficulty: "easy",
      category: "Web Development",
    },
    {
      id: 3,
      question: "What is the correct way to declare a JavaScript variable?",
      options: ["variable myVar;", "var myVar;", "v myVar;", "declare myVar;"],
      correctAnswer: 1,
      timeLimit: 20,
      points: 200,
      difficulty: "medium",
      category: "JavaScript",
    },
    {
      id: 4,
      question: "Which method is used to add an element to the end of an array in JavaScript?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: 1,
      timeLimit: 25,
      points: 250,
      difficulty: "medium",
      category: "JavaScript",
    },
    {
      id: 5,
      question: "What does CSS Grid's 'fr' unit represent?",
      options: ["Fixed ratio", "Fractional unit", "Frame rate", "Flexible range"],
      correctAnswer: 1,
      timeLimit: 30,
      points: 300,
      difficulty: "hard",
      category: "CSS",
    },
  ]

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp()
    }
  }, [timeLeft, isAnswered])

  // Update participants scores periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants((prev) =>
        prev
          .map((p) => (p.isYou ? { ...p, score } : { ...p, score: p.score + Math.floor(Math.random() * 50) }))
          .sort((a, b) => b.score - a.score),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [score])

  const handleTimeUp = () => {
    setIsAnswered(true)
    setShowResult(true)
    setStreak(0)
    setTimeout(() => {
      nextQuestion()
    }, 3000)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    setShowResult(true)

    if (answerIndex === currentQ.correctAnswer) {
      const timeBonus = Math.floor((timeLeft / currentQ.timeLimit) * 50)
      const streakBonus = streak * 25
      const totalPoints = currentQ.points + timeBonus + streakBonus
      setScore(score + totalPoints)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }

    setTimeout(() => {
      nextQuestion()
    }, 3000)
  }

  const nextQuestion = () => {
    if (isLastQuestion) {
      // Quiz completed - show final results
      setShowLeaderboard(true)
      return
    }

    setCurrentQuestion(currentQuestion + 1)
    setSelectedAnswer(null)
    setTimeLeft(questions[currentQuestion + 1].timeLimit)
    setShowResult(false)
    setIsAnswered(false)
  }

  const usePowerUp = useCallback(
    (type: keyof typeof powerUps) => {
      if (powerUps[type] <= 0) return

      setPowerUps((prev) => ({ ...prev, [type]: prev[type] - 1 }))

      switch (type) {
        case "extraTime":
          setTimeLeft((prev) => prev + 15)
          break
        case "doublePoints":
          // This would be handled in the scoring logic
          break
        case "skipQuestion":
          nextQuestion()
          break
      }
    },
    [powerUps, nextQuestion, setTimeLeft, setPowerUps],
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? "bg-violet-100 border-violet-400 dark:bg-violet-900/30 scale-105 shadow-lg"
        : "hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 hover:scale-102 hover:shadow-md"
    }

    if (index === currentQ.correctAnswer) {
      return "bg-green-100 border-green-400 text-green-800 dark:bg-green-900/30 dark:text-green-300 scale-105 shadow-lg"
    }

    if (selectedAnswer === index && index !== currentQ.correctAnswer) {
      return "bg-red-100 border-red-400 text-red-800 dark:bg-red-900/30 dark:text-red-300 scale-95"
    }

    return "bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 opacity-60"
  }

  const currentRank = participants.findIndex((p) => p.isYou) + 1

  if (showLeaderboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Quiz Complete!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Great job on completing the quiz!</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 mb-1">{score.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Final Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-1">#{currentRank}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Final Rank</div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
                onClick={() => (window.location.href = "/leaderboard")}
              >
                View Full Leaderboard
              </Button>
              <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                InstaQuiz
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4" />
                <span>{participants.length} players</span>
              </div>
              <Badge variant="outline" className="font-mono">
                Room: ABC123
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Quiz Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Progress and Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Question</div>
                    <div className="text-2xl font-bold text-violet-600">
                      {currentQuestion + 1}/{questions.length}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Score</div>
                    <div className="text-2xl font-bold text-cyan-600">{score.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Streak</div>
                    <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
                      {streak > 0 && <Flame className="w-5 h-5 mr-1" />}
                      {streak}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Rank</div>
                    <div className="text-2xl font-bold text-emerald-600">#{currentRank}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Bar */}
              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                    </span>
                  </div>
                  <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-3" />
                </CardContent>
              </Card>

              {/* Timer */}
              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="text-center">
                      <div
                        className={`text-4xl font-bold font-mono ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-gray-700 dark:text-gray-300"}`}
                      >
                        {timeLeft.toString().padStart(2, "0")}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">seconds left</div>
                    </div>

                    <div className="w-24 h-24 relative">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - timeLeft / currentQ.timeLimit)}`}
                          className={`transition-all duration-1000 ${timeLeft <= 5 ? "text-red-500" : "text-violet-500"}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Clock className={`w-6 h-6 ${timeLeft <= 5 ? "text-red-500" : "text-violet-500"}`} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question */}
              <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Badge className={`${getDifficultyColor(currentQ.difficulty)} border`}>
                        {currentQ.difficulty.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{currentQ.category}</Badge>
                      <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200">
                        {currentQ.points} points
                      </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{currentQ.question}</h1>
                  </div>

                  {/* Answer Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQ.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`h-auto min-h-[80px] text-left text-base font-medium transition-all duration-300 border-2 ${getOptionStyle(index)}`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                      >
                        <div className="flex items-center space-x-3 w-full p-2">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 flex-shrink-0">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="flex-1 text-left">{option}</span>
                          {showResult && index === currentQ.correctAnswer && (
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                          )}
                          {showResult && selectedAnswer === index && index !== currentQ.correctAnswer && (
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>

                  {/* Result Feedback */}
                  {showResult && (
                    <div className="mt-8 text-center animate-in fade-in duration-500">
                      {selectedAnswer === currentQ.correctAnswer ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center space-x-2 text-green-600">
                            <CheckCircle className="w-10 h-10" />
                            <span className="text-3xl font-bold">Correct!</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg text-gray-600 dark:text-gray-300">+{currentQ.points} base points</p>
                            {timeLeft > 0 && (
                              <p className="text-sm text-gray-500">
                                +{Math.floor((timeLeft / currentQ.timeLimit) * 50)} time bonus
                              </p>
                            )}
                            {streak > 0 && <p className="text-sm text-orange-600">+{streak * 25} streak bonus 🔥</p>}
                          </div>
                        </div>
                      ) : selectedAnswer !== null ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center space-x-2 text-red-600">
                            <XCircle className="w-10 h-10" />
                            <span className="text-3xl font-bold">Incorrect</span>
                          </div>
                          <p className="text-lg text-gray-600 dark:text-gray-300">
                            The correct answer was: <strong>{currentQ.options[currentQ.correctAnswer]}</strong>
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center space-x-2 text-orange-600">
                            <Clock className="w-10 h-10" />
                            <span className="text-3xl font-bold">Time's Up!</span>
                          </div>
                          <p className="text-lg text-gray-600 dark:text-gray-300">
                            The correct answer was: <strong>{currentQ.options[currentQ.correctAnswer]}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Power-ups */}
              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Power-ups
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => usePowerUp("extraTime")}
                      disabled={powerUps.extraTime <= 0 || isAnswered}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      +15s ({powerUps.extraTime})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => usePowerUp("doublePoints")}
                      disabled={powerUps.doublePoints <= 0 || isAnswered}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      2x Points ({powerUps.doublePoints})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => usePowerUp("skipQuestion")}
                      disabled={powerUps.skipQuestion <= 0 || isAnswered}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Skip ({powerUps.skipQuestion})
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Leaderboard */}
              <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    Live Rankings
                  </h3>
                  <div className="space-y-2">
                    {participants.slice(0, 5).map((participant, index) => (
                      <div
                        key={participant.id}
                        className={`flex items-center space-x-2 p-2 rounded-lg ${
                          participant.isYou
                            ? "bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800"
                            : "bg-gray-50 dark:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2 flex-1">
                          {index === 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm truncate">{participant.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">{participant.score.toLocaleString()}</div>
                          {participant.streak > 0 && (
                            <div className="text-xs text-orange-600 flex items-center">
                              <Flame className="w-3 h-3 mr-1" />
                              {participant.streak}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quiz Info */}
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">📚 Quiz Info</h3>
                  <div className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                    <p>• {questions.length} total questions</p>
                    <p>• Mixed difficulty levels</p>
                    <p>• Web development focus</p>
                    <p>• Real-time scoring</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

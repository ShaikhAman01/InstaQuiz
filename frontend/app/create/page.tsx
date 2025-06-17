"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Trash2,
  GripVertical,
  Clock,
  Save,
  Eye,
  Share2,
  ArrowLeft,
  Zap,
  Settings,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Question {
  id: number
  type: "multiple-choice" | "true-false" | "text"
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
  points: number
}

export default function CreateQuizPage() {
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      timeLimit: 30,
      points: 100,
    },
  ])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      timeLimit: 30,
      points: 100,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: number, field: keyof Question, value: any) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const deleteQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)) } : q,
      ),
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
                  InstaQuiz
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Save current quiz state and navigate to preview
                  const quizData = {
                    title: quizTitle,
                    description: quizDescription,
                    questions: questions,
                  }
                  localStorage.setItem("previewQuiz", JSON.stringify(quizData))
                  window.location.href = "/quiz/preview"
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Save as draft
                  const quizData = {
                    title: quizTitle,
                    description: quizDescription,
                    questions: questions,
                    savedAt: new Date().toISOString(),
                  }
                  localStorage.setItem("draftQuiz", JSON.stringify(quizData))
                  alert("Quiz saved as draft!")
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
                size="sm"
                onClick={() => {
                  if (!quizTitle.trim()) {
                    alert("Please enter a quiz title")
                    return
                  }
                  if (questions.some((q) => !q.question.trim())) {
                    alert("Please complete all questions")
                    return
                  }

                  // Generate room code and publish
                  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
                  const quizData = {
                    title: quizTitle,
                    description: quizDescription,
                    questions: questions,
                    roomCode: roomCode,
                    publishedAt: new Date().toISOString(),
                  }
                  localStorage.setItem("publishedQuiz", JSON.stringify(quizData))
                  alert(`Quiz published! Room code: ${roomCode}`)
                  window.location.href = `/host/${roomCode.toLowerCase()}`
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Publish Quiz
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Settings */}
          <Card className="mb-8 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Quiz Settings
              </CardTitle>
              <CardDescription>Configure your quiz details and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Quiz Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter quiz title..."
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="text-lg font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your quiz..."
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Show Results</Label>
                    <p className="text-xs text-gray-500">Display results after each question</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Randomize Questions</Label>
                    <p className="text-xs text-gray-500">Shuffle question order</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Allow Retakes</Label>
                    <p className="text-xs text-gray-500">Let participants retry</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Questions ({questions.length})</h2>
              <Button
                onClick={addQuestion}
                className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>

            {questions.map((question, index) => (
              <Card key={question.id} className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                        <Badge variant="outline" className="font-mono">
                          Q{index + 1}
                        </Badge>
                      </div>
                      <Select
                        value={question.type}
                        onValueChange={(value: any) => updateQuestion(question.id, "type", value)}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          <SelectItem value="true-false">True/False</SelectItem>
                          <SelectItem value="text">Text Answer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="w-4 h-4" />
                        <Input
                          type="number"
                          value={question.timeLimit}
                          onChange={(e) => updateQuestion(question.id, "timeLimit", Number.parseInt(e.target.value))}
                          className="w-16 h-8 text-center"
                          min="5"
                          max="300"
                        />
                        <span>sec</span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteQuestion(question.id)}
                        disabled={questions.length === 1}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Question</Label>
                    <Textarea
                      placeholder="Enter your question..."
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
                      rows={2}
                      className="text-lg"
                    />
                  </div>

                  {question.type === "multiple-choice" && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Answer Options</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <Button
                              variant={question.correctAnswer === optionIndex ? "default" : "outline"}
                              size="sm"
                              className={`w-8 h-8 rounded-full p-0 ${
                                question.correctAnswer === optionIndex
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "hover:bg-green-50 hover:border-green-300"
                              }`}
                              onClick={() => updateQuestion(question.id, "correctAnswer", optionIndex)}
                            >
                              {question.correctAnswer === optionIndex ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="font-bold">{String.fromCharCode(65 + optionIndex)}</span>
                              )}
                            </Button>
                            <Input
                              placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                              value={option}
                              onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">Click the circle next to the correct answer</p>
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Correct Answer</Label>
                      <div className="flex space-x-4">
                        <Button
                          variant={question.correctAnswer === 0 ? "default" : "outline"}
                          onClick={() => updateQuestion(question.id, "correctAnswer", 0)}
                          className={question.correctAnswer === 0 ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          True
                        </Button>
                        <Button
                          variant={question.correctAnswer === 1 ? "default" : "outline"}
                          onClick={() => updateQuestion(question.id, "correctAnswer", 1)}
                          className={question.correctAnswer === 1 ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          False
                        </Button>
                      </div>
                    </div>
                  )}

                  {question.type === "text" && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Correct Answer</Label>
                      <Input
                        placeholder="Enter the correct answer..."
                        value={question.options[0] || ""}
                        onChange={(e) => updateOption(question.id, 0, e.target.value)}
                      />
                      <p className="text-xs text-gray-500">Text answers are case-insensitive</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-2">
                        <span>Points:</span>
                        <Input
                          type="number"
                          value={question.points}
                          onChange={(e) => updateQuestion(question.id, "points", Number.parseInt(e.target.value))}
                          className="w-20 h-8 text-center"
                          min="10"
                          max="1000"
                          step="10"
                        />
                      </div>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {question.timeLimit}s • {question.points} pts
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quiz Summary */}
          <Card className="mt-8 border-0 bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-900/20 dark:to-cyan-900/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-violet-600">{questions.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-600">
                    {Math.round(questions.reduce((acc, q) => acc + q.timeLimit, 0) / 60)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Est. Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {questions.reduce((acc, q) => acc + q.points, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(questions.reduce((acc, q) => acc + q.timeLimit, 0) / questions.length)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Avg. Time/Q</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

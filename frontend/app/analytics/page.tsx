"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Trophy,
  Target,
  Zap,
  ArrowLeft,
  Download,
  Share2,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const quizStats = {
    totalQuizzes: 12,
    totalParticipants: 1234,
    avgScore: 87,
    totalQuestions: 180,
    avgCompletionTime: 8.5,
    popularCategories: [
      { name: "JavaScript", count: 45, percentage: 38 },
      { name: "React", count: 32, percentage: 27 },
      { name: "CSS", count: 28, percentage: 23 },
      { name: "General", count: 15, percentage: 12 },
    ],
    recentActivity: [
      { date: "2024-01-15", quizzes: 3, participants: 87 },
      { date: "2024-01-14", quizzes: 2, participants: 56 },
      { date: "2024-01-13", quizzes: 4, participants: 124 },
      { date: "2024-01-12", quizzes: 1, participants: 23 },
      { date: "2024-01-11", quizzes: 2, participants: 67 },
    ],
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
                  Analytics Dashboard
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Quizzes</p>
                    <p className="text-3xl font-bold text-violet-600">{quizStats.totalQuizzes}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +23% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-violet-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Participants</p>
                    <p className="text-3xl font-bold text-cyan-600">{quizStats.totalParticipants.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +18% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Score</p>
                    <p className="text-3xl font-bold text-emerald-600">{quizStats.avgScore}%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Time</p>
                    <p className="text-3xl font-bold text-orange-600">{quizStats.avgCompletionTime}m</p>
                    <p className="text-xs text-red-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                      -2% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Popular Categories */}
            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Popular Categories
                </CardTitle>
                <CardDescription>Quiz topics by popularity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizStats.popularCategories.map((category, index) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                          >
                            {index + 1}
                          </Badge>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">{category.count}</span>
                          <span className="text-xs text-gray-500 ml-1">quizzes</span>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Last 5 days of quiz activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizStats.recentActivity.map((day, index) => (
                    <div
                      key={day.date}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {day.quizzes} quiz{day.quizzes !== 1 ? "es" : ""} hosted
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-violet-600">{day.participants}</div>
                        <div className="text-xs text-gray-500">participants</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Insights */}
          <Card className="mt-8 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">📊 Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">92%</div>
                  <div className="text-sm text-blue-600">Quiz Completion Rate</div>
                  <div className="text-xs text-gray-600 mt-1">Above average</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">4.8/5</div>
                  <div className="text-sm text-blue-600">Participant Rating</div>
                  <div className="text-xs text-gray-600 mt-1">Excellent feedback</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">15s</div>
                  <div className="text-sm text-blue-600">Avg Response Time</div>
                  <div className="text-xs text-gray-600 mt-1">Quick engagement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

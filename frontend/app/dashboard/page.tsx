"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  Play,
  Users,
  Clock,
  MoreHorizontal,
  Zap,
  Trophy,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Bell,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function Dashboard() {
  const [roomCode, setRoomCode] = useState("")

  const recentQuizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      participants: 24,
      questions: 15,
      lastUsed: "2 hours ago",
      status: "active",
      roomCode: "JS2024",
      avgScore: 87,
    },
    {
      id: 2,
      title: "Team Building Quiz",
      participants: 12,
      questions: 10,
      lastUsed: "1 day ago",
      status: "completed",
      roomCode: "TEAM01",
      avgScore: 92,
    },
    {
      id: 3,
      title: "Product Knowledge Test",
      participants: 45,
      questions: 20,
      lastUsed: "3 days ago",
      status: "draft",
      roomCode: "PROD23",
      avgScore: 78,
    },
    {
      id: 4,
      title: "React Hooks Deep Dive",
      participants: 18,
      questions: 12,
      lastUsed: "5 days ago",
      status: "completed",
      roomCode: "REACT1",
      avgScore: 85,
    },
    {
      id: 5,
      title: "CSS Grid & Flexbox",
      participants: 31,
      questions: 8,
      lastUsed: "1 week ago",
      status: "completed",
      roomCode: "CSS101",
      avgScore: 91,
    },
  ]

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
              {/* <Button size="icon" variant="ghost" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button> */}

              <Link href="/notifications">
                <Button size="icon" variant="ghost" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Welcome back, John! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Ready to create some amazing quizzes?</p>
        </div>

        {/* Quick Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Quizzes</p>
                  <p className="text-3xl font-bold text-violet-600">12</p>
                </div>
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Participants</p>
                  <p className="text-3xl font-bold text-cyan-600">1,234</p>
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg. Score</p>
                  <p className="text-3xl font-bold text-emerald-600">87%</p>
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">This Month</p>
                  <p className="text-3xl font-bold text-orange-600">+23%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Quick Actions</CardTitle>
                <CardDescription>Get started with your next quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/create">
                    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-violet-400 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Plus className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Create New Quiz</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Start building your interactive quiz</p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/join">
                    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Join a Quiz</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Enter a room code to participate</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Quizzes */}
            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">Recent Quizzes</CardTitle>
                  <CardDescription>Your latest quiz activities</CardDescription>
                </div>
                {/* <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search quizzes..." className="pl-10 w-64" />
                </div> */}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz) => (
                    <Card
                      key={quiz.id}
                      className="group hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-lg">{quiz.title}</h3>
                              <Badge
                                variant={
                                  quiz.status === "active"
                                    ? "default"
                                    : quiz.status === "completed"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={
                                  quiz.status === "active"
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : quiz.status === "completed"
                                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }
                              >
                                {quiz.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{quiz.participants} participants</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Play className="w-4 h-4" />
                                <span>{quiz.questions} questions</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{quiz.lastUsed}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
                              onClick={() => {
                                if (quiz.status === "active") {
                                  window.location.href = `/host/${quiz.roomCode.toLowerCase()}`
                                } else if (quiz.status === "completed") {
                                  window.location.href = `/leaderboard?quiz=${quiz.id}`
                                } else {
                                  window.location.href = `/create?edit=${quiz.id}`
                                }
                              }}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Start
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Quiz</DropdownMenuItem>
                                <DropdownMenuItem>View Results</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Room */}
            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Join a Room</CardTitle>
                <CardDescription>Enter a room code to participate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Enter room code"
                  className="text-center font-mono text-lg h-12"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && roomCode.trim()) {
                      window.location.href = `/join?code=${roomCode}`
                    }
                  }}
                />
                <Link href={roomCode.trim() ? `/join?code=${roomCode}` : "/join"}>
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700">
                    Join Room
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Team Meeting Quiz</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Today at 2:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Product Training</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Tomorrow at 10:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border-0 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-orange-700 dark:text-orange-300">💡 Pro Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-600 dark:text-orange-300">
                  Use timed questions to keep your audience engaged and create excitement during your quiz sessions!
                </p>
              </CardContent>
            </Card>

            <Link href="/analytics">
              <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Track your quiz performance and participant engagement metrics.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

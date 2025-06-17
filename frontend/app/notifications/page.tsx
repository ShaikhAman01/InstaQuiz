"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Check, X, Users, Trophy, MessageSquare, Settings, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "quiz_completed",
      title: "Quiz Completed",
      message: "JavaScript Fundamentals quiz has ended with 24 participants",
      time: "2 minutes ago",
      read: false,
      avatar: "JS",
      color: "bg-green-500",
    },
    {
      id: 2,
      type: "new_participant",
      title: "New Participant",
      message: "Sarah Chen joined your React Hooks quiz",
      time: "5 minutes ago",
      read: false,
      avatar: "SC",
      color: "bg-blue-500",
    },
    {
      id: 3,
      type: "high_score",
      title: "High Score Alert",
      message: "Alex Johnson scored 2,450 points in your CSS Grid quiz!",
      time: "1 hour ago",
      read: true,
      avatar: "AJ",
      color: "bg-yellow-500",
    },
    {
      id: 4,
      type: "feedback",
      title: "New Feedback",
      message: "You received 5-star rating for Team Building Quiz",
      time: "2 hours ago",
      read: true,
      avatar: "⭐",
      color: "bg-purple-500",
    },
    {
      id: 5,
      type: "system",
      title: "System Update",
      message: "New features available: Power-ups and streak bonuses",
      time: "1 day ago",
      read: true,
      avatar: "🚀",
      color: "bg-indigo-500",
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "quiz_completed":
        return <Trophy className="w-4 h-4" />
      case "new_participant":
        return <Users className="w-4 h-4" />
      case "high_score":
        return <Trophy className="w-4 h-4" />
      case "feedback":
        return <MessageSquare className="w-4 h-4" />
      case "system":
        return <Settings className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
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
                  Notifications
                </span>
                {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount}</Badge>}
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Notification Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{unreadCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Unread</div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{notifications.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total</div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {notifications.filter((n) => n.type === "quiz_completed").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Quiz Alerts</div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card className="border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Recent Notifications
              </CardTitle>
              <CardDescription>Stay updated with your quiz activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                      notification.read
                        ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                        : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${notification.color} flex items-center justify-center text-white font-bold flex-shrink-0`}
                    >
                      {notification.avatar.length === 1 ? (
                        notification.avatar
                      ) : (
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className={notification.color}>{notification.avatar}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {getIcon(notification.type)}
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{notification.title}</h3>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">No notifications</h3>
                  <p className="text-gray-500">You're all caught up!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Zap } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl mx-auto animate-ping opacity-20"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
            InstaQuiz
          </h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Preparing your quiz experience...</p>
        </div>
      </div>
    </div>
  )
}

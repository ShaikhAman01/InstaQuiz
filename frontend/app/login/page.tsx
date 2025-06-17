"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Github, Mail, Zap, ArrowLeft, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [isDark, setIsDark] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-violet-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
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
            <CardTitle className="text-2xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
            <CardDescription className="text-base">
              {isSignUp ? "Start creating amazing quizzes today" : "Sign in to your InstaQuiz account"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  // Simulate GitHub login
                  setTimeout(() => {
                    window.location.href = "/dashboard"
                  }, 1000)
                }}
              >
                <Github className="w-5 h-5 mr-3" />
                Continue with GitHub
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  // Simulate Google login
                  setTimeout(() => {
                    window.location.href = "/dashboard"
                  }, 1000)
                }}
              >
                <Mail className="w-5 h-5 mr-3" />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email Form */}
            <div className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input id="name" placeholder="Enter your full name" className="h-12 text-base" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Enter your email" className="h-12 text-base" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input id="password" type="password" placeholder="Enter your password" className="h-12 text-base" />
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded" />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-violet-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              )}
            </div>

            <Button
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
              onClick={() => {
                // Simulate email login/signup
                const emailValue = (document.getElementById("email") as HTMLInputElement | null)?.value;
                const passwordValue = (document.getElementById("password") as HTMLInputElement | null)?.value;
                if (!emailValue || !passwordValue) {
                  alert("Please fill in all fields")
                  return
                }
                setTimeout(() => {
                  window.location.href = "/dashboard"
                }, 1000)
              }}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>

            <Separator />

            <Button variant="ghost" className="w-full h-12 text-base font-medium" asChild>
              <Link href="/dashboard">Continue as Guest</Link>
            </Button>

            {/* Theme Toggle */}
            <div className="flex items-center justify-center space-x-2 pt-4">
              <Sun className="w-4 h-4" />
              <Switch checked={isDark} onCheckedChange={setIsDark} className="data-[state=checked]:bg-violet-600" />
              <Moon className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Toggle Sign Up/Sign In */}
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-300">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-violet-600 hover:underline font-medium">
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

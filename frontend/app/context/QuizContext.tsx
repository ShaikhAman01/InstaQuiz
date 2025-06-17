"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const API_URL = "http://localhost:3001/api"

interface QuizContextType {
  user: any
  setUser: (user: any) => void
  token: string | null
  setToken: (token: string | null) => void
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const QuizContext = createContext<QuizContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  login: async () => {},
  logout: () => {}
})

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  const login = async (email: string, password: string) => {
    // Simulate login - adjust according to your auth flow
    const res = await axios.post(`${API_URL}/users`, { email, name: email.split("@")[0] })
    const userData = res.data
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const isAuthenticated = !!token || !!user

  return (
    <QuizContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)
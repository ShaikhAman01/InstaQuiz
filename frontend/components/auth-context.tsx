"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  user: any
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:3001/api/users/me", {
        credentials: "include"
      })
      
      if (res.ok) {
        const data = await res.json()
        setUser(data)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    }

    fetchUser()
  }, [])

  const login = () => {
    window.location.href = "http://localhost:3001/api/auth/google"
  }

  const logout = async () => {
    await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include"
    })
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
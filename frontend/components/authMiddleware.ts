import React from "react";
import { useQuiz } from "@/app/context/QuizContext";
import { redirect } from "next/navigation"
// Update the path below if your QuizContext is located elsewhere
// Update the path below if your QuizContext is located elsewhere


export function withAuth<P>(Component: React.ComponentType<P>) {
  return function WithAuth(props: P) {
    const { isAuthenticated } = useQuiz()
    if (!isAuthenticated) {
      redirect("/join")
    }
    return <Component {...props} />
  }
}
"use client"
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

type Question = {
  text: string;
  options: string[];
  answer: string;
  timeLimit: number;
};

export default function AddQuestionsPage() {
    // Removed unused router variable
    const { quizId } = useParams() // Get quizId from URL
    useSession(); // Initialize session without destructuring
    
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
      text: '',
      options: ['', '', ''],
      answer: '',
      timeLimit: 10
    })
  
    const addQuestion = async () => {
      if (!quizId) return
      
      const res = await fetch(`/api/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentQuestion)
      })
  
      if (!res.ok) {
        const error = await res.json()
        console.error('Failed to add question:', error)
        return
      }
  
      await res.json()
      setQuestions([...questions, currentQuestion])
      setCurrentQuestion({ text: '', options: ['', '', ''], answer: '', timeLimit: 10 })
    }
  
    return (
      <div>
        <h1>Add Questions</h1>
        <input
          placeholder="Question Text"
          value={currentQuestion.text}
          onChange={(e) => setCurrentQuestion({
            ...currentQuestion,
            text: e.target.value
          })}
        />
        {/* Add option inputs */}
        <button onClick={addQuestion}>Add Question</button>
      </div>
    )
  }
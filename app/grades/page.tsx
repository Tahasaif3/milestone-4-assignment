'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../components/auth-provider'
import { useRouter } from 'next/navigation'

type Grade = {
  subject: string
  grade: string
  score: number
}

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchGrades = async () => {
      try {
        console.log('Fetching grades for user:', user.id);
        const response = await fetch('/api/grades')
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Failed to fetch grades: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        console.log('Grades fetched:', data);
        setGrades(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching grades:', err)
        setError(err instanceof Error ? err.message : 'An error occurred while fetching your grades. Please try again later.')
        setLoading(false)
      }
    }

    fetchGrades()
  }, [user, router])

  if (!user) {
    return <div className="text-center">Redirecting to login...</div>
  }

  if (loading) {
    return <div className="text-center">Loading grades...</div>
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Grades</h1>
      {grades.length === 0 ? (
        <p className="text-lg text-gray-600">No grades available for this student.</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbarr'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import { Student } from '@/types/student'

export default function Dashboard() {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedStudent = localStorage.getItem('student')
    if (storedStudent) {
      setTimeout(() => {
        setStudent(JSON.parse(storedStudent))
        setLoading(false)
      }, 1500)
    } else {
      router.push('/')
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="h-8 w-8" />
        <span className="ml-2 text-lg">Loading your results...</span>
      </div>
    )
  }

  if (!student) {
    return <div>No student data found.</div>
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome, {student.name}!</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Roll Number:</strong> {student.rollNumber}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Overall Grade:</strong> {student.grade}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Marks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{subject.subject}</TableCell>
                      <TableCell>{subject.marks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}><strong>Total Marks</strong></TableCell>
                    <TableCell>{student.totalMarks}</TableCell> {/* Display totalMarks from student object */}
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

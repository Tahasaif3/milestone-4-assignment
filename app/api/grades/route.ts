import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

type Grade = {
  subject: string
  grade: string
  score: number
}

function generateRandomGrade(): Grade {
  const subjects = ['Mathematics', 'Science', 'History', 'English', 'Physics', 'Chemistry', 'Biology', 'Literature', 'Computer Science', 'Art'];
  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
  
  return {
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    grade: grades[Math.floor(Math.random() * grades.length)],
    score: Math.floor(Math.random() * 41) + 60
  };
}

const studentGrades: Record<string, Grade[]> = {};

// Generate grades for 30 students
for (let i = 1; i <= 30; i++) {
  const studentId = `student${i}`;
  studentGrades[studentId] = Array(5).fill(null).map(() => generateRandomGrade());
}

export async function GET() {
  const cookieStore = cookies()
  const userCookie = cookieStore.get('user')

  console.log('Fetching grades, user cookie:', userCookie);

  if (!userCookie) {
    console.log('No user cookie found');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = JSON.parse(userCookie.value)
    const studentId = user.id

    console.log('Fetching grades for student:', studentId);

    if (!studentId) {
      console.log('No student ID found in user cookie');
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 })
    }

    const grades = studentGrades[studentId]

    if (!grades) {
      console.log('No grades found for student:', studentId);
      return NextResponse.json({ error: 'No grades found for this student' }, { status: 404 })
    }

    console.log('Grades fetched:', grades);

    return NextResponse.json(grades)
  } catch (error) {
    console.error('Error fetching grades:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


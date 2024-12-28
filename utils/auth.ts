import { students } from './db';

export function authenticateStudent(username: string, password: string) {
  const studentNumber = username.replace('student', '');
  const student = students.find(s => s.rollNumber === studentNumber.padStart(3, '0'));
  
  if (!student) {
    console.log('No student found for username:', username);
    return null;
  }

  const correctPassword = `password${studentNumber}`;

  if (password === correctPassword) {
    return student;
  }

  console.log('Password mismatch for username:', username);
  return null;
}


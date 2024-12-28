import { NextResponse } from 'next/server';
import { authenticateStudent } from '@/utils/auth';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const student = authenticateStudent(username, password);

  if (student) {
    return NextResponse.json({ success: true, student });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
}


import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Login attempt:', { username, password: '******' });

    // Check if the username is in the format 'student1' to 'student30'
    const studentMatch = username.match(/^student(\d+)$/);
    if (studentMatch) {
      const studentNumber = parseInt(studentMatch[1]);
      if (studentNumber >= 1 && studentNumber <= 30 && password === `password${studentNumber}`) {
        console.log('Login successful for user:', username);
        return NextResponse.json({ id: username, username: username });
      }
    }

    console.log('Login failed for user:', username);
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


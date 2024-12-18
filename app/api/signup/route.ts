import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // In a real application, you would check if the username already exists and save the new user to a database
    if (username && password && password.length >= 8) {
      return NextResponse.json({ id: '2', username });
    } else {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 400 });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


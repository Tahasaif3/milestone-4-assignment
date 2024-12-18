'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type User = {
  id: string
  username: string
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      console.log('Attempting login for user:', username);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        return { success: false, error: errorData.message || 'Login failed' };
      }
      
      const userData = await response.json();
      console.log('Login successful:', userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400; samesite=strict`;
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      console.log('Attempting signup for user:', username);
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Signup error:', errorData);
        return { success: false, error: errorData.message || 'Signup failed' };
      }
      
      const userData = await response.json();
      console.log('Signup successful:', userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400; samesite=strict`;
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null)
    localStorage.removeItem('user')
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


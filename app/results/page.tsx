import { LoginForm } from '@/components/login-form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Student Result Portal</h1>
        <p className="text-gray-600">Access your academic performance with ease</p>
      </div>
      <LoginForm />
    </main>
  )
}


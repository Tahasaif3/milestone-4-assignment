import { Inter } from 'next/font/google'
import { Footer } from '../components/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NewsEdu - Stay Informed, Track Progress',
  description: 'Get the latest educational news and track your academic progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </div>
      </body>
    </html>
  )
}


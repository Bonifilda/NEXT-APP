import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Next.js Assignment',
  description: 'A Next.js project demonstrating different rendering techniques',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            <header className="bg-blue-600 dark:bg-blue-800 text-white p-4">
              <nav className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Next.js work</h1>
                <div className="flex items-center space-x-4">
                  <Link href="/" className="hover:underline">Home</Link>
                  <Link href="/about" className="hover:underline">About</Link>
                  <Link href="/blog" className="hover:underline">Blog</Link>
                  <ThemeToggle />
                </div>
              </nav>
            </header>
            
            <main className="flex-1">
              {children}
            </main>
            
            <footer className="bg-gray-800 dark:bg-gray-950 text-white p-4 text-center">
              <p>&copy; 2024 Next.js Assignment. All rights reserved.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
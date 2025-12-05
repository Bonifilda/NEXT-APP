import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

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
        <div className="min-h-screen flex flex-col">
          <header className="bg-blue-600 text-white p-4">
            <nav className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Next.js work</h1>
              <div className="space-x-4">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/blog" className="hover:underline">Blog</Link>
              </div>
            </nav>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; 2024 Next.js Assignment. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
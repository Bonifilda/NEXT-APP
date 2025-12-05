import CurrentTime from './components/CurrentTime'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Welcome to Next.js works</h1>
      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
        This project demonstrates various Next.js rendering techniques including CSR, SSR, SSG, and ISR.
      </p>
      <CurrentTime />
    </div>
  )
}

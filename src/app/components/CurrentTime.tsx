'use client'

import { useState, useEffect } from 'react'

export default function CurrentTime() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleString())
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Current Time (CSR)</h3>
      <p className="text-blue-600 font-mono">{time}</p>
    </div>
  )
}
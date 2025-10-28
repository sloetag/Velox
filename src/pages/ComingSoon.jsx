'use client'
import { useState, useEffect } from 'react'

const getLaunchDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 10) // 10 days from now
  return date
}

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const launchDate = getLaunchDate()
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/calandra-home.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linearfrom-black/70 via-black/60 to-black/80"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-white">
        {/* 🔻 SVG REMOVED — no logo here */}

        <div className="text-center max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-4">
            COMING SOON
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-lg mx-auto">
            We're engineering something extraordinary. The future of automotive luxury is almost here.
          </p>

          <div className="flex justify-center gap-4 sm:gap-6 mb-10">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-mono font-light">
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
                <span className="mt-2 text-xs text-gray-400 uppercase tracking-wider">
                  {unit}
                </span>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <p className="text-gray-400 text-sm mb-3">Be the first to know when we launch.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 text-sm bg-black/30 backdrop-blur-sm border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 text-gray-900 hover:bg-amber-400 transition-colors rounded text-sm font-light tracking-wider"
              >
                NOTIFY ME
              </button>
            </form>
          </div>
        </div>
        

        <div className="mt-16 text-white text-xs">
          &copy; {new Date().getFullYear()} VELOX. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
'use client'
import { useState, useEffect } from 'react'

const getLaunchDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 14)
  return date
}

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    console.log('Email submitted:', email)
    setShowModal(true)
    setEmail('')
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/car-home.jpg')" }}
    >
      {/* Fixed gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-white">
        <div className="text-center max-w-2xl">
          <h1 className="text-amber-500 text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-4">
            COMING SOON
          </h1>

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
            <p className="text-gray-400 text-sm mb-3">
              Be the first to know when we launch.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>
        </div>

        <div className="mt-16 text-white text-xs">
          &copy; {new Date().getFullYear()} VELOX. All rights reserved.
        </div>
      </div>

      {/* Animated Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-sm w-full mx-4 text-center relative transform animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 text-lg"
            >
              &times;
            </button>

            {/* Animated Checkmark SVG */}
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-amber-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 13L9 17L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="24"
                  strokeDashoffset="24"
                  className="animate-checkmark"
                />
              </svg>
            </div>

            <p className="text-gray-300 text-sm">
              Thank you! We’ll notify you when we launch.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-amber-500 text-gray-900 rounded text-sm font-medium hover:bg-amber-400 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComingSoon
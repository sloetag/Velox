
'use client'
import { useState, useEffect, useRef } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showCustomAlert, setShowCustomAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Scroll fade-in
  useEffect(() => {
    const current = footerRef.current
    if (!current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    observer.observe(current)
    return () => observer.unobserve(current)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setEmail('')

      // Show custom alert
      setAlertMessage('Thank you! You’ve been added to the Velox exclusive list!.')
      setShowCustomAlert(true)

      // Auto-hide after 4 seconds
      setTimeout(() => {
        setShowCustomAlert(false)
        setAlertMessage('')
      }, 4000)
    }, 800)
  }

  return (
    <footer
      ref={footerRef}
      className={`bg-gray-900 text-gray-400 overflow-hidden transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Custom Alert Modal */}
      {showCustomAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-gray-900 border border-amber-500/30 rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-10 h-10 text-amber-500 mx-auto mb-3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-lg font-light text-white tracking-wide mb-2">SUCCESS</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{alertMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div>
            <h3 className="text-white font-light tracking-widest text-lg">VELOX</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 max-w-xs">
              Crafting the future of automotive excellence since 1919.
            </p>
          </div>

          {/* Vehicles */}
          <div>
            <h4 className="text-white font-light tracking-wide text-sm mb-3">VEHICLES</h4>
            <ul className="space-y-2">
              {['Sedans', 'Coupes', 'Electric', 'All Models'].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-light tracking-wide text-sm mb-3">COMPANY</h4>
            <ul className="space-y-2">
              {['Heritage', 'Design', 'Innovation', 'Contact'].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-light tracking-wide text-sm mb-3">EXCLUSIVITY</h4>
            <p className="text-gray-500 text-sm mb-3">
              Join our private list for early access and invitations.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-2 px-3 py-2 bg-amber-500 text-gray-900 hover:bg-amber-400 disabled:opacity-70 text-xs font-light tracking-wider rounded whitespace-nowrap transition-colors"
                >
                  JOIN
                </button>
              </div>
              {submitStatus === 'error' && (
                <p className="text-xs text-red-400">Please enter a valid email.</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-600">
            <p>
              The stated values were determined in accordance with the prescribed WLTP (Worldwide harmonised Light vehicles Test Procedure) measurement procedure. The ranges given refer to the German market. The fuel consumption, energy consumption and CO2 emissions of a car depend not only on the efficient use of the fuel or energy source by the car, but also on driving style and other non-technical factors.
            </p>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-600">
              <p>&copy; {new Date().getFullYear()} Velox | All rights reserved.</p>
              <div className="flex gap-4">
                {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item, i) => (
                  <a key={i} href="#" className="hover:text-gray-300 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center mt-8">
              <a href="#" className="inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8 text-amber-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
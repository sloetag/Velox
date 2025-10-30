'use client'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showModal, setShowModal] = useState(false) // ← Reuse modal state
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

      // show animated moda
      setShowModal(true)

      // Optional: auto-close after 4 seconds
      const timer = setTimeout(() => {
        setShowModal(false)
      }, 4000)

      return () => clearTimeout(timer)
    }, 800)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <footer
      ref={footerRef}
      className={`bg-gray-950 text-gray-400 overflow-hidden transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/*  Animated Modal -same as ComingSoon) */}
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

            {/* Animated Checkmark */}
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
              Thank you! You’ve been added to the Velox Exclusive list.
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

      {/* Rest of the footer */}
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
                  <Link to="/vehicles" className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-200">
                    {item}
                  </Link>
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
                  <Link to="#" className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-200">
                    {item}
                  </Link>
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
                  <Link to="#" key={i} className="hover:text-gray-300 transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center mt-8">
              <Link to="#" className="inline-block">
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
'use client'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const navigate = useNavigate()

    const validate = () => {
        const newErrors = {}

        if (!email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid'
        }

        if (!password) {
            newErrors.password = 'Password is required'
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        setIsSubmitting(true)
        setSubmitStatus(null)

        setTimeout(() => {
            setIsSubmitting(false)
            if (email === 'user@velox.com' && password === 'password') {
                setSubmitStatus('success')
                if (rememberMe) {
                    localStorage.setItem('velox_user', JSON.stringify({ email }))
                }
                setTimeout(() => navigate('/vehicles'), 1500)
            } else {
                setSubmitStatus('error')
            }
        }, 1200)
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* 🔻 BRAND SVG REMOVED — no logo section */}

                <h1 className="text-2xl font-light text-white text-center tracking-wide mb-2">
                    SIGN IN TO VELOX
                </h1>
                <p className="text-gray-400 text-center text-sm mb-8">
                    Access your exclusive client portal
                </p>

                {submitStatus === 'error' && (
                    <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded text-red-400 text-sm text-center">
                        Invalid email or password
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800 border rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-amber-500'
                                }`}
                            placeholder="you@velox.com"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                            <p id="email-error" className="mt-1 text-red-400 text-xs">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="password" className="block text-sm text-gray-400">
                                Password
                            </label>
                            <Link to="/forgot-password" className="text-xs text-amber-500 hover:text-amber-400">
                                Forgot Password ?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-3 bg-gray-800 border rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 pr-12 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-amber-500'
                                    }`}
                                placeholder="••••••••"
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? "password-error" : undefined}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5-.258.91-.742 1.722-1.38 2.38M6.228 6.228L3 3m3.228 3.228l3.228 3.228" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p id="password-error" className="mt-1 text-red-400 text-xs">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="flex items-center text-sm text-gray-400">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500"
                            />
                            <span className="ml-2">Remember me</span>
                        </label>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2.5 bg-amber-500 text-gray-900 hover:bg-amber-400 disabled:opacity-70 transition-colors rounded text-sm font-light tracking-wider"
                        >
                            {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
                        </button>
                    </div>
                </form>

                <div className="my-8 flex items-center">
                    <div className="grow border-t border-gray-800"></div>
                    <span className="mx-4 text-gray-600 text-sm">OR</span>
                    <div className="grow border-t border-gray-800"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-white text-sm transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                        Facebook
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-white text-sm transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.328 0 3.891.916 4.785 1.846l3.29-3.137C18.188 1.237 15.46 0 12.24 0 5.46 0 0 5.46 0 12.24s5.46 12.24 12.24 12.24c6.78 0 12.24-5.46 12.24-12.24 0-.455-.035-.898-.104-1.33H12.24z"
                                fill="#FFFFFF"
                            />
                        </svg>
                        Google
                    </button>
                </div>

                <p className="mt-8 text-center text-gray-500 text-sm">
                    Don’t have an account?{' '}
                    <Link to="/sign-up" className="text-amber-500 hover:text-amber-400">
                        Create one
                    </Link>
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
              </div>
        </div>
    )
}

export default SignIn
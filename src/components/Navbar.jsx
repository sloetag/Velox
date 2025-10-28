'use client'
import { Link } from 'react-router-dom'
import {
  UserCircleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const desktopSearchRef = useRef(null)
  const mobileSearchRef = useRef(null)

  const navItems = [
    { name: 'VEHICLES', href: '/vehicles' },
    { name: 'SHOP', href: '/shop' },
    { name: 'SHOWROOM', href: '/showroom' },
  ]

  // Scroll control
  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      setLastScrollY(currentScrollY)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  },)

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDesktopSearchOpen(false)
        setMobileSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-focus
  useEffect(() => {
    if (desktopSearchOpen && desktopSearchRef.current) {
      desktopSearchRef.current.focus()
    }
    if (mobileSearchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus()
    }
  }, [desktopSearchOpen, mobileSearchOpen])

  return (
    <header className="sticky top-0 z-50 bg-gray-900">

      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Left: Hamburger (mobile) + Nav Items (desktop) */}
        <div className="flex items-center gap-x-8">

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="size-6" />
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div
            className={`hidden lg:flex items-center gap-x-8 transition-opacity duration-300 ${
              scrolled && !desktopSearchOpen ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-semibold text-white hover:text-amber-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">VELOX</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10 text-amber-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
          </Link>
        </div>

        {/* Right: Search (mobile + desktop) + Sign In (desktop only) */}
        <div className="flex items-center gap-x-5">
          {/* Mobile Search Icon */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          {/* Desktop Icons */}
          <div
            className={`hidden lg:flex items-center gap-x-5 transition-opacity duration-300 ${
              scrolled && !desktopSearchOpen ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <button
              type="button"
              onClick={() => setDesktopSearchOpen(true)}
              className="text-white hover:text-amber-500 transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <Link
              to="/sign-in"
              className="inline-flex items-center gap-x-2 text-sm font-semibold text-white hover:text-amber-500 transition-colors"
            >
              <UserCircleIcon className="h-5 w-5" aria-hidden="true" />
              SIGN IN
            </Link>
          </div>
        </div>
      </nav>

      {/* Desktop Search Bar */}
      {desktopSearchOpen && (
        <div className="hidden lg:block border-t border-gray-800 bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center">
            <form className="flex-1 max-w-3xl">
              <input
                ref={desktopSearchRef}
                type="text"
                placeholder="Search Velox....."
                className="w-full bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
                aria-label="Search"
              />
            </form>
            <button
              type="button"
              onClick={() => setDesktopSearchOpen(false)}
              className="ml-4 text-gray-400 hover:text-white"
              aria-label="Close search"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-gray-900 p-6 sm:max-w-sm">
          <div className="flex items-center justify-center relative mb-8">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">VELOX</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10 text-amber-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-0 rounded-md p-2 text-gray-400 hover:text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to ={item.href}
                className="block py-3 text-base font-light text-white border-b border-transparent hover:border-gray-700 hover:text-amber-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Search in Menu (optional — you can remove if redundant) */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                setTimeout(() => setMobileSearchOpen(true), 150)
              }}
              className="flex w-full py-3 text-left text-base font-light text-white border-b border-transparent hover:border-gray-700 hover:text-amber-500 transition-colors"
            >
              <MagnifyingGlassIcon className="mr-3 h-5 w-5 mt-0.5" />
              SEARCH
            </button>

            <Link
              to ="/sign-in"
              className="flex items-center py-3 text-base font-light text-white border-b border-transparent hover:border-gray-700 hover:text-amber-500 transition-colors"
            >
              <UserCircleIcon className="mr-3 h-5 w-5" />
              SIGN IN
            </Link>
          </div>
        </DialogPanel>
      </Dialog>

      {/* Mobile Full-Screen Search */}
      <Dialog open={mobileSearchOpen} onClose={setMobileSearchOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/80" />
        <DialogPanel className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="relative w-full max-w-2xl">
            <input
              ref={mobileSearchRef}
              type="text"
              placeholder="Search VELOX..."
              className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 text-xl py-5 px-6 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Search"
            />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label="Close search"
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default Navbar

'use client'
import { useState, useEffect, useRef } from 'react'

const ElectricVehiclesSection = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const evSlides = [
    {
      media: '/ev-home.mp4',
      isVideo: true,
      title: 'PURE ELECTRIC POWER',
      description: '0–100 km/h in 3.2s. Silent and Electrifying.',
      cta: 'THINK EV',
    },
    {
      media: '/velox-e2.jpg',
      isVideo: false,
      title: 'VELOX E2',
      description:'All that glitter',
      cta: 'BUY NOW',
    },
    {
      media: '/calandra-home.jpg',
      isVideo: false,
      title: 'ALCEDO GT3',
      description: 'The future of luxury performance',
      cta: 'DISCOVER',
    },
  ]

  // Scroll fade-in
  useEffect(() => {
    const current = sectionRef.current
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

  // Auto-rotate
  useEffect(() => {
    if (evSlides.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % evSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [evSlides.length])

  const goToSlide = (index) => {
    setActiveIndex(index)
  }

  const currentSlide = evSlides[activeIndex]

  return (
    <section
      ref={sectionRef}
      className={`bg-gray-900 overflow-hidden transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative h-[62.5vh] min-h-[400px] sm:h-[70vh] md:h-[75vh] lg:h-[87.5vh]">
        {/* Media with smooth transition */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
          {currentSlide.isVideo ? (
            <video
              key={currentSlide.media}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              aria-hidden="true"
            >
              <source src={currentSlide.media} type="video/mp4" />
            </video>
          ) : (
            <img
              key={currentSlide.media}
              src={currentSlide.media}
              alt=""
              className="w-full h-full object-cover"
              loading={activeIndex === 0 ? 'eager' : 'lazy'}
            />
          )}
        </div>

        {/* Gradient overlay — FIXED */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

        {/* Responsive Text Layout */}
        <div className="absolute inset-0 flex flex-col justify-end pb-6 px-4 sm:px-6 md:px-8 lg:justify-center lg:pb-0 lg:pl-14 lg:pr-4">
          <div className="max-w-lg text-center lg:text-left lg:max-w-none">
            {/* Title: +25% size, semi-bold */}
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-white tracking-wide">
              {currentSlide.title}
            </h2>

            <div className="mt-2 w-24 h-px bg-amber-500 mx-auto lg:mx-0" />

            {/* Subtitle: +25% size */}
            <p className="mt-2 text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
              {currentSlide.description}
            </p>

            {/* Button */}
            <button className="mt-4 px-4 py-2 sm:px-5 sm:py-2.5 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-light tracking-wider rounded-full text-xs sm:text-sm">
              {currentSlide.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center py-4 space-x-2">
        {evSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === activeIndex ? 'bg-amber-500 w-5' : 'bg-gray-600'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default ElectricVehiclesSection
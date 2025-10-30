'use client'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const cars = [
  {
    id: 1,
    name: "VELOX SHARK",
    class: "Road Monster",
    image: "/velox-shark.jpg",
    topSpeed: "290 mph",
    acceleration: "3.2s",
    power: "502 HP",
    range: "420 mi"
  },
  {
    id: 2,
    name: "VELOX PANTHER",
    class: "Electric Hypercar",
    image: "/velox-panther.jpg",
    topSpeed: "302 mph",
    acceleration: "3.1s",
    power: "612 HP",
    range: "N/A"
  },
  {
    id: 3,
    name: "VELOX LEO",
    class: "Swift transporter",
    image: "/velox-leo.jpg",
    topSpeed: "300 mph",
    acceleration: "3.3s",
    power: "450 HP",
    range: "N/A"
  },
  {
    id: 4,
    name: "VELOX GT3",
    class: "Performance Sedan",
    image: "/velox-gt3.jpg",
    topSpeed: "255 mph",
    acceleration: "4.7s",
    power: "400 HP",
    range: "N/A"
  }
]

const Showroom = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentCar = cars[currentIndex]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? cars.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === cars.length - 1 ? 0 : prev + 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const nextCar = () => {
    setCurrentIndex((prev) => (prev === cars.length - 1 ? 0 : prev + 1))
  }

  const prevCar = () => {
    setCurrentIndex((prev) => (prev === 0 ? cars.length - 1 : prev - 1))
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      {/* Full-width Car Image */}
      <div className="relative flex-1 overflow-hidden">
        {/* Arrows */}
        <button
          onClick={prevCar}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-amber-500/30 flex items-center justify-center transition-colors"
          aria-label="Previous car"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextCar}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-amber-500/30 flex items-center justify-center transition-colors"
          aria-label="Next car"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image */}
        <img
          src={currentCar.image}
          alt={currentCar.name}
          className="w-full h-[70vh] object-cover"
          onError={(e) => e.target.src = "/placeholder-car.jpg"}
        />
      </div>

      {/* Car Details */}
      <div className="py-8 px-6 max-w-4xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">{currentCar.name}</h1>
            <p className="text-amber-400 mt-1">{currentCar.class}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
            <div className="text-center">
              <div className="text-gray-400 text-sm">0-60</div>
              <div className="text-white font-mono">{currentCar.acceleration}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm">TOP SPEED</div>
              <div className="text-white font-mono">{currentCar.topSpeed}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm">POWER</div>
              <div className="text-white font-mono">{currentCar.power}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm">RANGE</div>
              <div className="text-white font-mono">{currentCar.range}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to={`*`}
            className="px-8 py-3 bg-amber-500 text-gray-900 font-bold tracking-wider rounded-lg hover:bg-amber-400 transition-colors"
          >
            CONFIGURE & BUILD
          </Link>
        </div>

        {/* Indicator Dots */}
        <div className="mt-6 flex justify-center space-x-2">
          {cars.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-amber-500' : 'bg-gray-600'
              }`}
              aria-label={`View car ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Showroom
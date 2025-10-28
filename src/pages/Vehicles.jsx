'use client'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Mock vehicle data
const allVehicles = [
  {
    id: 1,
    name: "VELOX E1",
    type: "electric",
    tagline: "Silent. Instant. Electrifying.",
    image: "/velox-e1.jpg",
    specs: ["0-60mph: 3.2s", "Range: 420 mi", "502 HP"],
    price: "$149,000"
  },
  {
    id: 2,
    name: "VELOX GT",
    type: "sedan",
    tagline: "Race-bred aerodynamics, road-ready refinement.",
    image: "/velox-gt.jpg",
    specs: ["V8 Twin-Turbo", "0-60mph: 3.8s", "612 HP"],
    price: "$189,000"
  },
  {
    id: 3,
    name: "VELOX S9",
    type: "coupe",
    tagline: "Executive presence meets track capability.",
    image: "/velox-s9.jpg",
    specs: ["Handcrafted interior", "Adaptive air suspension", "All-wheel drive"],
    price: "$124,000"
  },
  {
    id: 4,
    name: "VELOX X7",
    type: "electric",
    tagline: "Command the road. Conquer the unknown.",
    image: "/calandra-home.jpg",
    specs: ["Speed monster", " Race wings", "Full option"],
    price: "$109,000"
  },
  {
    id: 5,
    name: "VELOX E3",
    type: "electric",
    tagline: "Be different.",
    image: "/legacy-home.jpg",
    specs: ["1 of 1", "Panoramic glass roof", "2-seat option"],
    price: "$159,000"
  },
  {
    id: 6,
    name: "VELOX X8",
    type: "coupe",
    tagline: "No cause to look back.",
    image: "/calandra-home.jpg",
    specs: ["Off-road mode", "Panoramic glass roof", "7-seat option"],
    price: "$200,000"
  }
]

const Vehicles = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Scroll fade-in
  useEffect(() => {
    const current = sectionRef.current
    if (!current) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(current)
    return () => observer.unobserve(current)
  }, [])

  const filteredVehicles = activeFilter === 'all'
    ? allVehicles
    : allVehicles.filter(vehicle => vehicle.type === activeFilter)

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/redd-v.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/90"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide max-w-3xl">
            ENGINEERED FOR TOMORROW
          </h1>
          <p className="mt-4 text-gray-300 text-lg max-w-2xl">
            Discover the VELOX lineup — where heritage, innovation, and performance converge.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['all', 'electric', 'coupe', 'sedan', 'suv'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-light tracking-wider transition-colors ${
                activeFilter === filter
                  ? 'bg-amber-500 text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div
          ref={sectionRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-gray-800/30 border border-gray-700 hover:border-amber-500 rounded-xl overflow-hidden transition-all duration-500"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-light text-white">{vehicle.name}</h3>
                    <p className="mt-1 text-amber-400 text-sm">{vehicle.tagline}</p>
                  </div>
                  <span className="text-amber-500 font-light">{vehicle.price}</span>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {vehicle.specs.map((spec, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-center">
                      <svg className="w-3.5 h-3.5 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {spec}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`*`}
                  className="mt-6 block w-full py-2.5 text-center border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 transition-colors rounded font-light tracking-wider text-sm"
                >
                  BUILD & PRICE
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No vehicles match your filter.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
            CAN’T DECIDE?
          </h2>
          <p className="text-gray-400 mb-8">
            Visit our showroom for a personalized consultation and test drive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/showroom"
              className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors rounded-full font-light tracking-wider"
            >
              BOOK A TEST DRIVE
            </Link>
            <Link
              to="*"
              className="px-8 py-3 bg-amber-500 text-gray-900 hover:bg-amber-400 transition-colors rounded-full font-light tracking-wider"
            >
              CONFIGURE YOUR VELOX
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vehicles
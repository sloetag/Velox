'use client'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const shopItems = [
  {
    id: 1,
    name: "VELOX Performance Jacket",
    category: "apparel",
    price: "$295",
    image: "/shop/jacket.jpg",
    inStock: true
  },
  {
    id: 2,
    name: "Carbon Fiber Key Holder",
    category: "accessories",
    price: "$120",
    image: "/shop/keyholder.jpg",
    inStock: true
  },
  {
    id: 3,
    name: "VELOX Driving Gloves",
    category: "apparel",
    price: "$185",
    image: "/shop/gloves.jpg",
    inStock: true
  },
  {
    id: 4,
    name: "1:18 Scale VELOX E1 Model",
    category: "lifestyle",
    price: "$350",
    image: "/shop/model.jpg",
    inStock: false
  },
  {
    id: 5,
    name: "VELOX Embroidered Cap",
    category: "apparel",
    price: "$85",
    image: "/shop/cap.jpg",
    inStock: true
  },
  {
    id: 6,
    name: "Leather & Alcantara Wallet",
    category: "accessories",
    price: "$220",
    image: "/shop/wallet.jpg",
    inStock: true
  },
  {
    id: 7,
    name: "VELOX Ceramic Watch",
    category: "accessories",
    price: "$1,200",
    image: "/shop/watch.jpg",
    inStock: true
  },
  {
    id: 8,
    name: "VELOX Scented Leather Air Freshener",
    category: "lifestyle",
    price: "$45",
    image: "/shop/airfreshener.jpg",
    inStock: true
  },
  {
    id: 9,
    name: "VELOX Track Day T-Shirt",
    category: "apparel",
    price: "$95",
    image: "/shop/tshirt.jpg",
    inStock: true
  },
  {
    id: 10,
    name: "VELOX Charging Pad",
    category: "accessories",
    price: "$150",
    image: "/shop/charger.jpg",
    inStock: true
  }
]

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cartCount, setCartCount] = useState(0)
  const [addedItems, setAddedItems] = useState(new Set())
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

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

  const filteredItems = activeCategory === 'all'
    ? shopItems
    : shopItems.filter(item => item.category === activeCategory)

  const handleAddToCart = (id) => {
    if (!addedItems.has(id)) {
      setAddedItems(prev => new Set([...prev, id]))
      setCartCount(c => c + 1)
      // Optional: show mini cart animation
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-wide">VELOX SHOP</h1>
            <p className="mt-2 text-gray-400">Curated automotive lifestyle essentials</p>
          </div>
          <Link
            to="/cart"
            className="mt-4 sm:mt-0 relative flex items-center text-amber-500 hover:text-amber-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.54 0 1.023.41 1.12 1.007z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['all', 'apparel', 'accessories', 'lifestyle'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-light tracking-wider transition-colors ${
                activeCategory === cat
                  ? 'bg-amber-500 text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          ref={sectionRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-800/30 border border-gray-700 hover:border-amber-500 rounded-xl overflow-hidden transition-all duration-500"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg" // fallback
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-light text-white">{item.name}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-amber-500 font-light">{item.price}</span>
                  {item.inStock ? (
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      disabled={addedItems.has(item.id)}
                      className={`text-xs px-3 py-1 rounded ${
                        addedItems.has(item.id)
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-gray-900'
                      }`}
                    >
                      {addedItems.has(item.id) ? 'ADDED' : 'ADD TO CART'}
                    </button>
                  ) : (
                    <span className="text-xs text-red-500">OUT OF STOCK</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No items in this category.
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-gray-800">
        <h2 className="text-2xl font-light tracking-wide mb-4">EXCLUSIVE TO VELOX OWNERS</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          Some items are available only to verified VELOX vehicle owners. Log in to unlock your collection.
        </p>
        <Link
          to="/sign-in"
          className="inline-block px-6 py-2.5 border border-white text-white hover:bg-white hover:text-black transition-colors rounded-full text-sm font-light tracking-wider"
        >
          SIGN IN TO ACCESS
        </Link>
      </div>
    </div>
  )
}

export default Shop
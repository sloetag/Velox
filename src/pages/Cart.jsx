/* eslint-disable no-unused-vars */
// src/pages/Cart.jsx
'use client'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CART_KEY = 'velox_cart'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])

  // 🔁 Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY)
    if (saved) {
      try {
        setCartItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse cart')
        setCartItems([])
      }
    }
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + change
            return newQty > 0 ? { ...item, quantity: newQty } : item
          }
          return item
        })
        .filter(item => item.quantity > 0)
    )
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light tracking-wide mb-10">YOUR CART</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Your cart is empty</p>
            <Link
              to="/shop"
              className="mt-6 inline-block px-6 py-2.5 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 transition-colors rounded font-light tracking-wider"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row">
                    <div className="w-24 h-24 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                        onError={e => e.target.src = "/placeholder.jpg"}
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex-1">
                      <h3 className="font-light">{item.name}</h3>
                      <p className="text-amber-500 mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-amber-500 text-white"
                        >
                          −
                        </button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-amber-500 text-white"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-4 text-sm text-gray-400 hover:text-red-400"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/shop"
                  className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors rounded block text-center"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>

            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 h-fit">
              <h2 className="text-xl font-light mb-4">ORDER SUMMARY</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-amber-500">FREE</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-light">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 w-full block py-3 bg-amber-500 text-gray-900 hover:bg-amber-400 transition-colors rounded font-light tracking-wider text-center"
              >
                PROCEED TO CHECKOUT
              </Link>

              <p className="mt-4 text-xs text-gray-500 text-center">
                Secure checkout • Free returns
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
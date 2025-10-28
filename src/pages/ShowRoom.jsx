'use client'
import { useState, useEffect, Suspense, useGLTF } from 'react'
import { Link } from 'react-router-dom'

// 🔍 Check WebGL support
function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch (e) {
    return false
  }
}

// 🖼️ Static Fallback View
function StaticCarView({ selectedColor }) {
  const colorMap = {
    '#0a0a0a': '/model/audi_r8_black.jpg',
    '#c0c6d4': '/model/audi_r8_silver.jpg',
    '#d97706': '/model/audi_r8_red.jpg',
    '#f3f4f6': '/model/audi_r8_white.jpg',
  }

  const imageUrl = colorMap[selectedColor] || '/model/audi_r8.jpg'

  return (
    <div className="bg-gray-800/20 border border-gray-800 rounded-xl h-[500px] overflow-hidden flex items-center justify-center">
      <img
        src={imageUrl}
        alt="VELOX E1"
        className="max-h-[450px] object-contain"
        onError={(e) => {
          e.target.src = '/placeholder-car.jpg'
        }}
      />
      <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
        3D view not supported on this device
      </div>
    </div>
  )
}

// 🧩 CarModel (loaded dynamically)
function CarModel({ color = '#0a0a0a' }) {
  const { scene } = useGLTF('/model/audi_r8.glb')

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          const name = child.name.toLowerCase()
          const matName = child.material?.name?.toLowerCase() || ''
          if (name.includes('body') || matName.includes('body') || name.includes('car')) {
            child.material.color.set(color)
          }
        }
      })
    }
  }, [scene, color])

  return <primitive object={scene} scale={0.8} position={[0, -1.5, 0]} />
}

// 🎨 3D Viewer (with lazy-loaded deps)
const Showroom3DViewer = ({ selectedColor }) => {
  const [Canvas, setCanvas] = useState(null)
  const [OrbitControls, setOrbitControls] = useState(null)
  const [Environment, setEnvironment] = useState(null)
  const [useGLTF, setUseGLTF] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dynamically import all 3D dependencies
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
    ]).then(([{ Canvas, useGLTF: gltf }, { OrbitControls, Environment }]) => {
      setCanvas(() => Canvas)
      setOrbitControls(() => OrbitControls)
      setEnvironment(() => Environment)
      setUseGLTF(() => gltf)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="bg-gray-800/20 border border-gray-800 rounded-xl h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-400">Loading 3D model...</p>
        </div>
      </div>
    )
  }

  // Create a wrapper that uses the dynamically imported hooks
  const Viewer = () => {
    const { scene } = useGLTF('/model/audi_r8.glb')

    useEffect(() => {
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh) {
            const name = child.name.toLowerCase()
            const matName = child.material?.name?.toLowerCase() || ''
            if (name.includes('body') || matName.includes('body') || name.includes('car')) {
              child.material.color.set(selectedColor)
            }
          }
        })
      }
    }, [scene])

    return (
      <>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <primitive object={scene} scale={0.8} position={[0, -1.5, 0]} />
        <OrbitControls
          enableZoom
          enablePan
          rotateSpeed={0.8}
          zoomSpeed={0.8}
          panSpeed={0.8}
        />
        <Environment preset="warehouse" />
      </>
    )
  }

  return (
    <div className="bg-gray-800/20 border border-gray-800 rounded-xl h-[500px] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Viewer />
        </Suspense>
      </Canvas>
    </div>
  )
}

// 🧠 Main Showroom Page
const Showroom = () => {
  const [selectedColor, setSelectedColor] = useState('#0a0a0a')
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    setWebglSupported(isWebGLSupported())
  }, [])

  const colorOptions = [
    { name: 'Obsidian Black', hex: '#0a0a0a' },
    { name: 'Velox Silver', hex: '#c0c6d4' },
    { name: 'Amber Red', hex: '#d97706' },
    { name: 'Arctic White', hex: '#f3f4f6' },
  ]

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide">VELOX SHOWROOM</h1>
          <p className="mt-2 text-gray-400">
            {webglSupported
              ? 'Explore our flagship model in stunning 3D detail.'
              : '3D experience not available. View high-resolution images below.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {webglSupported ? (
              <Showroom3DViewer selectedColor={selectedColor} />
            ) : (
              <StaticCarView selectedColor={selectedColor} />
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-light mb-4">EXTERIOR COLOR</h2>
              <div className="grid grid-cols-2 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      selectedColor === color.hex
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-gray-600"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <Link
                to="/book-test-drive"
                className="w-full block py-3 bg-amber-500 text-gray-900 hover:bg-amber-400 transition-colors rounded-lg font-light tracking-wider text-center"
              >
                BOOK A TEST DRIVE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Showroom
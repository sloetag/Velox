import { useState, useEffect } from 'react'

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <>
      <style>{`
        @keyframes velox-bounce {
          0%, 100% {
            transform: translateY(-15px);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-velox-bounce {
          animation: velox-bounce 3s infinite;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(3, 7, 18)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}>
        {/* Bouncing Logo */}
        <div className="animate-velox-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="64"
            height="64"
            style={{ color: '#fbbf24' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
        </div>

        {/* Centered SVG Text with Mask Animation */}
        <div style={{ marginTop: '24px' }}>
          <svg
            width="100%"
            height="30"
            viewBox="0 0 500 30" // Slightly wider to avoid clipping
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <mask id="textMask">
                <rect
                  x="0"
                  y="0"
                  width="0"
                  height="30"
                  fill="white"
                >
                  <animate
                    attributeName="width"
                    from="0"
                    to="500"
                    dur="3s"
                    fill="freeze"
                    keySplines="0.22 0.61 0.36 1"
                    calcMode="spline"
                  />
                </rect>
              </mask>
            </defs>

            {/* Faint base text (centered) */}
            <text
              x="50%"
              y="22"
              fill="rgba(251, 191, 36, 0.2)"
              fontSize="18"
              fontWeight="300"
              letterSpacing="2"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              VELOX - REDEFINING LUXURY
            </text>

            {/* Animated amber fill (centered, masked) */}
            <text
              x="50%"
              y="22"
              fill="url(#amberGradient)"
              fontSize="18"
              fontWeight="300"
              letterSpacing="2"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              mask="url(#textMask)"
            >
              VELOX - REDEFINING LUXURY
            </text>
          </svg>
        </div>
      </div>
    </>
  )
}

export default LoadingScreen
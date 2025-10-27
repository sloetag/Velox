'use client'
import { motion } from 'framer-motion'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
}

const imageVariants = {
  hidden: { scale: 1.03, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  exit: {
    scale: 1.02,
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeIn' },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, type: 'tween' },
  },
}

const Legacy = () => {
  return (
    <div className="w-full">
      <div className="bg-black">
        {/* SECTION 1: THE LEGACY */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-100px 0px -150px 0px', once: false }} // 🔁 allow repeat
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              variants={itemVariants}
            >
              <motion.h4
                className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide"
                variants={itemVariants}
              >
                THE LEGACY
              </motion.h4>
              <motion.p
                className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed"
                variants={itemVariants}
              >
                For over a century, we've pushed the boundaries of automotive excellence. Our heritage isn't just history — it's the foundation of every innovation we create today.
              </motion.p>
              <motion.div
                className="mt-6 flex items-center"
                variants={itemVariants}
              >
                <div className="w-12 h-px bg-amber-500"></div>
                <p className="ml-4 text-amber-400 font-light">Est. 1919</p>
              </motion.div>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2 rounded-2xl overflow-hidden"
              variants={imageVariants}
              whileHover="hover"
            >
              <img
                src="/gt-home.jpg"
                alt="Historic luxury car"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* SECTION 2: SUSTAINABLE LUXURY */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 border-t border-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-100px 0px -150px 0px', once: false }} 
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div
              className="rounded-2xl overflow-hidden"
              variants={imageVariants}
              whileHover="hover"
            >
              <img
                src="/coupe-home.jpg"
                alt="Sustainable manufacturing"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.h4
                className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide"
                variants={itemVariants}
              >
                SUSTAINABLE LUXURY
              </motion.h4>
              <motion.p
                className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed"
                variants={itemVariants}
              >
                True luxury considers tomorrow. Our carbon-neutral factories, recycled materials, and electric future ensure excellence without compromise.
              </motion.p>
              <motion.div
                className="mt-6 grid grid-cols-2 gap-4"
                variants={itemVariants}
              >
                {[
                  'Carbon Neutral by 2030',
                  '100% Recycled Interiors',
                  'Zero-Waste Manufacturing',
                  'EV-First Strategy',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <svg
                      className="h-5 w-5 text-amber-500 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-3 text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Legacy
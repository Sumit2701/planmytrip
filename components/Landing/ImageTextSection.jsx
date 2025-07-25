import Image from "next/image";
import { motion } from "framer-motion";

function ImageTextSection({
  imgSrc,
  imgAlt,
  title,
  subtitle,
  body,
  imgOnLeft = false,
}) {
  return (
    <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`grid-${imgOnLeft ? 'left' : 'right'}`}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${imgOnLeft ? 'left' : 'right'})`} />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12 ${
            imgOnLeft ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image Side - Better mobile layout */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative w-full"
          >
            <div className="relative group">
              {/* Decorative Elements - Smaller on mobile */}
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl opacity-15 blur-md group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-15 blur-lg"></div>

              <div className="relative w-full aspect-[4/5] max-w-[280px] sm:max-w-xs lg:max-w-sm mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  fill
                  className="object-cover transition-all duration-500 opacity-80"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 480px"
                  priority={false}
                />
                {/* Grain Overlay */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 256 256%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.3%22/%3E%3C/svg%3E')]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Stats Card - Better mobile positioning */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-2 sm:-bottom-4 lg:-bottom-6 bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-white/20 w-[85%] sm:w-[90%] lg:w-auto max-w-[200px] sm:max-w-none"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-xs sm:text-sm truncate">
                      Smart Planning
                    </p>
                    <p className="text-xs text-white/70">AI-Powered</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side - Better mobile spacing */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 space-y-4 sm:space-y-6 mt-6 lg:mt-0"
          >
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-blue-700 font-medium text-xs sm:text-sm">
                  {subtitle}
                </span>
              </motion.div>
            )}

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight"
            >
              {title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={
                    index === title.split(" ").length - 1
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm sm:text-base text-gray-600 leading-relaxed"
            >
              {body}
            </motion.div>

            {/* Feature Points - Better mobile grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6"
            >
              {["Instant Results", "Smart Recommendations", "Real-time Updates", "Budget Tracking"].map(
                (feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                    whileHover={{ scale: 1.02, x: 2 }}
                    className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-2.5 bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/40 transition-all duration-200"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-700 text-xs sm:text-sm">
                      {feature}
                    </span>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ImageTextSection;

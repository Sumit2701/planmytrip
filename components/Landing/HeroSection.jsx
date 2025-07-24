import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-16 h-16 bg-white/5 rounded-full backdrop-blur-xl border border-white/10"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full backdrop-blur-xl border border-white/10"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-1/4 w-32 h-32 bg-white/5 rounded-full backdrop-blur-xl border border-white/10"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 font-medium text-sm tracking-wide">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                AI-Powered Travel Planning
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-purple-600 leading-tight mb-6"
            >
              Discover
              <br />
              <span className="font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Extraordinary
              </span>
              <br />
              <span className="font-light">Adventures</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-lg text-black/70 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light"
            >
              Transform your travel dreams into perfectly crafted itineraries with
              our intelligent AI companion
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <Link href="/triplaniq" passHref>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium rounded-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Start Planning Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 font-medium rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 text-black text-sm font-light"
            >
              <p>Trusted by 50,000+ travelers worldwide</p>
            </motion.div>
          </div>

          {/* Right Hero Image */}
          <div className="relative lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative w-full h-[500px] lg:h-[400px] rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10">
                <Image
                  src="/images/main1.jpg" // Replace with your hero image path
                  alt="Travel adventure hero image"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5"></div>
              </div>

              {/* Minimal floating decorations */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full"
              />
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -left-3 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center backdrop-blur-xl">
          <div className="w-0.5 h-2 bg-white/60 rounded-full mt-1.5"></div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;

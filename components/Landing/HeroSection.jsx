import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="relative mt-12 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
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
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 3, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-12 h-12 bg-white/5 rounded-full backdrop-blur-xl border border-white/10"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-16 w-16 h-16 bg-white/5 rounded-full backdrop-blur-xl border border-white/10"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 left-1/4 w-20 h-20 bg-white/5 rounded-full backdrop-blur-xl border border-white/10"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-700 font-medium text-xs">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                AI-Powered Travel Planning
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl  text-purple-800 leading-tight mb-4"
            >
              Discover
              <br />
              <span className="font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Extraordinary
              </span>
              <br />
              <span className="">Adventures</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-base text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Transform your travel dreams into perfectly crafted itineraries with
              our intelligent AI companion
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center"
            >
              <Link href="/triplaniq" passHref>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative cursor-pointer px-6 py-2.5 bg-purple-600/10 backdrop-blur-xl border border-white/20 text-gray-700 font-medium rounded-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 overflow-hidden text-sm"
                >
                  <span className="relative z-10">Start Planning Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-white/5 cursor-pointer backdrop-blur-xl border border-white/10 text-gray-600 font-medium rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm"
              >
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-gray-500 text-xs"
            >
              <p>Trusted by 50,000+ travelers worldwide</p>
            </motion.div>
          </div>

          {/* Right Hero Image */}
          <div className="relative lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="relative group"
            >
              {/* Decorative Elements */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-15 blur-md group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-15 blur-lg"></div>

              <div className="relative w-full h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/hero5.jpg"
                  alt="Travel adventure hero image"
                  fill
                  className="object-cover transition-all opacity-60  duration-500"
                  priority
                />
                {/* Grain Overlay */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 256 256%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.3%22/%3E%3C/svg%3E')]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Stats Card */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl rounded-xl p-3 shadow-lg border border-white/20"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-xs">Smart Planning</p>
                    <p className="text-xs text-white/70">AI-Powered</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="w-4 h-6 border border-white/30 rounded-full flex justify-center backdrop-blur-xl">
          <div className="w-0.5 h-1.5 bg-white/60 rounded-full mt-1"></div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;

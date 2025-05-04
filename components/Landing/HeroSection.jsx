import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-16 relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex-1 z-10 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className=""
          >
            <span className="inline-block bg-secondary opacity-80 text-on-secondary font-semibold px-4 py-2 rounded-lg text-sm tracking-wide">
              AI-Powered Travel
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-navy-900 leading-tight mb-4 md:mb-6"
          >
            Discover Your Next <span className="text-secondary">Adventure</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-xl mx-auto md:mx-0 mb-8 md:mb-10"
          >
            Plan, book, and experience unforgettable journeys with our
            AI-powered travel platform. Your adventure starts here.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Link href="/triplaniq" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-blue-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg transition-colors duration-200"
              >
                Get Started
              </motion.button>
            </Link>
            <a href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-sm hover:bg-primary hover:text-white transition-all duration-200"
              >
                Learn More
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          className="flex-1 relative flex justify-center items-center w-full max-w-sm sm:max-w-md lg:max-w-lg mt-8 md:mt-0"
        >
          {/* Blob SVG background */}
          <svg
            className="absolute inset-0 w-full aspect-[1/1] max-w-xl z-0"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                <stop
                  id="stop1"
                  stopColor="var(--color-secondary-light)"
                  offset="0%"
                ></stop>
                <stop
                  id="stop2"
                  stopColor="var(--color-secondary)"
                  offset="100%"
                ></stop>
              </linearGradient>
            </defs>
            <path
              fill="url(#sw-gradient)"
              d="M23,-31.8C29.2,-27.2,33,-19.6,35.3,-11.7C37.6,-3.7,38.4,4.5,36.3,12C34.1,19.5,29.1,26.3,22.6,30.6C16.1,34.9,8,36.7,0,36.8C-8.1,36.8,-16.2,35.2,-24,31.3C-31.8,27.4,-39.3,21.3,-42,13.5C-44.8,5.7,-42.7,-3.7,-38.4,-11C-34,-18.3,-27.4,-23.5,-20.6,-27.8C-13.9,-32.2,-6.9,-35.8,0.8,-36.8C8.4,-37.9,16.9,-36.4,23,-31.8Z"
              width="100%"
              height="100%"
              transform="translate(50 50)"
              strokeWidth="0"
              style={{ transition: "0.3s" }}
              stroke="url(#sw-gradient)"
            ></path>
          </svg>
          <div className="relative rounded-3xl overflow-hidden w-full max-w-lg z-10">
            <img
              src="images/hero.png"
              alt="Traveler with backpack and phone"
              className="w-full aspect-[1/1] max-w-md object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;

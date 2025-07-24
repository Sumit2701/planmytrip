import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CallToActionSection = () => {
  return (
    <motion.section

      className="relative py-32 overflow-hidden"
    >
      {/* Minimal Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cta-grid"
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
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          
          className="space-y-8"
        >
          {/* Bold Headline */}
          <motion.h2
            
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-600 leading-tight"
          >
            Start Planning
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Today
            </span>
          </motion.h2>

          {/* Simple Description */}
          <motion.p
            
            className="text-xl text-black/80 max-w-2xl mx-auto font-light"
          >
            AI-powered itineraries in minutes
          </motion.p>

          {/* Clean Buttons */}
          <motion.div
            
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link href="/triplaniq" passHref>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-200 text-lg"
              >
                Get Started Free
              </motion.button>
            </Link>

            <motion.button
              className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-purple-900 font-medium rounded-full hover:bg-white/15 transition-all duration-200"
            >
              View Demo
            </motion.button>
          </motion.div>

          {/* Minimal Trust Line */}
          <motion.div
            className="pt-8"
          >
            <p className="text-purple-900/50 text-sm font-light">
              Trusted by 50,000+ travelers • No credit card required
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CallToActionSection;

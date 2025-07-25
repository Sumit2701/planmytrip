"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Floating Bubble Navbar - Better mobile positioning */}
      <div className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 w-[95vw] sm:w-auto max-w-4xl ${
        isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-95'
      }`}>
        <nav className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo - Better mobile size */}
            <Link href={"/"} className="group flex-shrink-0">
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer">
                <span className="hidden xs:inline">✈️ </span>TriplanIQ
              </h1>
            </Link>

            {/* Navigation Links - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <Link 
                href="/destinations" 
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200 relative group px-3 py-1.5 rounded-full hover:bg-white/20"
              >
                Destinations
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200 relative group px-3 py-1.5 rounded-full hover:bg-white/20"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200 relative group px-3 py-1.5 rounded-full hover:bg-white/20"
              >
                Contact
              </Link>
            </div>

            {/* Right Side - CTA Button and Mobile Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* CTA Button - Responsive sizing */}
              <Link
                href="/triplaniq"
                className="relative overflow-hidden bg-white/30 backdrop-blur-sm border border-white/20 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm shadow-md hover:bg-white/40 hover:scale-105 transform transition-all duration-200 group"
              >
                <span className="relative z-10 flex items-center space-x-1 sm:space-x-1.5">
                  <span className="hidden xs:inline">Plan </span>
                  <span>Trip</span>
                  <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
              </Link>

              {/* Mobile Menu Button - Better styling */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <motion.div 
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  className="w-4 h-4 flex flex-col justify-center items-center"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 2 }
                    }}
                    className="w-4 h-0.5 bg-gray-700 block origin-center transition-all duration-200"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    className="w-4 h-0.5 bg-gray-700 block mt-1 transition-all duration-200"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -2 }
                    }}
                    className="w-4 h-0.5 bg-gray-700 block mt-1 origin-center transition-all duration-200"
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Bubble - Improved animation and layout */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-40 lg:hidden w-[95vw] max-w-xs"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-6 shadow-lg">
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/destinations" 
                  className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-200 px-4 py-3 rounded-full hover:bg-white/20 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🏖️ Destinations
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-200 px-4 py-3 rounded-full hover:bg-white/20 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👥 About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors duration-200 px-4 py-3 rounded-full hover:bg-white/20 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📞 Contact
                </Link>
                
                {/* Mobile-only additional links */}
                <div className="border-t border-white/20 pt-4 mt-2">
                  <Link 
                    href="/pricing" 
                    className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/20 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    💰 Pricing
                  </Link>
                  <Link 
                    href="/help" 
                    className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/20 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ❓ Help
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay - Better interaction */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden bg-black/10 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  

  return (
    <>
      {/* Floating Bubble Navbar */}
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-95'
      }`}>
        <nav className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between space-x-8">
            {/* Logo */}
            <Link href={"/"} className="group">
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer">
                ✈️ TriplanIQ
              </h1>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
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

            {/* CTA Button */}
            <div className="flex items-center space-x-3">
              <Link
                href="/triplaniq"
                className="relative overflow-hidden bg-white/30 backdrop-blur-sm border border-white/20 text-gray-700 px-4 py-2 rounded-full font-medium text-sm shadow-md hover:bg-white/40 hover:scale-105 transform transition-all duration-200 group"
              >
                <span className="relative z-10 flex items-center space-x-1.5">
                  <span>Plan Trip</span>
                  <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 transition-all duration-200"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Bubble */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-lg min-w-[200px]">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/destinations" 
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200 px-3 py-2 rounded-full hover:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200 px-3 py-2 rounded-full hover:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200 px-3 py-2 rounded-full hover:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;

"use client"
import Link from "next/link";
import { useState , useEffect} from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect (optional - you can remove if not needed)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
    }`}>
      <nav className="flex items-center justify-between p-3 max-w-7xl mx-auto w-full">
        {/* Logo with gradient and animation */}
        <Link href={"/"} className="group">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer">
            ✈️ TriplanIQ
          </h1>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/destinations" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
            Destinations
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </div>

        {/* CTA Button with enhanced styling */}
        <div className="flex items-center space-x-4">
          <Link
            href="/triplaniq"
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Plan Your Trip</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (you can expand this) */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="px-6 py-4 space-y-3">
          <Link href="/destinations" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
            Destinations
          </Link>
          <Link href="/about" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
            About
          </Link>
          <Link href="/contact" className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

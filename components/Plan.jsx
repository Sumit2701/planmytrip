"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Plan() {
  const [prompt, setPrompt] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const printRef = useRef(null);

  // Enhanced typing effect for better UX
  useEffect(() => {
    if (prompt.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [prompt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);
    
    try {
      const response = await fetch("/api/generate_iternary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: prompt }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error(`Failed to generate itinerary: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        
        const lines = result.split('\n');
        console.log("Accumulated result:", result);
        for (const line of lines) {
          if (line.trim().startsWith('0:')) {
            try {
              const jsonStr = line.substring(2);
              const parsedData = JSON.parse(jsonStr);
              console.log("Parsed data:", parsedData);
              setItinerary(parsedData);
            } catch (e) {
              console.log("Parsing attempt failed:", e.message);
            }
          }
        }
      }
      
      if (!itinerary && result) {
        try {
          console.log("Final result before parsing:", result);
          const cleanResult = result.replace(/^0:/, '').trim();
          const finalData = JSON.parse(cleanResult);
          console.log("Final parsed data:", finalData);
          setItinerary(finalData);
        } catch (e) {
          console.error("Final parsing failed:", e);
          throw new Error("Failed to parse the generated itinerary");
        }
      }
      
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    
    const printButton = document.activeElement;
    const originalText = printButton.textContent;
    printButton.textContent = "Preparing...";
    printButton.disabled = true;
    
    setTimeout(() => {
      const originalContents = document.body.innerHTML;
      const printContents = content.innerHTML;
      
      document.body.innerHTML = `
        <div style="
          padding: 40px; 
          font-family: Inter, system-ui, -apple-system, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          color: #333333;
        ">
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #0A2342; padding-bottom: 20px;">
            <h1 style="color: #0A2342; font-size: 2.5rem; margin: 0; font-weight: 700;">TriplanIQ</h1>
            <p style="color: #A9A9A9; margin: 10px 0 0 0; font-size: 1.1rem;">Your AI-Powered Travel Planner</p>
          </div>
          ${printContents}
        </div>
      `;
      
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }, 300);
  };

  const handleClearForm = () => {
    setPrompt("");
    setItinerary(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern - matching HeroSection */}
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

      {/* Floating Elements - matching HeroSection */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 3, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-12 h-12 bg-white/5 rounded-full  backdrop-blur-xl border border-white/10"
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

        {/* Slow-moving bubbles beneath the form card */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -12, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-2/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 6, 0],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-indigo-400/15 to-cyan-400/15 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{
            y: [0, 18, 0],
            x: [0, -8, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 left-1/5 w-28 h-28 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{
            y: [0, -12, 0],
            x: [0, 10, 0],
            rotate: [0, -8, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-3/4 left-2/3 w-36 h-36 bg-gradient-to-br from-teal-400/15 to-blue-400/15 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{
            y: [0, 22, 0],
            x: [0, -5, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-1/2 right-1/5 w-20 h-20 bg-gradient-to-br from-violet-400/20 to-indigo-400/20 rounded-full backdrop-blur-sm border border-white/10"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-30 pt-20">
        {/* Hero Section - matching HeroSection style */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-2xl gap-3 flex items-center justify-center sm:text-3xl lg:text-4xl xl:text-5xl text-purple-800 leading-tight mb-4"
          >
            Plan Your 
            <span className="font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Perfect
            </span>
            <span className="">Journey</span>
          </motion.h1>


          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 mb-12"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
              <span>AI-Powered Planning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
              <span>Personalized Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
              <span>Instant Results</span>
            </div>
          </motion.div>
        </div>

        {/* Input Section - with frosted glass effect like HeroSection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-xl ring-purple-300 ring-1 border border-white/20 rounded-2xl p-8 mb-12 "
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block mb-3 text-lg font-semibold text-purple-800">
                Tell us about your dream trip
              </label>
              <div className="relative">
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full  p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200 text-gray-700 resize-none text-base leading-relaxed min-h-[120px] ring-blue-400 ring-1 placeholder-gray-500"
                  placeholder="Where would you like to go? How many days? What experiences excite you most? Any special preferences or budget requirements?"
                  required
                />
                {isTyping && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {prompt.length}/500 characters
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || !prompt.trim()}
                className="group relative flex-1 px-6 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 text-gray-700 font-medium rounded-full hover:bg-indigo/15 hover:border-white/30 transition-all duration-300 overflow-hidden text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!loading && (
                  <>
                    <span className="relative z-10">Generate Itinerary</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </motion.button>
              
              {(prompt || itinerary) && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleClearForm}
                  className="px-6 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 text-gray-600 font-medium rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm"
                >
                  Clear
                </motion.button>
              )}
            </div>
          </form>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-700 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0">⚠</div>
                <div>
                  <p className="font-semibold">Something went wrong</p>
                  <p className="mt-1 text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center p-12"
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
                <div className="absolute w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Creating Your Itinerary
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Our AI is analyzing your preferences to create the perfect travel plan. This may take 1-2 minutes.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Itinerary Display */}
        {itinerary && (
          <motion.div
            
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-800 to-blue-800 p-8 text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Your Personalized Itinerary</h2>
                  <p className="text-white/80">Crafted with AI precision for your perfect journey</p>
                </div>
                <motion.button 
                  
                  className="flex items-center px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-200 border border-white/20 text-sm"
                >
                  <span className="mr-2">📄</span>
                  Print PDF
                </motion.button>
              </div>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-sm" ref={printRef}>
              {/* Overview */}
              <div className="text-center mb-16 pb-8 border-b border-white/20">
                <h2 className="text-3xl font-bold mb-4 text-purple-800">{itinerary.overview.title}</h2>
                {itinerary.overview.subtitle && (
                  <p className="text-lg text-gray-700 mb-4 font-medium">{itinerary.overview.subtitle}</p>
                )}
                <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                  <span className="text-gray-700 font-medium">{itinerary.overview.duration}</span>
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">{itinerary.overview.dates}</span>
                </div>
              </div>

              {/* Destinations */}
              {itinerary.destinations.map((dest, destIdx) => (
                <div key={destIdx} className="mb-20 last:mb-0">
                  {/* Destination Header */}
                  <div className="mb-12 pb-6 border-b border-white/20">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-purple-800">{dest.city}, {dest.country}</h3>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-white rounded-full text-sm font-semibold">
                        Days {dest.daysRange.replace(/[^0-9\-]/g, '')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Two-column Layout */}
                  <div className="grid lg:grid-cols-2 gap-12 mb-12">
                    {/* Destination Info */}
                    <div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {dest.description}
                      </p>
                    </div>
                    
                    {/* Accommodation */}
                    <div>
                      <h4 className="text-lg font-semibold mb-6 text-purple-800 flex items-center">
                        <span className="mr-2">🏨</span>
                        Accommodation
                      </h4>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/30">
                        {dest.hotel.imageUrl && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={dest.hotel.imageUrl}
                              alt={dest.hotel.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/600x400?text=Hotel+Image";
                              }}
                            />
                            {/* Grain overlay for hotel images too */}
                            <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 256 256%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.3%22/%3E%3C/svg%3E')]"></div>
                          </div>
                        )}
                        <div className="p-6">
                          <h5 className="text-lg font-semibold mb-4 text-purple-800">{dest.hotel.name}</h5>
                          <div className="space-y-3 mb-6">
                            {dest.hotel.stayDates && (
                              <div className="flex items-center text-gray-700 text-sm">
                                <span className="mr-2">📅</span>
                                <span className="font-medium">{dest.hotel.stayDates}</span>
                              </div>
                            )}
                            {dest.hotel.address && (
                              <div className="flex items-start text-gray-700 text-sm">
                                <span className="mr-2 mt-0.5">📍</span>
                                <span>{dest.hotel.address}</span>
                              </div>
                            )}
                            {dest.hotel.rating && (
                              <div className="flex items-center">
                                <div className="flex mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <span
                                      key={i}
                                      className={`text-sm ${i < Math.floor(dest.hotel.rating) ? 'text-yellow-400' : 'text-gray-400'}`}
                                    >
                                      ⭐
                                    </span>
                                  ))}
                                </div>
                                <span className="text-gray-700 font-medium text-sm">{dest.hotel.rating}/5</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div>
                              {dest.hotel.pricePerNight && (
                                <div className="text-lg font-bold text-purple-800">{dest.hotel.pricePerNight}</div>
                              )}
                              {dest.hotel.totalPrice && (
                                <div className="text-sm text-gray-600">{dest.hotel.totalPrice} total</div>
                              )}
                            </div>
                            {dest.hotel.websiteUrl && (
                              <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href={dest.hotel.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm"
                              >
                                <span className="mr-2">🔗</span>
                                Book Now
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Itinerary */}
                  <div className="mb-12">
                    <h4 className="text-lg font-semibold mb-8 text-purple-800 flex items-center">
                      <span className="mr-2">📅</span>
                      Daily Itinerary
                    </h4>
                    
                    <div className="space-y-6">
                      {dest.schedule.map((day, dayIdx) => (
                        <div key={dayIdx} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                              <div className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold px-4 py-2 rounded-full">
                                Day {day.dayNumber}
                              </div>
                              <span className="text-gray-700 font-medium">{day.date}</span>
                            </div>
                          </div>
                          
                          {day.description && (
                            <div className="font-medium mb-6 text-purple-800 bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-white/40">
                              {day.description}
                            </div>
                          )}
                          
                          {day.scheduleItems && day.scheduleItems.length > 0 && (
                            <div className="space-y-4 mb-6">
                              {day.scheduleItems.map((item, idx) => (
                                <div key={idx} className="bg-white/30 backdrop-blur-sm rounded-lg p-4 border border-white/40">
                                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                                    <div className="flex items-center gap-3">
                                      <span className="bg-purple-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {item.time}
                                      </span>
                                      <h6 className="font-semibold text-purple-800">{item.activity}</h6>
                                      {item.location && (
                                        <span className="text-gray-600 text-sm bg-white/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/50">
                                          {item.location}
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <span className="font-semibold text-cyan-600">{item.cost}</span>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 leading-relaxed pl-0 sm:pl-16">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex justify-end pt-4 border-t border-white/30">
                            <div className="bg-white/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/50">
                              <span className="text-gray-700 font-medium">Daily Total: </span>
                              <span className="font-bold text-cyan-600">{day.dailyCost}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Total Cost */}
              {itinerary.approxTotalCost && (
                <div className="mt-16 text-center">
                  <div className="inline-block bg-gradient-to-r from-purple-800 to-blue-800 p-8 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Total Estimated Cost</h3>
                    <p className="text-2xl font-bold">{itinerary.approxTotalCost}</p>
                    <p className="text-white/80 mt-2 text-sm">*Prices are approximate and may vary</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator - matching HeroSection */}
      <motion.div
        animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="w-4 h-6 border border-white/30 rounded-full flex justify-center backdrop-blur-xl">
          <div className="w-0.5 h-1.5 bg-white/60 rounded-full mt-1"></div>
        </div>
      </motion.div>
    </div>
  );
}

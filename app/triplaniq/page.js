"use client";
import { useEffect, useState, useRef } from "react";

export default function Home() {
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

  // Enhanced print function with better user feedback
  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    
    // Show loading state
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
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        ">
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #0f766e; padding-bottom: 20px;">
            <h1 style="color: #0f766e; font-size: 2.5rem; margin: 0; font-weight: 700;">TriplanIQ</h1>
            <p style="color: #64748b; margin: 10px 0 0 0; font-size: 1.1rem;">Your AI-Powered Travel Planner</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-blue-600/10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 max-w-6xl pt-16 pb-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-3 rounded-full">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 mb-6 tracking-tight">
              TriplanIQ
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your travel dreams into meticulously crafted itineraries with the power of AI
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-8">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>AI-Powered Planning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Personalized Experiences</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Instant Generation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl pb-16">
        {/* Enhanced Input Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 sm:p-12 mb-12 hover:shadow-3xl transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <label htmlFor="prompt" className="block mb-4 text-xl font-semibold text-slate-800">
                Describe your perfect journey
              </label>
              <div className="relative">
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-6 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 text-slate-800 resize-none bg-white/80 backdrop-blur-sm text-lg leading-relaxed min-h-[120px]"
                  placeholder="Tell us about your dream trip... Where would you like to go? How many days? What experiences excite you most? Any special preferences or requirements?"
                  required
                />
                {isTyping && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 text-teal-500">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-slate-500">
                {prompt.length}/500 characters
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="flex-1 group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Crafting Your Journey...
                  </span>
                ) : (
                  <span className="flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Generate My Itinerary
                  </span>
                )}
              </button>
              
              {(prompt || itinerary) && (
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-medium transition-all duration-200 hover:scale-[1.02]"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {/* Enhanced Error Display */}
          {error && (
            <div className="mt-8 p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl animate-fade-in">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                </svg>
                <div>
                  <p className="font-semibold text-lg">Oops! Something went wrong</p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Loading State */}
          {loading && (
            <div className="mt-8 text-center p-12">
              <div className="relative inline-flex items-center justify-center mb-8">
                <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute w-20 h-20 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute w-12 h-12 border-2 border-blue-400 border-b-transparent rounded-full animate-spin animate-reverse" style={{ animationDuration: '1.5s' }}></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Creating Your Perfect Itinerary</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">Our AI is analyzing thousands of possibilities to craft your ideal travel experience. This may take 1-2 minutes.</p>
              <div className="flex justify-center gap-2">
                {['Analyzing destinations', 'Finding accommodations', 'Planning activities', 'Optimizing routes'].map((step, index) => (
                  <div
                    key={step}
                    className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Itinerary Display */}
        {itinerary && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden animate-fade-in">
            {/* Enhanced Header with Actions */}
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Personalized Itinerary</h2>
                  <p className="text-teal-100">Crafted with AI precision, designed for unforgettable experiences</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handlePrint}
                    className="flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 border border-white/20"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                    </svg>
                    Print PDF
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-8 sm:p-12" ref={printRef}>
              {/* Enhanced Overview */}
              <div className="text-center mb-16 pb-8 border-b border-slate-200">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">{itinerary.overview.title}</h2>
                {itinerary.overview.subtitle && (
                  <p className="text-xl text-teal-600 mb-3 font-medium">{itinerary.overview.subtitle}</p>
                )}
                <div className="inline-flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-full">
                  <span className="text-slate-700 font-medium">{itinerary.overview.duration}</span>
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{itinerary.overview.dates}</span>
                </div>
              </div>

              {/* Enhanced Destinations */}
              {itinerary.destinations.map((dest, destIdx) => (
                <div key={destIdx} className="mb-20 last:mb-0">
                  {/* Enhanced Destination Header */}
                  <div className="mb-12 pb-6 border-b border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <h3 className="text-3xl sm:text-4xl font-bold text-slate-800">{dest.city}, {dest.country}</h3>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-semibold">
                        Days {dest.daysRange.replace(/[^0-9\-]/g, '')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Two-column Layout */}
                  <div className="grid lg:grid-cols-2 gap-12 mb-12">
                    {/* Enhanced Destination Info */}
                    <div className="space-y-6">
                      <div className="prose prose-lg prose-slate max-w-none">
                        <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                          {dest.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced Accommodation */}
                    <div>
                      <h4 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
                        <svg className="w-6 h-6 mr-3 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524z"></path>
                        </svg>
                        Accommodation
                      </h4>
                      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        {dest.hotel.imageUrl && (
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={dest.hotel.imageUrl}
                              alt={dest.hotel.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/600x400?text=Hotel+Image";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          </div>
                        )}
                        <div className="p-6">
                          <h5 className="text-2xl font-bold mb-4 text-slate-800">{dest.hotel.name}</h5>
                          <div className="space-y-3 mb-6">
                            {dest.hotel.stayDates && (
                              <div className="flex items-center text-slate-600">
                                <svg className="w-5 h-5 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span className="font-medium">{dest.hotel.stayDates}</span>
                              </div>
                            )}
                            {dest.hotel.address && (
                              <div className="flex items-start text-slate-600">
                                <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>{dest.hotel.address}</span>
                              </div>
                            )}
                            {dest.hotel.rating && (
                              <div className="flex items-center">
                                <div className="flex mr-3">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-5 h-5 ${i < Math.floor(dest.hotel.rating) ? 'text-amber-400' : 'text-slate-300'}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-slate-600 font-medium">{dest.hotel.rating}/5</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="space-y-1">
                              {dest.hotel.pricePerNight && (
                                <div className="text-2xl font-bold text-slate-800">{dest.hotel.pricePerNight}</div>
                              )}
                              {dest.hotel.totalPrice && (
                                <div className="text-sm text-slate-600">{dest.hotel.totalPrice} total</div>
                              )}
                            </div>
                            {dest.hotel.websiteUrl && (
                              <a
                                href={dest.hotel.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                                Book Now
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Itinerary Section */}
                  <div className="mb-12">
                    <h4 className="text-2xl font-bold mb-8 text-slate-800 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                      </svg>
                      Daily Itinerary
                    </h4>
                    
                    <div className="space-y-8">
                      {dest.schedule.map((day, dayIdx) => (
                        <div key={dayIdx} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                              <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold px-4 py-2 rounded-full text-lg">
                                Day {day.dayNumber}
                              </div>
                              <span className="text-slate-600 font-medium">{day.date}</span>
                            </div>
                          </div>
                          
                          {day.description && (
                            <div className="text-xl font-semibold mb-6 text-slate-800 bg-slate-100/50 p-4 rounded-xl">
                              {day.description}
                            </div>
                          )}
                          
                          {day.scheduleItems && day.scheduleItems.length > 0 && (
                            <div className="space-y-4 mb-6">
                              {day.scheduleItems.map((item, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                                    <div className="flex items-center gap-3">
                                      <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {item.time}
                                      </span>
                                      <h6 className="text-xl font-bold text-slate-800">{item.activity}</h6>
                                      {item.location && (
                                        <span className="text-slate-500 text-sm bg-slate-100 px-2 py-1 rounded-full">
                                          {item.location}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <span className="text-lg font-bold text-teal-600">{item.cost}</span>
                                    </div>
                                  </div>
                                  <p className="text-slate-700 leading-relaxed pl-0 sm:pl-16">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex justify-end pt-4 border-t border-slate-200">
                            <div className="bg-teal-50 px-4 py-2 rounded-xl">
                              <span className="text-slate-700 font-medium">Daily Total: </span>
                              <span className="text-xl font-bold text-teal-600">{day.dailyCost}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Enhanced Total Cost */}
              {itinerary.approxTotalCost && (
                <div className="mt-16 text-center">
                  <div className="inline-block bg-gradient-to-r from-teal-600 to-blue-600 p-8 rounded-2xl text-white shadow-2xl">
                    <h3 className="text-2xl font-bold mb-2">Total Estimated Cost</h3>
                    <p className="text-4xl font-bold">{itinerary.approxTotalCost}</p>
                    <p className="text-teal-100 mt-2">*Prices are approximate and may vary</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

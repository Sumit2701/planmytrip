"use client";
import {useEffect, useState, useRef } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const printRef = useRef(null);

  // Debugging useEffect to track state changes
 

  // Existing handleSubmit function remains unchanged
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null); // Clear previous itinerary
    
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
      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      
      while (true) {

        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        
        // Try to parse the accumulated JSON periodically
        const lines = result.split('\n');
        console.log("Accumulated result:", result);
        for (const line of lines) {
          if (line.trim().startsWith('0:')) {
            try {
              const jsonStr = line.substring(2); // Remove '0:' prefix
              const parsedData = JSON.parse(jsonStr);
              console.log("Parsed data:", parsedData);
              setItinerary(parsedData);
            } catch (e) {
              // Continue if not valid JSON yet
              console.log("Parsing attempt failed:", e.message);
            }
          }
        }
      }
      
      // Final attempt to parse if no streaming updates worked
      if (!itinerary && result) {
        try {
          // Clean up the result string
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

  // Function to handle printing
  const handlePrint = () => {
    const content = printRef.current;
    const originalContents = document.body.innerHTML;
    
    // Create a print-friendly version
    const printContents = content.innerHTML;
    document.body.innerHTML = `
      <div style="padding: 20px;">
        <h1 style="text-align: center; margin-bottom: 20px; color: #0f766e;">TriplanIQ</h1>
        ${printContents}
      </div>
    `;
    
    window.print();
    
    // Restore original content
    document.body.innerHTML = originalContents;
    
    // Re-attach event handlers after restoring content
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-500 mb-3">TriplanIQ</h1>
          <p className="text-lg text-slate-600">Your AI-Powered Travel Planner</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 mb-8 transition-all">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-6">
              <label htmlFor="prompt" className="block mb-2 text-lg font-medium text-slate-700">
                Describe your dream trip
              </label>
              <input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-800"
                rows="3"
                placeholder="E.g., I want to plan a 3-day trip to Paris with my family. We enjoy museums, good food, and walking tours."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-xl hover:shadow-md disabled:opacity-70 transition-all duration-300 font-medium"
            >
              {loading ? 
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span> : 
                "Generate Itinerary"
              }
            </button>
          </form>

          {error && (
            <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl border border-red-100 animate-fade-in">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center p-8 mb-6">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="h-16 w-16 relative">
                  <div className="absolute top-0 left-0 right-0 bottom-0 border-t-2 border-b-2 border-teal-500 rounded-full animate-spin"></div>
                  <div className="absolute top-1 left-1 right-1 bottom-1 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin animation-delay-150"></div>
                </div>
              </div>
              <p className="text-lg font-medium text-slate-700">Creating your perfect itinerary...</p>
              <p className="text-slate-500 mt-2">This may take a minute or two</p>
            </div>
          )}
        </div>

        {itinerary && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 mb-8 animate-fade-in">
            <div className="flex justify-end mb-4">
              <button 
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                </svg>
                Print Itinerary
              </button>
            </div>
            
            <div ref={printRef}>
              {/* Overview */}
              <div className="mb-10 text-center border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-bold mb-2 text-slate-800">{itinerary.overview.title}</h2>
                {itinerary.overview.subtitle && (
                  <p className="text-lg text-teal-600 mb-1">{itinerary.overview.subtitle}</p>
                )}
                <p className="text-slate-600">{itinerary.overview.duration} &middot; {itinerary.overview.dates}</p>
              </div>

              {/* Destinations */}
              {itinerary.destinations.map((dest, destIdx) => (
                <div key={destIdx} className="mb-16 last:mb-0">
                  {/* Destination header */}
                  <div className="mb-8 pb-4 border-b border-slate-100">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-800">{dest.city}, {dest.country}</h3>
                    <p className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">Days {dest.daysRange.replace(/[^0-9\-]/g, '')}</p>
                  </div>
                  
                  {/* Two-column layout */}
                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {/* Left: Destination Info */}
                    <div>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {dest.description}
                      </p>
                    </div>
                    
                    {/* Right: Accommodation */}
                    <div>
                      <h4 className="text-xl font-bold mb-4 text-slate-800">Accommodation</h4>
                      <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        {dest.hotel.imageUrl && (
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={dest.hotel.imageUrl}
                              alt={dest.hotel.name}
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/600x400?text=Hotel+Image";
                              }}
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h5 className="text-xl font-bold mb-3 text-slate-800">{dest.hotel.name}</h5>
                          <div className="text-slate-700 mb-3 space-y-1">
                            {dest.hotel.stayDates && <div className="text-sm">{dest.hotel.stayDates}</div>}
                            {dest.hotel.pricePerNight && <div className="font-medium">{dest.hotel.pricePerNight} per night</div>}
                            {dest.hotel.totalPrice && <div className="font-medium">{dest.hotel.totalPrice} total</div>}
                          </div>
                          <div className="space-y-1 mb-4">
                            {dest.hotel.address && (
                              <div className="text-slate-600 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                {dest.hotel.address}
                              </div>
                            )}
                            {dest.hotel.rating && (
                              <div className="text-slate-600 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                {dest.hotel.rating}/5
                              </div>
                            )}
                          </div>
                          {dest.hotel.websiteUrl && (
                            <a
                              href={dest.hotel.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
                            >
                              Book now
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary Section */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold mb-6 text-slate-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                      </svg>
                      Itinerary
                    </h4>
                    {dest.schedule.map((day, dayIdx) => (
                      <div key={dayIdx} className="mb-8 pb-6 border-b border-slate-100 last:border-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-teal-100 text-teal-700 font-medium px-3 py-1 rounded-full text-sm">Day {day.dayNumber}</span>
                          <span className="text-slate-500 text-sm">{day.date}</span>
                        </div>
                        {day.description && (
                          <div className="text-lg font-medium mb-4 text-slate-800">{day.description}</div>
                        )}
                        <div className="text-slate-700 mb-6">
                          {day.scheduleItems && day.scheduleItems.length > 0 && (
                            <div className="space-y-6">
                              {day.scheduleItems.map((item, idx) => (
                                <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                  <div className="flex flex-wrap items-start gap-2 mb-2">
                                    <span className="font-medium text-slate-800 bg-slate-200 px-2 py-1 rounded text-sm">{item.time}</span>
                                    <h5 className="font-bold text-slate-800 text-lg">{item.activity}</h5>
                                    {item.location && (
                                      <span className="text-slate-500 text-sm">({item.location})</span>
                                    )}
                                    <span className="ml-auto text-teal-600 font-medium">{item.cost}</span>
                                  </div>
                                  <p className="text-slate-700 text-sm leading-relaxed mb-2">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Daily cost */}
                        <div className="mt-4 text-right text-slate-700 font-medium">
                          Daily Total: <span className="text-teal-600">{day.dailyCost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* Overall cost */}
              {itinerary.approxTotalCost && (
                <div className="mt-10 text-center p-6 border-t border-slate-100">
                  <p className="text-xl font-bold text-slate-800">
                    Approximate Total Cost: <span className="text-teal-600">{itinerary.approxTotalCost}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Existing handleSubmit function remains unchanged
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/generate_iternary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: prompt }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }
      
      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        result += decoder.decode(value, { stream: true });
        try {
          // Try to parse the accumulated JSON
          const parsedData = JSON.parse(result);
          setItinerary(parsedData);
        } catch (e) {
          // Continue accumulating data if it's not valid JSON yet
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto p-6 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-3">TriplanIQ</h1>
          <p className="text-xl text-gray-600">Your AI-Powered Travel Planner</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-5">
              <label htmlFor="prompt" className="block mb-2 text-lg font-medium text-gray-700">
                Describe your dream trip:
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                rows="4"
                placeholder="E.g., I want to plan a 3-day trip to Paris with my family. We enjoy museums, good food, and walking tours."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition shadow-md font-medium"
            >
              {loading ? "Generating..." : "Generate Itinerary"}
            </button>
          </form>

          {error && (
            <div className="p-4 mb-6 bg-red-100 text-red-700 rounded-lg border border-red-200">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center p-8 mb-6">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-lg font-medium text-gray-700">Creating your perfect itinerary...</p>
              <p className="text-gray-500 mt-2">This may take a minute or two</p>
            </div>
          )}
        </div>

        {itinerary && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            {/* Overview */}
            <div className="mb-8 text-center border-b pb-4">
              <h2 className="text-3xl font-bold mb-2 text-indigo-800">{itinerary.overview.title}</h2>
              {itinerary.overview.subtitle && (
                <p className="text-lg text-indigo-600 mb-1">{itinerary.overview.subtitle}</p>
              )}
              <p className="text-gray-700">{itinerary.overview.duration} &middot; {itinerary.overview.dates}</p>
            </div>

            {/* Destinations */}
            {itinerary.destinations.map((dest, destIdx) => (
              <div key={destIdx} className="mb-16 last:mb-0">
                {/* Two-column layout */}
                <div className="md:flex md:gap-10 mb-10">
                  {/* Left: Destination Info */}
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <h3 className="text-3xl font-extrabold mb-2">{dest.city}, {dest.country}</h3>
                    <p className="text-xl font-bold mb-3">Days {dest.daysRange.replace(/[^0-9\-]/g, '')}</p>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {dest.description}
                    </p>
                  </div>
                  {/* Right: Accommodation */}
                  <div className="md:w-1/2">
                    <h4 className="text-2xl font-bold mb-3">Accommodation</h4>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      {dest.hotel.imageUrl && (
                        <img
                          src={dest.hotel.imageUrl}
                          alt={dest.hotel.name}
                          className="w-full h-56 object-cover mb-4"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400?text=No+Image+Available";
                          }}
                        />
                      )}
                      <div className="px-2 pb-4">
                        <h5 className="text-xl font-bold mb-2">{dest.hotel.name}</h5>
                        <div className="text-gray-700 mb-2">
                          {dest.hotel.stayDates && <div>{dest.hotel.stayDates}</div>}
                          {dest.hotel.pricePerNight && <div>{dest.hotel.pricePerNight} /per night</div>}
                          {dest.hotel.totalPrice && <div>{dest.hotel.totalPrice} total</div>}
                        </div>
                        {dest.hotel.address && (
                          <div className="text-gray-600 mb-1">{dest.hotel.address}</div>
                        )}
                        {dest.hotel.rating && (
                          <div className="text-gray-600 mb-1">⭐ {dest.hotel.rating}/5</div>
                        )}
                        {dest.hotel.websiteUrl && (
                          <a
                            href={dest.hotel.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
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
                  <h4 className="text-2xl font-bold mb-6">Itinerary</h4>
                  {dest.schedule.map((day, dayIdx) => (
                    <div key={dayIdx} className="mb-8">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-lg font-bold">Day: {day.dayNumber}</span>
                        <span className="text-gray-600">{day.date}</span>
                      </div>
                      {day.description && (
                        <div className="text-xl font-semibold mb-2">{day.description}</div>
                      )}
                      <div className="text-gray-800 mb-2 whitespace-pre-line">
                        {/* If you want to support links/bold, use a Markdown/HTML renderer here */}
                        {day.scheduleItems && day.scheduleItems.length > 0 && (
                          <ul className="list-disc pl-5">
                            {day.scheduleItems.map((item, idx) => (
                              <li key={idx} className="mb-1">
                                <span className="font-medium">{item.time}:</span> {item.activity}
                                {item.location && (
                                  <span className="text-gray-600 ml-2">({item.location})</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {/* Optional: Approx. cost per day if available */}
                      {day.approxTotalCost && (
                        <div className="font-semibold mt-2">
                          Approx. Total Cost: {day.approxTotalCost}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* Overall cost */}
            {itinerary.approxTotalCost && (
              <div className="mt-10 text-center">
                <p className="text-xl font-bold text-indigo-700">
                  Approximate Total Cost: {itinerary.approxTotalCost}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>)}
  
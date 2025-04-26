
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
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800 border-b pb-4">Your Personalized Itinerary</h2>
            
            {itinerary.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-10 last:mb-0">
                <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                  <h3 className="text-2xl font-bold text-indigo-700">{day.day}</h3>
                </div>
                
                <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    {day.hotel.imageUrl && (
                      <div className="md:w-1/3 relative h-64 md:h-auto">
                        <img
                          src={day.hotel.imageUrl}
                          alt={`${day.hotel.name}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400?text=No+Image+Available";
                          }}
                        />
                      </div>
                    )}
                    
                    <div className={`p-6 ${day.hotel.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                      <h4 className="text-xl font-bold mb-3 text-indigo-700">
                        <span className="mr-2">🏨</span>
                        {day.hotel.name}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                        {day.hotel.price && (
                          <p className="flex items-center">
                            <span className="font-medium mr-2">💰 Price:</span> {day.hotel.price}
                          </p>
                        )}
                        {day.hotel.rating && (
                          <p className="flex items-center">
                            <span className="font-medium mr-2">⭐ Rating:</span> {day.hotel.rating}/5
                          </p>
                        )}
                        {day.hotel.address && (
                          <p className="flex items-center col-span-full">
                            <span className="font-medium mr-2">📍 Address:</span> {day.hotel.address}
                          </p>
                        )}
                      </div>
                      
                      {day.hotel.websiteUrl && (
                        <a 
                          href={day.hotel.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-4 inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
                        >
                          Visit Hotel Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4 text-indigo-700 flex items-center">
                    <span className="mr-2">📅</span> Daily Schedule
                  </h4>
                  
                  <div className="space-y-4">
                    {day.schedule.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition">
                        <div className="flex flex-wrap items-start">
                          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium mb-2 mr-3">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-1">{item.activity}</p>
                            {item.location && (
                              <p className="text-gray-600 flex items-center">
                                <span className="mr-1">📍</span> {item.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <footer className="text-center text-gray-500 mt-10">
          <p>© 2023 TriplanIQ - Plan your perfect trip with AI</p>
        </footer>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Iternary } from "./Iternary";

export default function Plan() {
  const [prompt, setPrompt] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const printRef = useRef(null);

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
          setShowInput(false); // Hide input section when itinerary is generated
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
            <h1 style="color: #0A2342; font-size: 2.5rem; margin: 0; font-weight: 700;">Plan My Trip</h1>
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
    setShowInput(true);
  };

  const handleBackToInput = () => {
    setShowInput(true);
    setItinerary(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {showInput ? (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Plan Your Perfect Journey
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Tell us about your dream trip, and our AI will create a personalized itinerary for you.
            </p>

            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="prompt" className="block mb-3 text-lg font-semibold text-gray-800">
                    Describe your ideal trip
                  </label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] text-base"
                    placeholder="Where would you like to go? How many days? What experiences excite you most? Any special preferences or budget requirements?"
                    required
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    {prompt.length}/500 characters
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    size="lg"
                  >
                    {loading ? "Generating..." : "Generate Itinerary"}
                  </Button>
                  
                  {prompt && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClearForm}
                      size="lg"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </form>

              {/* Error Display */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0">⚠</div>
                    <div>
                      <p className="font-semibold">Something went wrong</p>
                      <p className="mt-1 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="mt-8 text-center p-12">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Creating Your Itinerary
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Our AI is analyzing your preferences to create the perfect travel plan. This may take 1-2 minutes.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={handleBackToInput}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Planning
              </Button>
            </div>

            {/* Itinerary Display */}
            {itinerary && (
              <Iternary itinerary={itinerary} handlePrint={handlePrint} printRef={printRef} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

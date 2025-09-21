"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Iternary } from "./Iternary";

export default function Plan() {
  const [prompt, setPrompt] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const printRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);
    try {
      const response = await fetch("/api/generate_iternary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate itinerary: ${response.status} ${response.statusText} ${errorText}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        for (const line of result.split('\n')) {
          if (line.trim().startsWith('0:')) {
            try {
              const parsed = JSON.parse(line.substring(2));
              setItinerary(parsed);
            } catch {}
          }
        }
      }
      if (!itinerary && result) {
        try {
          const finalData = JSON.parse(result.replace(/^0:/, '').trim());
          setItinerary(finalData);
          setShowInput(false);
        } catch {
          throw new Error("Failed to parse the generated itinerary");
        }
      } else if (itinerary) {
        setShowInput(false);
      }
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    const content = printRef.current;
    if (!content) return;
    const originalContents = document.body.innerHTML;
    const printContents = content.innerHTML;
    document.body.innerHTML = `
      <div style="padding:40px;font-family:Inter,system-ui,-apple-system,sans-serif;max-width:800px;margin:0 auto;line-height:1.6;color:#222;">
        <div style="text-align:center;margin-bottom:40px;border-bottom:2px solid #201f3a;padding-bottom:20px;">
          <h1 style="color:#201f3a;font-size:2.4rem;margin:0;font-weight:700;">Plan My Trip</h1>
          <p style="color:#666;margin:10px 0 0;font-size:1.05rem;">Your AI-Powered Travel Planner</p>
        </div>
        ${printContents}
      </div>`;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  

  function handleBackToInput() {
    setShowInput(true);
    setItinerary(null);
    setError(null);
  }

  return (
  <div className="min-h-screen w-full relative cotton-candy-bg">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center">
            <div className="mt-8 text-center p-12">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-16 h-16 border-4 border-indigo-200 rounded-full" />
                <div className="absolute w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">Creating Your Itinerary</h3>
              <p className="text-gray-600 max-w-md mx-auto">Our AI is analyzing your preferences to create the perfect travel plan. This may take 1-2 minutes.</p>
            </div>
          </div>
        ) : showInput ? (
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1 rounded-full text-sm bg-pink-100 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI-Powered Travel Planning
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-700 mb-6">Plan Your Perfect Trip</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">Tell us about your dream adventure and our AI will craft a personalized multi-destination itinerary just for you.</p>
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="prompt" className="block mb-3 text-lg font-semibold text-neutral-700">Describe your ideal trip</label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[140px] text-base resize-vertical focus:ring-0 bg-white/60 border border-indigo-100"
                    maxLength={500}
                    placeholder="Where would you like to go? How many days? What experiences excite you most? Any special preferences or budget requirements?"
                    required
                  />
                  <div className={`mt-2 text-sm ${prompt.length > 450 ? 'text-red-500' : prompt.length > 350 ? 'text-amber-600' : 'text-gray-500'}`}>{prompt.length}/500 characters</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" disabled={loading || !prompt.trim()} className="flex-1 px-8 py-4 text-lg bg-pink-500/20 hover:bg-pink-300 cursor-pointer text-neutral-700 transition-colors shadow-sm" size="lg">
                    {loading ? "Generating..." : "Generate Itinerary"}
                  </Button>
                </div>
              </form>
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
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <Button variant="outline" onClick={handleBackToInput} className="flex items-center gap-2 border-pink-200 text-neutral-700 hover:bg-pink-100/60">
                <ArrowLeft className="w-4 h-4" />
                Back to Planning
              </Button>
            </div>
            {itinerary && <Iternary itinerary={itinerary} handlePrint={handlePrint} printRef={printRef} />}
          </div>
        )}
      </div>
    </div>
  );
}

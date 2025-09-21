"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MapPin, Calendar, Globe, Sparkles } from "lucide-react";
import { Bento } from "@/components/Bento";

export default function Home() {
  return (
  <div className="min-h-screen w-full relative cotton-candy-bg">
      <section className="px-6 py-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-1 rounded-full text-sm bg-pink-100">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Travel Planning
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-neutral-700 mb-6">
            Plan My Trip
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your travel dreams into detailed itineraries. Just describe your ideal trip, 
            and our AI creates a personalized multi-destination journey for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/triplaniq">
              <Button size="lg" 
              className="px-8 cursor-pointer py-4 text-lg bg-pink-500/20 hover:bg-pink-300 ">
                Start Planning Now
              </Button>
            </Link>
            <Link href="/template.pdf" target="_blank" rel="noopener noreferrer">
              <Button  variant="outline" size="lg" className="px-8 py-4 text-lg cursor-pointer">
                View Sample Itinerary
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto py-8">
        <Bento/>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Ready to Plan Your Perfect Trip?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of travelers who trust TriplanIQ to create unforgettable journeys.
          </p>
          <Link href="/triplaniq">
            <Button size="lg" 
              className="px-8 cursor-pointer py-4 text-lg bg-pink-500/20 hover:bg-pink-300 ">
              Start Planning Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

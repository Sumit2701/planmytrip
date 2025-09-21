"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MapPin, Calendar, Globe, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Travel Planning
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            TriplanIQ
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your travel dreams into detailed itineraries. Just describe your ideal trip, 
            and our AI creates a personalized multi-destination journey for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/triplaniq">
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Plan My Trip
              </Button>
            </Link>
            <Link href="/template.pdf" target="_blank" rel="noopener noreferrer">
              <Button  variant="outline" size="lg" className="px-8 py-4 text-lg">
                View Sample Itinerary
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose TriplanIQ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">AI-Powered Planning</CardTitle>
                <CardDescription>
                  Advanced AI understands your preferences and creates personalized itineraries 
                  with destinations, hotels, and activities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Multi-Destination</CardTitle>
                <CardDescription>
                  Plan complex trips with multiple stops, optimized routes, and seamless 
                  transitions between destinations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Detailed Schedules</CardTitle>
                <CardDescription>
                  Get day-by-day schedules with timings, activities, dining recommendations, 
                  and estimated costs for your entire journey.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Ready to Plan Your Perfect Trip?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of travelers who trust TriplanIQ to create unforgettable journeys.
          </p>
          <Link href="/triplaniq">
            <Button size="lg" className="px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Planning Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

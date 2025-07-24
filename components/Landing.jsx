import React from "react";
import HeroSection from "./Landing/HeroSection";
import ImageTextSection from "./Landing/ImageTextSection";
import HowItWorksSection from "./Landing/HowItWorksSection";
import FeaturesSection from "./Landing/FeaturesSection";
import PricingSection from "./Landing/PricingSection";
import TestimonialsSection from "./Landing/TestimonialsSection";
import CallToActionSection from "./Landing/CallToActionSection";

const Landing = () => {
  return (
    <div>
      
      <HeroSection />
      <ImageTextSection
        imgSrc="/images/suitcase.jpg"
        imgAlt="Traveler's bag for AI itinerary planning"
        title="AI Travel Itinerary Generator"
        subtitle="Personalized, Dynamic Planning"
        body={
          "Enter your destination, dates, mood, interests, and budget. Instantly get a dynamic, day-by-day plan with morning, afternoon, and evening slots—tailored just for you."
        }
        imgOnLeft={false}
      />
      <ImageTextSection
        imgSrc="/images/brunnete_sitting.jpg"
        imgAlt="Compass for real-time budget tracking"
        title="Real-Time Budget Calculator"
        subtitle="Stay On Track, Effortlessly"
        body={
          "See live cost data for food, stay, and transport at your destination. Track your budget usage per day and make smarter travel decisions on the go."
        }
        imgOnLeft={true}
      />
      <ImageTextSection
        imgSrc="/images/happy_woman.jpg"
        imgAlt="Happy traveler for mood-based trip refresh"
        title="Mood-Based Re-Generation"
        subtitle="Travel Plans That Adapt to You"
        body={
          "Plans change, and so do you. Instantly refresh your trip based on your current mood—adventure, chill, romantic, or cultural. Your journey, your way."
        }
        imgOnLeft={false}
      />
      <CallToActionSection />
    </div>
  );
};

export default Landing;

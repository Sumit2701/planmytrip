"use client"
import { useState, useEffect } from 'react';
import { FaGlobe, FaXTwitter } from 'react-icons/fa6';
import { SiFiverr } from 'react-icons/si';

const BentoSlider = () => {
    const bentoCards = [
        {
          quote: "Tourmagic turned my vague travel dreams into a detailed, multi-destination itinerary. From flights to hotels, it covered everything seamlessly!",
          name: "Alex Rivera",
          title: "Adventure Traveler",
          image: "/plane.svg",  
          links: [
            { url: "https://example.com/alex", icon: FaGlobe, label: "Travel Blog" }
          ]
        },
        {
          quote: "As a busy professional, planning trips was always a hassle. Tourmagic's AI-generated itineraries saved me hours and made my vacation stress-free.",
          name: "Jordan Lee",
          title: "Business Traveler",
          image: "/hot_air_balloon.svg",
          links: [
            { url: "https://example.com/jordan", icon: FaGlobe, label: "Portfolio" }
          ]
        },
        {
          quote: "The structured schedules and cost breakdowns helped me plan the perfect family trip. Highly recommend for anyone dreaming of exploration!",
          name: "Taylor Kim",
          title: "Family Vacation Planner",
          image: "/globe.svg",
          links: [
            { url: "https://www.fiverr.com/taylor_travel", icon: SiFiverr, label: "Fiverr" }
          ]
        },
        {
          quote: "Tourmagic's insights into destinations and activities made my solo trip unforgettable. It's like having a personal travel guide!",
          name: "Morgan Patel",
          title: "Solo Explorer",
          image: "/cloud.svg",
          links: [
            { url: "https://x.com/morgan_travels", icon: FaXTwitter, label: "Twitter" }
          ]
        }
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % bentoCards.length);
        }, 6000);
    
        return () => clearInterval(interval);
      }, [bentoCards.length]);
    
  return (
    <div className="relative col-span-1 lg:col-span-3 bg-blue-200  main-card min-h-[200px] md:min-h-[300px] xl:min-h-[250px] rounded-2xl p-6 md:p-10 flex flex-col justify-between overflow-hidden">
      <div className="max-w-sm md:max-w-lg flex flex-col justify-between h-full">
        <h2 className="text-left text-balance text-base md:text-lg lg:text-xl tracking-[-0.015em] text-neutral-900 mb-2 transition-opacity duration-500 ease-in-out">
          "{bentoCards[currentIndex].quote}"
        </h2>
        <div>
          <div className="flex items-center gap-5 mb-1">

            <p className="text-left text-base md:text-lg text-neutral-600 font-semibold transition-opacity duration-500 ease-in-out">
              {bentoCards[currentIndex].name}
            </p>
            {bentoCards[currentIndex].links.map((link, idx) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-neutral-500 hover:text-red-500 transition-colors ${
                    IconComponent === SiFiverr ? 'p-1.5 border border-1 border-neutral-400 rounded-full hover:border-red-500' : ''
                  }`}
                  aria-label={link.label}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}
          </div>
          <p className="text-left text-sm md:text-base text-neutral-500 transition-opacity duration-500 ease-in-out">
            {bentoCards[currentIndex].title}
          </p>
        </div>
      </div>
      {/* <img
        src={bentoCards[currentIndex].image}
        width={500}
        height={500}
        alt="inspirational image"
        className="absolute opacity-30 right-10 object-contain rounded-2xl w-40 md:w-48 transition-opacity duration-500 ease-in-out"
      /> */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center justify-center gap-2">
        {bentoCards.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-red' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const Bento = () => (
  <div className="">
    <div className="max-w-4xl mx-auto w-full px-2 md:px-6">
      <div className="flex items-center mb-8 md:mb-12 ">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-unbounded text-neutral-700 md:text-neutral-700 bg-clip-text">
          Why Tourmagic?
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
        <div className="relative col-span-1 min-h-[180px] md:min-h-[150px] bg-pink-500/20  rounded-2xl  main-card p-6 md:p-10 flex flex-col justify-center">
          <div className="max-w-xs md:max-w-md">
            <h2 className="max-w-80 text-left text-balance text-lg md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-neutral-900 mb-2">
              "Overwhelmed by trip planning? Struggling with itineraries, budgets, and destinations?"
            </h2>

          </div>

        </div>
        <div className="relative col-span-1 lg:col-span-2 bg-purple-200 main-card min-h-[180px] md:min-h-[150px] rounded-2xl p-6 md:p-10 flex flex-col justify-between overflow-hidden">
          <h2 className="text-left text-balance text-lg md:text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-neutral-700 mb-2">
            We understand!
          </h2> 
          <p className="mt-2 text-left text-base md:text-lg text-neutral-600">
            That’s why Tourmagic uses AI to generate personalized, structured itineraries from your free-form travel ideas. Cover multiple destinations, detailed schedules, cost estimates, and more. Save time, reduce stress, and focus on creating memories.
          </p>

        </div>
        <BentoSlider />
      </div>
    </div>
  </div>
);



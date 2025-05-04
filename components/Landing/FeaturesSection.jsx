import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import landingData from "../../data/landing.json"; // Import the JSON data
import useEmblaCarousel from "embla-carousel-react"; // Import Embla hook

// Helper component for Embla Dots
const DotButton = ({ selected, onClick }) => (
  <button
    className={`h-3 w-3 rounded-full mx-1 focus:outline-none transition-colors duration-200 ${
      selected ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
    }`}
    type="button"
    onClick={onClick}
  />
);

const FeaturesSection = () => {
  const { items: features } = landingData.features; // Destructure and rename items to features
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }); // Initialize Embla
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  // Card component to avoid repetition
  const FeatureCard = ({ feature, isCarouselSlide = false }) => (
    <motion.div
      key={feature.title} // Use feature title for key if index not available
      initial={!isCarouselSlide ? { opacity: 0, y: 25 } : {}}
      whileInView={!isCarouselSlide ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-white rounded-xl my-4 shadow-lg overflow-hidden border border-gray-100 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        isCarouselSlide
          ? "embla__slide min-w-0 flex-shrink-0 flex-grow-0 basis-4/5 sm:basis-3/5 md:basis-1/2 mr-4 last:mr-0"
          : "" // Carousel slide styles
      }`}
    >
      <div className="w-full h-64 mb-6 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
        <Image
          src={feature.imgSrc}
          alt={`${feature.title} illustration`}
          layout="fill"
          objectFit="contain"
          style={{ backgroundColor: "transparent" }}
          className="p-4 mix-blend-multiply transition-opacity duration-300" // Slightly more padding
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
        <p className="text-base text-gray-700 leading-relaxed flex-grow">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );

  return (
    <motion.section
      id="features"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-white to-blue-50 py-20 overflow-hidden" // Added overflow-hidden
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-lg text-base mb-4">
            Unique Features
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-6">
            Beyond Basic Planning
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            TripWhiz AI offers unique tools to make your travel truly seamless
            and personalized.
          </p>
        </div>

        {/* Grid for Desktop (lg and up) */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Carousel for Mobile/Tablet (below lg) */}
        <div className="lg:hidden">
          <div className="embla overflow-hidden -ml-4 pl-4" ref={emblaRef}>
            {" "}
            {/* Added margin/padding for peek effect */}
            <div className="embla__container flex">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  isCarouselSlide={true}
                />
              ))}
            </div>
          </div>
          {/* Carousel Dots */}
          <div className="flex justify-center mt-6">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;

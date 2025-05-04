import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import landingData from "../../data/landing.json"; // Import the JSON data
import useEmblaCarousel from 'embla-carousel-react'; // Import Embla hook

// Helper component for Embla Dots (copied from FeaturesSection)
const DotButton = ({ selected, onClick }) => (
  <button
    className={`h-3 w-3 rounded-full mx-1 focus:outline-none transition-colors duration-200 ${
      selected ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
    }`}
    type="button"
    onClick={onClick}
  />
);

const HowItWorksSection = () => {
  const { steps } = landingData.howItWorks; // Destructure steps from imported data
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  // Card component
  const StepCard = ({ step, isCarouselSlide = false }) => (
    <motion.div
      key={step.number}
      initial={!isCarouselSlide ? { opacity: 0, y: 25 } : {}}
      whileInView={!isCarouselSlide ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transition-transform duration-300 md:hover:scale-105 ${
        isCarouselSlide ? 'embla__slide min-w-0 flex-shrink-0 flex-grow-0 basis-4/5 sm:basis-3/5 md:basis-1/2 mr-4 last:mr-0' : '' // Carousel slide styles
      }`}
    >
      {/* Placeholder for Image */}
      <div
        className={`w-full h-40 sm:h-48 ${step.imgPlaceholderColor} rounded-lg mb-6 flex items-center justify-center text-gray-400`}
      >
        <span className="text-base sm:text-lg font-medium">Image Placeholder</span>
      </div>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg sm:text-xl mb-4">
        {step.number}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">
        {step.title}
      </h3>
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-lg text-sm sm:text-base mb-4">
          How it works
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 mb-4 md:mb-6">
          3 Easy steps to plan your perfect trip
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12 md:mb-16">
          Refine, Adjust, Perfect: Craft your ideal travel experience with
          intuitive settings. Achieve clarity, flexibility, and
          excitement—tailored precisely to your needs.
        </p>

        {/* Grid for Desktop (lg and up) */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} />
          ))}
        </div>

        {/* Carousel for Mobile/Tablet (below lg) */}
        <div className="lg:hidden">
          <div className="embla overflow-hidden -ml-4 pl-4" ref={emblaRef}> {/* Added margin/padding for peek effect */} 
            <div className="embla__container flex"> 
              {steps.map((step, index) => (
                <StepCard key={index} step={step} isCarouselSlide={true} />
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

export default HowItWorksSection;

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import landingData from "../../data/landing.json"; // Import the JSON data
import Link from "next/link"; // Import Link
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

const PricingSection = () => {
  const { plans } = landingData.pricing; // Destructure plans from imported data
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  }); // Use align: 'start'
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

  // Card component
  const PlanCard = ({ plan, isCarouselSlide = false }) => (
    <motion.div
      key={plan.name}
      // No initial animation for carousel slides
      initial={!isCarouselSlide ? { opacity: 0, y: 25 } : {}}
      whileInView={!isCarouselSlide ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-white rounded-xl shadow-lg p-6 md:p-8 my-4 border flex flex-col transform transition-transform duration-300 ${
        plan.primary
          ? "border-primary ring-2 ring-primary ring-offset-2 md:scale-105"
          : "border-gray-200"
      } ${
        isCarouselSlide
          ? "embla__slide min-w-0 flex-shrink-0 flex-grow-0 basis-4/5 sm:basis-[70%] mr-4 last:mr-0"
          : "" // Carousel slide styles, adjusted basis
      }`}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-navy-800 mb-2">
        {plan.name}
      </h3>
      <p className="text-sm sm:text-base text-gray-500 mb-4">
        {plan.description}
      </p>
      <div className="mb-6">
        <span className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          {plan.price}
        </span>
        <span className="text-base sm:text-lg text-gray-500">
          {plan.frequency}
        </span>
      </div>
      <ul className="space-y-3 mb-8 text-sm sm:text-base text-gray-700 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {plan.name === "Enterprise" ? (
        <button
          className={`w-full py-3 px-6 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 ${
            plan.primary
              ? "bg-primary hover:bg-blue-700 text-white shadow-lg"
              : "bg-white border border-primary text-primary hover:bg-primary hover:text-white shadow-sm"
          }`}
        >
          {plan.cta}
        </button>
      ) : (
        <Link href="/triplaniq" passHref>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 px-6 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 ${
              plan.primary
                ? "bg-primary hover:bg-blue-700 text-white shadow-lg"
                : "bg-white border border-primary text-primary hover:bg-primary hover:text-white shadow-sm"
            }`}
          >
            {plan.cta}
          </motion.button>
        </Link>
      )}
    </motion.div>
  );

  return (
    <motion.section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-lg text-sm sm:text-base mb-4">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 mb-4 md:mb-6">
            Choose Your Plan
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Simple, transparent pricing to fit your travel style. Start free or
            unlock powerful pro features.
          </p>
        </div>

        {/* Grid for Desktop (lg and up) */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>

        {/* Carousel for Mobile/Tablet (below lg) */}
        <div className="lg:hidden">
          <div className="embla overflow-hidden -ml-4 pl-4" ref={emblaRef}>
            <div className="embla__container flex">
              {plans.map((plan, index) => (
                <PlanCard key={index} plan={plan} isCarouselSlide={true} />
              ))}
            </div>
          </div>
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

export default PricingSection;

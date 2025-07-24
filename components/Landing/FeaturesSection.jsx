import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import landingData from "../../data/landing.json";
import useEmblaCarousel from "embla-carousel-react";

const DotButton = ({ selected, onClick }) => (
  <button
    className={`h-3 w-3 rounded-full mx-1 focus:outline-none transition-all duration-300 ${
      selected ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
    }`}
    type="button"
    onClick={onClick}
  />
);

const FeaturesSection = () => {
  const { items: features } = landingData.features;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
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

  const FeatureCard = ({ feature, index, isCarouselSlide = false }) => (
    <motion.div
      initial={!isCarouselSlide ? { opacity: 0, y: 50 } : {}}
      whileInView={!isCarouselSlide ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className={`group relative ${
        isCarouselSlide
          ? "embla__slide min-w-0 flex-shrink-0 flex-grow-0 basis-4/5 sm:basis-3/5 md:basis-1/2 mr-6 last:mr-0"
          : ""
      }`}
    >
      <div className="relative h-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform group-hover:scale-105 group-hover:shadow-2xl transition-all duration-500">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Icon/Image Section */}
          <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <Image
                src={feature.imgSrc}
                alt={`${feature.title} illustration`}
                layout="fill"
                objectFit="contain"
                className="p-8 mix-blend-multiply transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">★</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {feature.description}
            </p>
          </div>

          {/* Call to Action */}
          <motion.button
            whileHover={{ x: 5 }}
            className="self-start flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300"
          >
            Learn More
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="features"
      className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <defs>
            <pattern
              id="features-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="10"
                cy="10"
                r="1"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#features-pattern)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-blue-700 font-semibold">Unique Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight"
          >
            Beyond Basic
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Planning
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            TripWhiz AI offers unique tools to make your travel truly seamless and
            personalized.
          </motion.p>
        </div>

        {/* Grid for Desktop */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Carousel for Mobile/Tablet */}
        <div className="lg:hidden">
          <div className="embla overflow-hidden -ml-4 pl-4" ref={emblaRef}>
            <div className="embla__container flex">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  isCarouselSlide={true}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
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
    </section>
  );
};

export default FeaturesSection;

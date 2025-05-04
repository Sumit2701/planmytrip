import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import landingData from "../../data/landing.json";
import useEmblaCarousel from "embla-carousel-react";

const DotButton = ({ selected, onClick }) => (
  <button
    className={`h-3 w-3 rounded-full mx-1 focus:outline-none transition-colors duration-200 ${
      selected ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
    }`}
    type="button"
    onClick={onClick}
  />
);

const TestimonialsSection = () => {
  const { items: testimonials } = landingData.testimonials;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
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

  const TestimonialCard = ({ testimonial, isCarouselSlide = false }) => (
    <motion.div
      key={testimonial.name}
      initial={!isCarouselSlide ? { opacity: 0, y: 25 } : {}}
      whileInView={!isCarouselSlide ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full ${
        isCarouselSlide
          ? "embla__slide min-w-0 flex-shrink-0 flex-grow-0 basis-4/5 sm:basis-[70%] mr-4 last:mr-0"
          : ""
      }`}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 relative overflow-hidden border-2 border-white shadow-md flex-shrink-0">
        <Image
          src={testimonial.imgSrc}
          alt={testimonial.name}
          layout="fill"
          objectFit="cover"
          style={{ backgroundColor: "lightgray" }}
          className="transition-opacity duration-300"
          sizes="80px"
        />
      </div>
      <p className="text-base sm:text-lg italic text-gray-700 mb-4 flex-grow">
        {testimonial.quote}
      </p>
      <div className="font-semibold text-navy-800 text-sm sm:text-base flex-shrink-0">
        {testimonial.name}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
        {testimonial.title}
      </div>
    </motion.div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="bg-white py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-lg text-base mb-4">
            Social Proof
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-6">
            What Our Travelers Say
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Hear from fellow adventurers who planned smarter and traveled freer
            with TripWhiz AI.
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        <div className="lg:hidden">
          <div className="embla overflow-hidden -ml-4 pl-4" ref={emblaRef}>
            <div className="embla__container flex h-full pb-1">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  isCarouselSlide={true}
                />
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

export default TestimonialsSection;

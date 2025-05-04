import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import landingData from "../../data/landing.json"; // Import the JSON data

const TestimonialsSection = () => {
  const { items: testimonials } = landingData.testimonials; // Destructure and rename items to testimonials

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="bg-white py-20"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full mb-4 relative overflow-hidden border-2 border-white shadow-md">
                <Image
                  src={testimonial.imgSrc}
                  alt={testimonial.name}
                  layout="fill"
                  objectFit="cover"
                  style={{ backgroundColor: "lightgray" }}
                  className="transition-opacity duration-300"
                />
              </div>
              <p className="text-lg italic text-gray-700 mb-4 flex-grow">
                {testimonial.quote}
              </p>
              <div className="font-semibold text-navy-800">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-500">{testimonial.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import landingData from "../../data/landing.json"; // Import the JSON data

const FeaturesSection = () => {
  const { items: features } = landingData.features; // Destructure and rename items to features

  return (
    <motion.section
      id="features"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-white to-blue-50 py-20"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="w-full h-64 mb-6 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                <Image
                  src={feature.imgSrc}
                  alt={`${feature.title} illustration`}
                  layout="fill"
                  objectFit="contain"
                  style={{ backgroundColor: "transparent" }}
                  className="p-2 mix-blend-multiply transition-opacity duration-300"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;

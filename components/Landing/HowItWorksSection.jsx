import React from "react";
import { motion } from "framer-motion";
import landingData from "../../data/landing.json"; // Import the JSON data

const HowItWorksSection = () => {
  const { steps } = landingData.howItWorks; // Destructure steps from imported data

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-blue-50 to-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-lg text-base mb-4">
          How it works
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-6">
          3 Easy steps to plan your perfect trip
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-16">
          Refine, Adjust, Perfect: Craft your ideal travel experience with
          intuitive settings. Achieve clarity, flexibility, and
          excitement—tailored precisely to your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
            >
              {/* Placeholder for Image */}
              <div
                className={`w-full h-48 ${step.imgPlaceholderColor} rounded-lg mb-6 flex items-center justify-center text-gray-400`}
              >
                <span className="text-lg font-medium">Image Placeholder</span>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-xl mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;

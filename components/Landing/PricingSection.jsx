import React from "react";
import { motion } from "framer-motion";
import landingData from "../../data/landing.json"; // Import the JSON data
import Link from "next/link"; // Import Link

const PricingSection = () => {
  const { plans } = landingData.pricing; // Destructure plans from imported data

  return (
    <motion.section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-lg text-base mb-4">
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-6">
            Choose Your Plan
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Simple, transparent pricing to fit your travel style. Start free or
            unlock powerful pro features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-white rounded-xl shadow-lg p-8 border flex flex-col ${
                plan.primary
                  ? "border-primary ring-2 ring-primary ring-offset-2 scale-105"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-bold text-navy-800 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-500 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-navy-900">
                  {plan.price}
                </span>
                <span className="text-lg text-gray-500">{plan.frequency}</span>
              </div>
              <ul className="space-y-3 mb-8 text-gray-700 flex-grow">
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
                  className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-200 ${
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
                    className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-200 ${
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
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PricingSection;

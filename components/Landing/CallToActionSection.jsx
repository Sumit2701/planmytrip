import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CallToActionSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-r from-primary to-blue-700 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 md:mb-6"
        >
          Ready to Plan Your Next Adventure?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 md:mb-10"
        >
          Stop stressing, start exploring. Get your personalized, AI-powered
          itinerary in minutes.
        </motion.p>
        <Link href="/triplaniq" passHref>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-gray-100 text-primary px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg transition-colors duration-200 transform"
          >
            Get Started For Free
          </motion.button>
        </Link>
      </div>
    </motion.section>
  );
};

export default CallToActionSection;

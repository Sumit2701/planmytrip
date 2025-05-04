import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function ImageTextSection({
  imgSrc,
  imgAlt,
  title,
  subtitle,
  body,
  imgOnLeft = false,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 py-12 md:py-16"
    >
      <div
        className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
          imgOnLeft ? "md:flex-row-reverse" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: imgOnLeft ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex justify-center w-full"
        >
          <div className="w-full max-w-md aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={imgSrc}
              alt={imgAlt}
              layout="fill"
              objectFit="cover"
              style={{ backgroundColor: "lightgray" }}
              className="transition-opacity duration-300"
              sizes="(max-width: 768px) 90vw, 40vw"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: imgOnLeft ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 text-center md:text-left mt-6 md:mt-0"
        >
          {subtitle && (
            <div className="text-base sm:text-lg font-semibold text-blue-400 mb-2">
              {subtitle}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">
            {title}
          </h2>
          <div className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            {body}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ImageTextSection;

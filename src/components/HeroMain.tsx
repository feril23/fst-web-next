"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 1.05,
    x: 50,
  },
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      opacity: { duration: 1, ease: "easeInOut" },
      scale: { duration: 1.2, ease: "easeInOut" },
      x: { duration: 1, ease: "easeInOut" },
    },
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 1.05,
    x: -50,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const textVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      delay: 0.5,
    },
  },
};

const HeroMain = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative h-[580px] md:h-[650px] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <AnimatePresence mode="wait">
        {data.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

                <motion.img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL + slide.Image.url}`}
                  alt={slide.Title}
                  loading={index === 0 ? "eager" : "lazy"}
                  width="1366"
                  height="500"
                  className="w-full h-full object-cover object-top"
                  animate={{ scale: [1, 1.2] }}
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                <div className="absolute inset-0 z-20 flex items-center justify-center text-white text-center">
                  <div className="container mx-auto px-4">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.4 },
                        },
                      }}
                    >
                      <motion.h1
                        className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl tracking-wide"
                        variants={textVariants}
                      >
                        {slide.Title}
                      </motion.h1>
                      <motion.p className="text-2xl md:text-3xl opacity-90" variants={textVariants}>
                        {slide.Subtitle}
                      </motion.p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-4">
        {data.map((_, index) => (
          <button
            key={index}
            className={`h-3 transition-all duration-300 ${
              index === currentSlide ? "w-14 bg-white" : "w-8 bg-gray-500 hover:bg-gray-400"
            } rounded-full`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HeroMain;


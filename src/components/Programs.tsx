"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Atom, Leaf, Building2, FlaskRound, Binary } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 30,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const Programs = ({ data }) => {
  const programs = [
    { Icon: Monitor, title: "Teknologi Informasi", accreditation: data?.TI.Grade },
    { Icon: Atom, title: "Teknik Fisika", accreditation: data?.TF.Grade },
    { Icon: Leaf, title: "Teknik Lingkungan", accreditation: data?.TL.Grade },
    { Icon: Building2, title: "Arsitektur", accreditation: data?.ARS.Grade },
    { Icon: FlaskRound, title: "Kimia", accreditation: data?.KIM.Grade },
    { Icon: Binary, title: "Biologi", accreditation: data?.BIO.Grade },
  ];

  return (
    <motion.section
      className="py-16 bg-gradient-to-b from-teal-600 to-teal-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 className="text-4xl font-extrabold mb-4 text-white tracking-wide" variants={itemVariants}>
          PROGRAM STUDI
        </motion.h2>
        <motion.p className="mb-12 text-white" variants={itemVariants}>
          Pilih Program studi yang anda minati untuk menentukan masa depan anda
        </motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: {
                  duration: 0.3,
                  ease: [0.165, 0.84, 0.44, 1],
                },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-5 ">
                <div className="w-16 h-16 bg-teal-700 rounded-2xl flex items-center justify-center shadow-sm">
                  <program.Icon className="w-12 h-12 text-yellow-100" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{program.title}</h3>
                  <p className="text-gray-700 text-sm md:text-lg font-medium">Akreditasi: {program.accreditation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Programs;


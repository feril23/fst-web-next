"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import { useFaculty } from "../../contexts/FacultyContext";

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
};

const StrukturOrganisasi = () => {
  const faculty = useFaculty();

  return (
    <motion.main
      className="flex-grow bg-gradient-to-r from-teal-600 to-teal-700"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Breadcrumb />

      <div className="container px-4 sm:px-6 pb-16">
        <motion.h1 className="text-3xl sm:text-4xl font-bold text-white mb-8" variants={itemVariants}>
          Struktur Organisasi
          <span className="block text-xl sm:text-2xl font-normal mt-2">Fakultas Sains dan Teknologi</span>
        </motion.h1>

        {/* Organizational Chart */}
        <motion.div
          className="relative"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${faculty?.Structure.url}`}
            alt="Struktur Organisasi"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Legend or Additional Information */}
        <motion.div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
          <motion.div
            className="bg-teal-700/30 border border-teal-500/30 rounded-xl p-6"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              y: -5,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-lg font-semibold text-white mb-2">Dekan</h3>
            <p className="text-teal-100">
              Pimpinan tertinggi fakultas yang bertanggung jawab atas pengelolaan dan pengembangan fakultas
            </p>
          </motion.div>

          <div className="bg-teal-700/30 border border-teal-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Wakil Dekan</h3>
            <p className="text-teal-100">
              Membantu dekan dalam menjalankan tugas-tugas kepemimpinan di bidang akademik, administrasi, dan
              kemahasiswaan
            </p>
          </div>

          <div className="bg-teal-700/30 border border-teal-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Ketua Program Studi</h3>
            <p className="text-teal-100">Bertanggung jawab atas pengelolaan dan pengembangan program studi</p>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default StrukturOrganisasi;


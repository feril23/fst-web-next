"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { RefreshCw } from "lucide-react";
import useFetchDataFaculty from "../../hooks/useFetchDataFaculty";
import { useFaculty } from "../../contexts/FacultyContext";

// Dynamic Import untuk mengoptimalkan performance
const Breadcrumb = dynamic(() => import("../../components/Breadcrumb"));
const PageHeader = dynamic(() => import("../../components/PageHeader"));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
};

const Dekanat = () => {
  const faculty = useFaculty();

  const wakilDekan = [
    {
      nama: faculty?.Dean_Structure.Vice_Dean_1.lecture.Name,
      jabatan: "I",
      img: faculty?.Dean_Structure.Vice_Dean_1.lecture.Foto.url,
    },
    {
      nama: faculty?.Dean_Structure.Vice_Dean_2.lecture.Name,
      jabatan: "II",
      img: faculty?.Dean_Structure.Vice_Dean_2.lecture.Foto.url,
    },
    {
      nama: faculty?.Dean_Structure.Vice_Dean_3.lecture.Name,
      jabatan: "III",
      img: faculty?.Dean_Structure.Vice_Dean_3.lecture.Foto.url,
    },
  ];

  return (
    <motion.main
      className="flex-grow bg-gradient-to-r from-teal-600 to-teal-700"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Breadcrumb />
      <div className="container px-4 sm:px-6 pb-16">
        <PageHeader
          title="Pimpinan Sains dan Teknologi"
          subtitle={`Masa Jabatan ${faculty?.Dean_Structure.Periode}`}
          showSearch={false}
        />
        <div className="relative">
          <div className="absolute left-1/2 top-36 bottom-[130px] w-0.5 bg-gradient-to-b from-yellow-400 to-teal-400 hidden lg:block" />
          <div className="absolute left-1/4 right-1/4 bottom-32 h-0.5 bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 hidden lg:block" />

          {/* Dekan */}
          <motion.div
            className="flex flex-col items-center mb-12 sm:mb-24"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <div className="relative w-28 h-28 lg:w-28 lg:h-28">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${faculty?.Dean_Structure.Dean.lecture.Foto.url}`}
                className="rounded-full flex items-center justify-center relative z-10"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                alt={faculty?.Dean_Structure.Dean?.lecture.Name || "Dekan"}
              />
            </div>
            <div className="mt-4 lg:mt-6 bg-gradient-to-r from-teal-700/30 to-teal-600/30 backdrop-blur-sm border border-teal-500/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 w-full lg:w-80">
              <h2 className="text-lg lg:text-xl font-semibold text-white mb-2">
                {faculty?.Dean_Structure.Dean?.lecture.Name}
              </h2>
              <p className="text-yellow-400 font-medium">{faculty?.Dean_Structure.Dean?.Section}</p>
            </div>
          </motion.div>

          {/* Wakil Dekan */}
          <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative" variants={containerVariants}>
            {wakilDekan.map((wakil, index) => (
              <motion.div
                key={wakil.nama}
                className="flex flex-col items-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative w-28 h-28 lg:w-28 lg:h-28">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${wakil.img}`}
                    className="rounded-full flex items-center justify-center relative z-10"
                    layout="fill"
                    objectPosition="top"
                    objectFit="cover"
                    alt={wakil.nama}
                  />
                </div>
                <div className="mt-4 lg:mt-6 bg-gradient-to-r from-teal-700/30 to-teal-600/30 backdrop-blur-sm border border-teal-500/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 w-full lg:w-72">
                  <h2 className="text-base lg:text-lg font-semibold text-white mb-2">{wakil.nama}</h2>
                  <p className="text-yellow-400 font-medium mb-1">Wakil Dekan {wakil.jabatan}</p>
                  <p className="text-xs lg:text-sm text-teal-300">
                    {["Bidang Akademik", "Bidang Administrasi Umum", "Bidang Kemahasiswaan"][index]}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default Dekanat;


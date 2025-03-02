"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import PageHeader from "../../components/PageHeader";
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

const Sejarah = () => {
  const faculty = useFaculty();

  const infoProdi = [
    {
      nama: "Teknologi Informasi",
      master: faculty?.Lectures.TI.Master,
      doctor: faculty?.Lectures.TI.Doctor,
      grade: faculty?.Lectures.TI.Grade,
    },
    {
      nama: "Teknik Fisika",
      master: faculty?.Lectures.TF.Master,
      doctor: faculty?.Lectures.TF.Doctor,
      grade: faculty?.Lectures.TF.Grade,
    },
    {
      nama: "Teknik Lingkungan",
      master: faculty?.Lectures.TL.Master,
      doctor: faculty?.Lectures.TL.Doctor,
      grade: faculty?.Lectures.TL.Grade,
    },
    {
      nama: "Arsitektur",
      master: faculty?.Lectures.ARS.Master,
      doctor: faculty?.Lectures.ARS.Doctor,
      grade: faculty?.Lectures.ARS.Grade,
    },
    {
      nama: "Kimia",
      master: faculty?.Lectures.KIM.Master,
      doctor: faculty?.Lectures.KIM.Doctor,
      grade: faculty?.Lectures.KIM.Grade,
    },
    {
      nama: "Biologi",
      master: faculty?.Lectures.BIO.Master,
      doctor: faculty?.Lectures.BIO.Doctor,
      grade: faculty?.Lectures.BIO.Grade,
    },
  ];

  return (
    <motion.main
      className="flex-grow bg-gradient-to-r from-teal-600 to-teal-700 w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Breadcrumb />

      <div className="container px-6 pb-10">
        <PageHeader title="Sejarah" showSearch={false} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left side image - spans full height */}
          <motion.div
            className="lg:col-span-6"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <div className="bg-white/5 rounded-[2.5rem] overflow-hidden h-full min-h-[500px]" />
          </motion.div>

          {/* Right side content - 8 columns */}
          <motion.div className="lg:col-span-6" variants={itemVariants}>
            {/* History text */}
            <div className="text-white mb-12">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{faculty?.History.Text.split("\n")[0]}</ReactMarkdown>
            </div>

            {/* Program Study Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Daftar Program Studi</h2>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
                {infoProdi.map((prodi, index) => {
                  return (
                    <motion.div
                      key={index}
                      className="bg-teal-700/30 border border-teal-500/30 rounded-[1.5rem] p-6"
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        y: -5,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-4">{prodi.nama}</h3>
                      <div className="text-white/90">
                        <p className="mb-2">{prodi.grade}</p>
                        <p className="mb-2">{prodi.doctor + prodi.master} Dosen</p>
                        <p>
                          {prodi.doctor} doktor, {prodi.master} magister
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default Sejarah;


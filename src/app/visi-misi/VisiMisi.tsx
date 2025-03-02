"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import { Target } from "lucide-react";
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

const VisiMisi = () => {
  const faculty = useFaculty();

  return (
    <motion.main
      className="flex-grow bg-gradient-to-r from-teal-600 to-teal-700"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Breadcrumb />

      <div className="container px-4 sm:px-6 pb-16 mt-8">
        <PageHeader title="Visi dan Misi" showSearch={false} />
        {/* Vision Section */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            className="bg-teal-700/30 border border-teal-500/30 rounded-[2rem] p-6 sm:p-8 md:p-12"
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed">{faculty?.Vision}</p>
          </motion.div>
        </div>

        {/* Mission Section */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">Misi Kami</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            {/* Mission Icon */}
            <div className="col-span-1 lg:col-span-5 order-1 lg:order-1">
              <div className="bg-white/5 rounded-[2rem] overflow-hidden h-full min-h-[300px] lg:min-h-[500px] flex items-center justify-center p-8 sm:p-12">
                <Target className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 text-teal-300/20" />
              </div>
            </div>

            {/* Mission List */}
            <div className="col-span-1 lg:col-span-7 order-2 lg:order-2 space-y-4 sm:space-y-6">
              {faculty?.Mission.map((mission) => (
                <motion.div
                  key={mission.id}
                  className="bg-teal-700/30 border border-teal-500/30 rounded-[1.5rem] p-4 sm:p-6 hover:bg-teal-700/40 transition-colors"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{mission.Title}</h3>
                  <p className="text-sm sm:text-base text-white/80">{mission.Description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default VisiMisi;


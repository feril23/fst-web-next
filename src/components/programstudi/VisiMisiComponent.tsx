import React from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb, Flag } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.165, 0.84, 0.44, 1]
    }
  }
};

export const VisiMisiComponent = ({ data }) => {
  return data.Vision == null || data.Mission == null || data.Purpose == null ? (
    <p className="text-sm text-gray-600">
      Informasi Visi dan Misi belum tersedia.
    </p>
  ) : (
    <motion.div 
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Visi Section */}
      <motion.div 
        className="relative"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
      >
        <div className="hidden md:block absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-600 to-teal-400" />
        <div className="pl-0 md:pl-8">
          <div className="flex items-center mb-6">
            <div className="bg-teal-600 p-3 rounded-xl shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="ml-4 text-2xl font-bold text-gray-900">Visi</h2>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-white border-l-4 border-teal-600 rounded-r-xl p-6 shadow-sm">
            <p className="text-xl text-gray-800 italic leading-relaxed">
              {data.Vision ?? "Visi Belum tersedia"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Misi Section */}
      <motion.div 
        className="relative"
        variants={itemVariants}
      >
        <div className="hidden md:block absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-300" />
        <div className="pl-0 md:pl-8">
          <div className="flex items-center mb-6">
            <div className="bg-yellow-400 p-3 rounded-xl shadow-lg">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="ml-4 text-2xl font-bold text-gray-900">Misi</h2>
          </div>
          <div className="grid gap-4">
            {data.Mission == null ? (
              <p className="text-sm text-gray-600">Data Misi belum tersedia.</p>
            ) : (
              data.Mission.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-yellow-100"
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.Title}
                  </h3>
                  <p className="text-gray-600">{item.Description}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* Tujuan Section */}
      <motion.div 
        className="relative"
        variants={itemVariants}
      >
        <div className="hidden md:block absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-600 to-indigo-400" />
        <div className="pl-0 md:pl-8">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-600 p-3 rounded-xl shadow-lg">
              <Flag className="w-8 h-8 text-white" />
            </div>
            <h2 className="ml-4 text-2xl font-bold text-gray-900">Tujuan</h2>
          </div>
          <div className="grid gap-4">
            {data.Purpose == null ? (
              <p className="text-sm text-gray-600">
                Data Tujuan belum tersedia.
              </p>
            ) : (
              data.Purpose.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100 hover:border-indigo-300"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                      <span className="text-indigo-600 font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.Title}
                      </h3>
                      <p className="text-gray-600">{item.Description}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VisiMisiComponent;
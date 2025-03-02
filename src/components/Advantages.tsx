"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Users, GraduationCap, Handshake, Award, Medal, User } from "lucide-react";

const useCounter = (end: number, duration: number = 2, isInView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 2000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return count;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1],
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 40,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
};

const Advantages = ({ data }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const advantages = [
    {
      Icon: Users,
      title: "Mahasiswa",
      value: data.Advantages.Student,
      description: `Sudah terdapat ${data.Advantages.Student} mahasiswa yang lulus dari fakultas ini`,
      suffix: "",
    },
    {
      Icon: GraduationCap,
      title: "Tingkat Kelulusan",
      value: data.Advantages.Graduation_Rate * 100,
      description: `Tingkat kelulusan pada Fakultas ini mencapai total ${data.Advantages.Graduation_Rate * 100}%`,
      suffix: "%",
    },
    {
      Icon: Handshake,
      title: "Kerja Sama",
      value: data.Advantages.Collaboration,
      description: `Fakultas Sains dan Teknologi UIN telah menjalin kerja sama dengan lebih dari ${data.Advantages.Collaboration} mitra, mencakup institusi pendidikan, industri, dan organisasi lainnya untuk mendukung pengembangan akademik dan penelitian.`,
      suffix: "+",
    },
    {
      Icon: Award,
      title: "Guru Besar",
      value: data.Advantages.Professor,
      description: `Fakultas Sains dan Teknologi memiliki lebih dari ${data.Advantages.Professor} guru besar yang berperan penting dalam pengembangan ilmu pengetahuan.`,
      suffix: "+",
    },
    {
      Icon: Medal,
      title: "Alumni",
      value: data.Advantages.Alumni,
      description: `Fakultas Sains dan Teknologi telah meluluskan lebih dari ${data.Advantages.Alumni} Mahasiswa`,
      suffix: "+",
    },
    {
      Icon: User,
      title: "Dosen",
      value: data.Advantages.Lecture,
      description: `Memiliki lebih dari ${data.Advantages.Lecture} dosen yang kompeten dan berpengalaman.`,
      suffix: "+",
    },
  ];

  return (
    <motion.section
      className="py-8 md:py-16 bg-gradient-to-b from-teal-800 to-teal-600 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.h2 className="text-4xl font-extrabold mb-4 text-white tracking-wide" variants={itemVariants}>
          KEUNGGULAN FAKULTAS SAINS DAN TEKNOLOGI
        </motion.h2>
        <motion.p className="mb-8 md:mb-12 text-sm md:text-base" variants={itemVariants}>
          Ini alasan mengapa anda harus memilih Fakultas Sains dan Teknologi
        </motion.p>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6" variants={containerVariants}>
          {/* Left side: 2-1 layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {/* First row: Mahasiswa and Tingkat Kelulusan */}
            <motion.div
              className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow text-teal-900"
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
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold">{advantages[0].title}</h3>
                <Users className="w-6 h-6 md:w-8 md:h-8 text-teal-600" />
              </div>
              <div
                className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 tabular-nums"
                style={{ fontFamily: "cursive" }}
              >
                {useCounter(advantages[0].value, 2, isInView)}
                {advantages[0].suffix}
              </div>
              <p className="text-xs md:text-sm text-teal-800">{advantages[0].description}</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow text-teal-900"
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
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold">{advantages[1].title}</h3>
                <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-teal-600" />
              </div>
              <div
                className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 tabular-nums"
                style={{ fontFamily: "cursive" }}
              >
                {useCounter(advantages[1].value, 2, isInView)}
                {advantages[1].suffix}
              </div>
              <p className="text-xs md:text-sm text-teal-800">{advantages[1].description}</p>
            </motion.div>

            {/* Second row: Kerja Sama spanning 2 columns */}
            <motion.div
              className="col-span-1 sm:col-span-2 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow text-teal-900 lg:flex lg:flex-col lg:justify-between"
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
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold">{advantages[2].title}</h3>
                <Handshake className="w-6 h-6 md:w-8 md:h-8 text-teal-600" />
              </div>
              <div
                className="text-4xl lg:text-[150px] font-bold mb-2 md:mb-4 lg:py-14 tabular-nums"
                style={{ fontFamily: "cursive" }}
              >
                {useCounter(advantages[2].value, 2, isInView)}
                {advantages[2].suffix}
              </div>
              <p className="text-xs lg:text-lg text-teal-800">{advantages[2].description}</p>
            </motion.div>
          </div>

          {/* Right side: 1-2 layout */}
          <div className="grid grid-rows-1 lg:grid-rows-3 gap-4 md:gap-6">
            {/* Guru Besar taking 2 rows */}
            <motion.div
              className="row-span-1 lg:row-span-2 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow text-teal-900 lg:flex lg:flex-col lg:justify-between"
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
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold">{advantages[3].title}</h3>
                <Award className="w-6 h-6 md:w-8 md:h-8 text-teal-600" />
              </div>
              <div
                className="text-4xl lg:text-[150px] font-bold mb-2 md:mb-4 lg:py-14 tabular-nums"
                style={{ fontFamily: "cursive" }}
              >
                {useCounter(advantages[3].value, 2, isInView)}
                {advantages[3].suffix}
              </div>
              <p className="text-xs lg:text-lg text-teal-800">{advantages[3].description}</p>
            </motion.div>

            {/* Alumni and Dosen in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow text-teal-900"
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
                <div className="flex justify-between items-start mb-2 md:mb-4">
                  <h3 className="text-base md:text-lg font-semibold">{advantages[4].title}</h3>
                  <Medal className="w-6 h-6 md:w-8 md:h-8 text-teal-600" />
                </div>
                <div
                  className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 tabular-nums"
                  style={{ fontFamily: "cursive" }}
                >
                  {useCounter(advantages[4].value, 2, isInView)}
                  {advantages[4].suffix}
                </div>
                <p className="text-xs md:text-sm text-teal-800">{advantages[4].description}</p>
              </motion.div>
              <motion.div
                className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow text-teal-900"
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
                <div className="flex justify-between items-start mb-2 md:mb-4">
                  <h3 className="text-base md:text-lg font-semibold">{advantages[5].title}</h3>
                  <User className="w-6 h-6 md:w-8 md:h-8 text-teal-600" />
                </div>
                <div
                  className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 tabular-nums"
                  style={{ fontFamily: "cursive" }}
                >
                  {useCounter(advantages[5].value, 2, isInView)}
                  {advantages[5].suffix}
                </div>
                <p className="text-xs md:text-sm text-teal-800">{advantages[5].description}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Advantages;


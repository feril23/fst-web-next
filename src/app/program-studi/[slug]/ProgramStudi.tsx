"use client";

import { lazy, Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Building2,
  GraduationCap,
  Award,
  Users2,
  Users,
  LayoutGrid,
  RefreshCw,
  FileText,
} from "lucide-react";
import FetchProgramData from "../../../hooks/useFetchDataProgram";
import dynamic from "next/dynamic";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
};

// Lazy load components
const components = {
  ProgramHero: dynamic(() => import("../../../components/ProgramHero")),
  VisiMisiComponent: dynamic(() => import("../../../components/programstudi/VisiMisiComponent")),
  Akreditasi: dynamic(() => import("../../../components/programstudi/Akreditasi")),
  Personil: dynamic(() => import("../../../components/programstudi/Personil")),
  TenagaPengajar: dynamic(() => import("../../../components/programstudi/TenagaPengajar")),
  Kurikulum: dynamic(() => import("../../../components/programstudi/Kurikulum")),
  LayananProdi: dynamic(() => import("../../../components/programstudi/LayananProdi")),
  ProspekAlumni: dynamic(() => import("../../../components/programstudi/ProspekAlumni")),
  Sejarah: dynamic(() => import("../../../components/programstudi/Sejarah")),
  Fasilitas: dynamic(() => import("../../../components/programstudi/Fasilitas")),
  Documents: dynamic(() => import("../../../components/programstudi/Documents")),
};

export default function ProgramStudi({ slug, data }) {
  const menuItems = useMemo(
    () => [
      { id: "sejarah", label: "Sejarah", icon: BookOpen },
      { id: "visi-dan-misi", label: "Visi dan Misi", icon: Award },
      { id: "personil", label: "Personil", icon: Users },
      { id: "akreditasi", label: "Akreditasi", icon: Award },
      { id: "tenaga-pengajar", label: "Tenaga Pengajar", icon: Users2 },
      { id: "kurikulum", label: "Kurikulum", icon: BookOpen },
      { id: "fasilitas-prodi", label: "Fasilitas Prodi", icon: Building2 },
      { id: "layanan-prodi", label: "Layanan Prodi", icon: GraduationCap },
      { id: "prospek-alumni", label: "Prospek Alumni", icon: Award },
      { id: "dokumen", label: "Dokumen", icon: FileText },
    ],
    []
  );

  const [activeSection, setActiveSection] = useState("sejarah");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setActiveSection(hash.slice(1)); // Remove # from hash
    }
  }, []);

  // Memoize scroll handler
  const scrollToContent = useCallback(() => {
    const contentElement = document.querySelector(".prose");
    if (contentElement) {
      contentElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // Handle section change
  const handleSectionChange = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      setIsMenuOpen(false);
      setTimeout(scrollToContent, 100);
    },
    [scrollToContent]
  );

  console.log(data);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest("[data-menu]")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  if (!data?.program) {
    return <NotFound message="Program tidak ditemukan" />;
  }

  // Render active component
  const renderComponent = () => {
    switch (activeSection) {
      case "visi-dan-misi":
        return <components.VisiMisiComponent data={data?.program} />;
      case "akreditasi":
        return <components.Akreditasi data={data?.program} />;
      case "personil":
        return <components.Personil data={data?.program} />;
      case "tenaga-pengajar":
        return <components.TenagaPengajar data={data?.dosen} />;
      case "kurikulum":
        return <components.Kurikulum data={data?.program} />;
      case "layanan-prodi":
        return <components.LayananProdi data={data?.program} />;
      case "prospek-alumni":
        return <components.ProspekAlumni data={data?.program} />;
      case "sejarah":
        return <components.Sejarah data={data?.program} />;
      case "dokumen":
        return <components.Documents data={data?.program} />;
      default:
        return <components.Fasilitas data={data?.program} />;
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <motion.main
        className="flex-grow relative prose"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <components.ProgramHero data={data?.program} />
        <div className="container px-6 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Fixed Mobile Menu Button */}
            <div data-menu className="fixed right-4 bottom-6 md:hidden z-40 transition-all duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="w-14 h-14 bg-teal-600 rounded-full shadow-lg hover:shadow-xl active:shadow-md flex items-center justify-center transition-all duration-200 hover:bg-teal-500 active:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 backdrop-blur-sm bg-teal-600/90"
                aria-label="Toggle menu"
              >
                <LayoutGrid className="w-6 h-6 text-white" />
              </button>

              {/* Mobile Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200/50 backdrop-blur-sm bg-white/95">
                  <div className="py-2 max-h-[60vh] overflow-y-auto">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSectionChange(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            activeSection === item.id
                              ? "bg-teal-50 text-teal-600"
                              : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                          }`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block md:col-span-3 md:sticky md:top-24">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <nav className="flex flex-col">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSectionChange(item.id)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                          activeSection === item.id
                            ? "bg-teal-50 text-teal-600 border-l-4 border-teal-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        type="button"
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-12 md:col-span-9">
              <motion.div
                className="bg-white rounded-xl p-8 shadow-sm"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    className="max-w-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Suspense fallback={<p className="text-gray-500 animate-pulse">Memuat bagian ini...</p>}>
                      {renderComponent()}
                    </Suspense>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>
    </Suspense>
  );
}

// Helper components
const LoadingSpinner = () => (
  <div className="animate-pulse space-y-6 container px-6 py-8">
    {/* Hero Section Skeleton */}
    <div className="h-64 bg-gray-300 rounded-xl"></div>

    {/* Menu & Content Skeleton */}
    <div className="grid grid-cols-12 gap-8">
      {/* Sidebar Skeleton */}
      <div className="hidden md:block md:col-span-3 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-300 rounded-lg"></div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="col-span-12 md:col-span-9 space-y-4">
        <div className="h-64 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  </div>
);

const NotFound = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-center">
    <div className="text-red-600 text-lg">{message}</div>

    <button
      onClick={() => window.location.reload()}
      className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
    >
      <RefreshCw className="w-4 h-4" />
      Reload Page
    </button>
  </div>
);


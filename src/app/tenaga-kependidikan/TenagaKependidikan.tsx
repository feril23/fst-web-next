"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import { ChevronLeft, ChevronRight, Eye, RefreshCw } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import useFetchTenagaKependidikan from "../../hooks/useFetchTenagaKependidikan";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 },
  },
};

const TenagaKependidikan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [mounted, setMounted] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const { data, loading, error } = useFetchTenagaKependidikan(currentPage, itemsPerPage, debouncedSearch);

  if (error) {
    const handleReload = () => {
      window.location.reload();
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-center">
        <div className="text-red-600 text-lg">{error}</div>

        <button
          onClick={handleReload}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <motion.main
      className="flex-grow bg-gradient-to-r from-teal-600 to-teal-700"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Breadcrumb />

      <div className="container px-4 sm:px-6 pb-16">
        <PageHeader title="Tenaga Kependidikan" searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="flex justify-end mt-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <span className="text-sm">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-[#0d9488] border border-white/20 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 
                 focus:ring-teal-300/50"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm">entries</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden mb-8"
          variants={containerVariants}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-teal-300/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">NIP</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Program</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-300/20">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-white">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                      </div>
                    </td>
                  </tr>
                ) : data?.data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-white">
                      No data found
                    </td>
                  </tr>
                ) : (
                  data?.data.map((staff, index) => (
                    <motion.tr
                      key={staff.id}
                      className="hover:bg-white/5 transition-colors"
                      variants={tableRowVariants}
                      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    >
                      <td className="px-6 py-4 text-white">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-6 py-4 text-white">{staff.Name}</td>
                      <td className="px-6 py-4 text-white">{staff.NIP}</td>
                      <td className="px-6 py-4 text-white">{staff.Program}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <a
                            className="p-2 hover:bg-teal-500/20 rounded-lg transition-colors focus:outline-none focus:ring-2 
                 focus:ring-teal-300/50"
                            href={`https://ddt.ar-raniry.ac.id/profil/${staff.DDT_ID}`}
                            target="_blank"
                          >
                            <Eye className="w-5 h-5 text-white" />
                          </a>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination */}
        {mounted && data && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, data.meta.pagination.total)} of {data.meta.pagination.total} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: data.meta.pagination.pageCount }, (_, i) => i + 1)
                .filter((page) => {
                  const distance = Math.abs(page - currentPage);
                  return distance === 0 || distance === 1 || page === 1 || page === data.meta.pagination.pageCount;
                })
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && <span className="text-white">...</span>}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === page ? "bg-teal-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                      } transition-colors`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data.meta.pagination.pageCount))}
                disabled={currentPage === data.meta.pagination.pageCount}
                className="p-2 rounded-lg bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default TenagaKependidikan;


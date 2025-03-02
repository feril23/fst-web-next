/** @type {import('next').NextConfig} */
const nextConfig = {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
          pdfjsWorker: ["pdfjs-dist/build/pdf.worker.js"],
        },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fst-dashboard.up.railway.app", // Sesuaikan dengan domain yang digunakan
      },
    ],
  },
  distDir: "./dist", // Changes the build output directory to `./dist/`.
};

export default nextConfig;

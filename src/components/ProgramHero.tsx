import React from "react";
import Link from "next/link";
import { Globe, Info } from "lucide-react";

const ProgramHero = ({ data }) => {
  return (
    <main className="md:px-6 md:pt-6">
      <div className="relative bg-gray-100 overflow-hidden md:rounded-3xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={
              data.Hero?.url
                ? `https://fst-dashboard.up.railway.app${data.Hero.url}`
                : "https://www.utopicomputers.com/wp-content/uploads/2017/05/Gambar-Teknologi-Informasi.jpg"
            }
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-teal-900/70" />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="container mx-auto px-6">
            <div className="py-10 flex flex-col justify-between content-between">
              {/* Breadcrumb */}
              <nav className="mb-8 hidden md:flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-2">
                  <li>
                    <Link href="/" className="text-gray-200 hover:text-white text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-400 mx-2">/</span>
                  </li>
                  <li>
                    <Link href="/program-studi" className="text-gray-200 hover:text-white text-sm">
                      program Studi
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-400 mx-2">/</span>
                  </li>
                  <li>
                    <span className="text-gray-200 text-sm">{data.Name}</span>
                  </li>
                </ol>
              </nav>

              {/* Title Section */}
              <div className="max-w-4xl mt-20">
                <h2 className="text-xl text-gray-200 mb-3">Program Studi</h2>
                <h1 className="text-4xl font-bold text-white mb-8">{data.Name ?? "Not Found Name"}</h1>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 items-center ">
                  <div className="flex flex-row gap-3">
                    <button
                      className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      onClick={() => window.open(data.Sosmed[0].Website ?? "", "_blank")}
                    >
                      <Globe className="w-5 h-5 text-white mr-2" />
                      <span className="text-white text-sm font-medium">Situs Prodi</span>
                    </button>
                    <button className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                      <Info className="w-5 h-5 text-white mr-2" />
                      <span className="text-white text-sm font-medium">Info</span>
                    </button>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex gap-4 md:pl-10">
                    {data.Sosmed[0]?.Instagram && (
                      <a
                        href={`${data.Sosmed[0]?.Instagram}`}
                        target="_blank"
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                    {data.Sosmed[0]?.Facebook && (
                      <a
                        href={`${data.Sosmed[0]?.Facebook}`}
                        target="_blank"
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                    {data.Sosmed[0]?.Youtube && (
                      <a
                        href={`${data.Sosmed[0]?.Youtube}`}
                        target="_blank"
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProgramHero;


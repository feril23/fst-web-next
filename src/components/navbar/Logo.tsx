import Link from "next/link";
import logo from "../../../public/icon.webp";
import Image from "next/image";

interface LogoProps {
  isScrolled: boolean;
}

export const Logo = ({ isScrolled }: LogoProps) => (
  <Link href="/" className="flex items-center">
    <div className={`transition-all duration-300`}>
      <Image
        width={isScrolled ? 74 : 96}
        height={isScrolled ? 56 : 64}
        src={logo.src}
        alt="Logo"
        className={`transition-all duration-300 ${isScrolled ? "w-[74px] h-14" : "w-[96px] h-16"}`}
      />
    </div>
    <div className="flex flex-col">
      <span
        className={`font-bold tracking-tight text-white transition-all duration-300 pr-3 md:pr-0 ${
          isScrolled ? "text-base" : "text-lg"
        }`}
      >
        Fakultas Sains dan Teknologi
      </span>
      <span className={`${isScrolled ? "text-xs" : "text-base"} text-teal-100`}>UIN Ar-Raniry</span>
    </div>
  </Link>
);


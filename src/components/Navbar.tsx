"use client";

import React, { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Logo } from "./navbar/Logo";
import { NavLink } from "./navbar/NavLink";
import { NavDropdown } from "./navbar/NavDropdown";
import { NavDropdownItem } from "./navbar/NavDropdownItem";
import { MobileNavLink } from "./navbar/MobileNavLink";
import Link from "next/link";

interface MobileSubMenuProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

interface MobileMenuLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const profileLinks = [
  { to: "/sejarah", label: "Sejarah" },
  { to: "/visi-misi", label: "Visi dan Misi" },
  { to: "/dekanat", label: "Dekanat" },
  { to: "/struktur-organisasi", label: "Struktur Organisasi" },
  { to: "/tenaga-kependidikan", label: "Tenaga Kependidikan" },
];

const programLinks = [
  { to: "/program-studi/teknologi-informasi", label: "Teknologi Informasi" },
  { to: "/program-studi/teknik-fisika", label: "Teknik Fisika" },
  { to: "/program-studi/teknik-lingkungan", label: "Teknik Lingkungan" },
  { to: "/program-studi/arsitektur", label: "Arsitektur" },
  { to: "/program-studi/kimia", label: "Kimia" },
  { to: "/program-studi/biologi", label: "Biologi" },
];

const MobileSubmenu = ({ title, isOpen, onToggle, children }: MobileSubMenuProps) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-3 px-4 hover:bg-teal-500 rounded-md transition-colors duration-200 text-white"
    >
      <span>{title}</span>
      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <div
      className={`pl-4 space-y-1 overflow-hidden transition-all duration-200 ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {children}
    </div>
  </div>
);

const MobileMenuLink = ({ to, onClick, children }: MobileMenuLinkProps) => (
  <Link
    href={to}
    onClick={onClick}
    className="block py-2 px-4 hover:bg-teal-500 rounded-md transition-colors duration-200 text-teal-100"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;

  const handleSubmenuToggle = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };
  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-teal-600 ${
        isScrolled
          ? "bg-opacity-90 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-teal-600 to-teal-700 bg-opacity-100 shadow-none"
      }`}
    >
      <div className="container mx-auto px-0.5">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-16" : "h-20"}`}
        >
          <Logo isScrolled={isScrolled} />

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-1">
            <NavLink to="/">Home</NavLink>

            <NavDropdown label="Profile">
              {profileLinks.map((link) => (
                <NavDropdownItem key={link.to} to={link.to}>
                  {link.label}
                </NavDropdownItem>
              ))}
            </NavDropdown>

            <NavDropdown label="Program Studi">
              {programLinks.map((link) => (
                <NavDropdownItem key={link.to} to={link.to}>
                  {link.label}
                </NavDropdownItem>
              ))}
            </NavDropdown>

            <NavLink to="/mutu">Mutu</NavLink>
            <NavLink to="/mahasiswa">Mahasiswa</NavLink>
            <NavLink to="/riset">Riset</NavLink>
            <NavLink to="/info">Info</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 mr-2 hover:bg-teal-500 rounded-lg transition-colors duration-200 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-gradient-to-r from-teal-600 to-teal-700 transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{ top: isScrolled ? "64px" : "80px" }}
        >
          <div className="h-[calc(100vh-64px)] overflow-y-auto py-4 px-6 bg-gradient-to-r from-teal-600 to-teal-700">
            <div className="space-y-2">
              <MobileMenuLink to="/" onClick={closeMobileMenu}>
                Home
              </MobileMenuLink>

              <MobileSubmenu
                title="Profile"
                isOpen={openSubmenu === "profile"}
                onToggle={() => handleSubmenuToggle("profile")}
              >
                {profileLinks.map((link) => (
                  <MobileNavLink key={link.to} to={link.to} onClick={closeMobileMenu}>
                    {link.label}
                  </MobileNavLink>
                ))}
              </MobileSubmenu>

              <MobileSubmenu
                title="Program Studi"
                isOpen={openSubmenu === "program-studi"}
                onToggle={() => handleSubmenuToggle("program-studi")}
              >
                {programLinks.map((link) => (
                  <MobileNavLink key={link.to} to={link.to} onClick={closeMobileMenu}>
                    {link.label}
                  </MobileNavLink>
                ))}
              </MobileSubmenu>
            </div>

            <MobileMenuLink to="/mutu" onClick={closeMobileMenu}>
              Mutu
            </MobileMenuLink>
            <MobileMenuLink to="/mahasiswa" onClick={closeMobileMenu}>
              Mahasiswa
            </MobileMenuLink>
            <MobileMenuLink to="/riset" onClick={closeMobileMenu}>
              Riset
            </MobileMenuLink>
            <MobileMenuLink to="/info" onClick={closeMobileMenu}>
              Info
            </MobileMenuLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


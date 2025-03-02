import React from 'react';
import { ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  label: string;
  children: React.ReactNode;
}

export const NavDropdown = ({ label, children }: NavDropdownProps) => (
  <div className="relative group">
    <button className="px-4 py-2 hover:bg-teal-500 rounded-md transition-colors duration-200 inline-flex items-center font-medium group-hover:bg-teal-500 text-white">
      {label}
      <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
    </button>
    
    <div className="absolute left-0 mt-1 top-full w-64 bg-white rounded-lg shadow-xl opacity-0 invisible 
                  group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50
                  transform origin-top scale-95 group-hover:scale-100">
      <div className="py-2">
        {children}
      </div>
    </div>
  </div>
);
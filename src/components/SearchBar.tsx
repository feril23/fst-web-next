import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Cari...", className = "" }: SearchBarProps) => {
  return (
    <div className={`relative w-full md:w-64 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-teal-300/30 rounded-lg 
                 text-white placeholder-teal-300/70 focus:outline-none focus:ring-2 
                 focus:ring-teal-300/50 text-sm transition-all duration-200"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-300/70 w-4 h-4" />
    </div>
  );
}

export default SearchBar
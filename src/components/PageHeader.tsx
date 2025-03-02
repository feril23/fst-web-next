import React from "react";
import SearchBar from "./SearchBar";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
}

const PageHeader = ({ title, subtitle, searchQuery, onSearchChange, showSearch = true }: PageHeaderProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white pb-5">
          {title}
          {subtitle && <span className="block text-xl sm:text-2xl font-normal mt-2">{subtitle}</span>}
        </h1>
      </div>

      {showSearch && onSearchChange && (
        <div className="pt-4">
          <SearchBar value={searchQuery || ""} onChange={onSearchChange} className="max-w-md" />
        </div>
      )}
    </div>
  );
};

export default PageHeader;


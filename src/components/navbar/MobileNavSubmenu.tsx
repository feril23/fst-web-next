import { ChevronDown } from 'lucide-react';

interface MobileNavSubmenuProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const MobileNavSubmenu = ({ title, isOpen, onToggle, children }: MobileNavSubmenuProps) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-3 px-4 hover:bg-teal-500/50 active:bg-teal-500/70 rounded-md transition-colors duration-200 text-white"
    >
      <span>{title}</span>
      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
      {children}
    </div>
  </div>
);
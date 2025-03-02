import Link from "next/link";

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const MobileNavLink = ({ to, onClick, children }: MobileNavLinkProps) => (
  <Link
    href={to}
    onClick={onClick}
    className="block py-2 px-4 hover:bg-teal-500/50 active:bg-teal-500/70 rounded-md transition-colors duration-200 text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
  >
    {children}
  </Link>
);


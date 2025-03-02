import Link from "next/link";

interface NavDropdownItemProps {
  to: string;
  children: React.ReactNode;
}

export const NavDropdownItem = ({ to, children }: NavDropdownItemProps) => (
  <Link
    href={to}
    className="block px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-150 flex items-center space-x-2"
  >
    <div className="w-2 h-2 rounded-full bg-teal-500" />
    <span>{children}</span>
  </Link>
);


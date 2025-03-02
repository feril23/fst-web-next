import Link from "next/link";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavLink = ({ to, children }: NavLinkProps) => (
  <Link
    href={`${to}`}
    className="px-4 py-2 hover:bg-teal-500 rounded-md transition-colors duration-200 font-medium text-white"
  >
    {children}
  </Link>
);


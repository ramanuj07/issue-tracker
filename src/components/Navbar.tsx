import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const links = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Issues",
      href: "/issues",
    },

    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ];
  return (
    <nav className="flex px-5 mb-5 h-14 space-x-6 items-center border-b">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/projetos", label: "Projetos" },
  { href: "/stacks", label: "Stacks" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const controlNavbar = useCallback(() => {
    let lastScrollY = 0;
    return () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 100);
      lastScrollY = currentScrollY;
    };
  }, []);

  useEffect(() => {
    const handler = controlNavbar();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [controlNavbar]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed w-full z-50 transition-transform duration-300 bg-white border-b border-[#C3D0DD] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">

          <Link
            href="/"
            className="text-base font-semibold font-Sora text-[#3D6479] tracking-tight hover:text-[#8FA9BE] transition-colors"
          >
            Breno Bronzere
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded text-sm font-medium font-Sora transition-colors ${
                  pathname === link.href
                    ? "bg-[#3D6479] text-white"
                    : "text-[#3D6479] hover:text-[#8FA9BE]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-1.5 rounded text-[#3D6479] hover:text-white hover:bg-[#3D6479] focus:outline-none focus:ring-2 focus:ring-[#3D6479] transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-64 opacity-100 pb-3" : "max-h-0 opacity-0"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded text-sm font-medium font-Sora transition-colors ${
                pathname === link.href
                  ? "bg-[#3D6479] text-white"
                  : "text-[#3D6479] hover:text-[#8FA9BE]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
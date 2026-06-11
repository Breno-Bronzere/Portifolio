"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  const navLinks = [
    { href: '/Home', label: 'Home' },
    { href: '/projetos', label: 'Projects' },
    { href: '/sobre', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  return (
    <nav className={`fixed w-full shadow-md transition-transform duration-300 z-50 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          
          <div className="flex items-center">
            <Link href="/" className="text-2xl text-gray-800">
              Breno Bronzere
            </Link>  
          </div>
            
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md ttext-md font-semibold transition-colors ${
                  pathname === link.href
                    ? 'bg-gray-500 text-white'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
          </div>
          <div className="md:hidden flex items-center ">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focusLring-inset focus:ring-gray-300">
                {!isMobileMenuOpen ? <span>☰</span> : <span>✕</span>}
              </button>
            </div>
          </div>
          <div className={`md:giden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}>
                  {link.label}
              </Link>
              
            ))}
          </div>
      </div>
      
    </nav>
  )
}

export default Navbar
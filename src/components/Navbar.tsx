import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.reviews, href: '#reviews' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        isScrolled ? 'bg-[#FFF8F0]/95 backdrop-blur-md shadow-sm h-16 border-[#E8D8C8]' : 'bg-[#FFF8F0] h-20 border-[#E8D8C8]/50'
      }`}
    >
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center flex-col justify-center">
            <a href="#home" className="font-serif text-xl md:text-2xl tracking-tighter text-[#2B2D42]">
              لمسات الجود
            </a>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#2B2D42] hidden md:block">Lamasat Al Jood</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-widest font-medium text-[#2B2D42] hover:text-[#2B2D42] transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={toggleLang}
              className="flex items-center space-x-2 rtl:space-x-reverse text-[11px] tracking-[0.2em] font-semibold opacity-60 hover:opacity-100 transition-opacity text-[#2B2D42]"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            <a
              href="#booking"
              className="bg-[#D4A373] text-[#FFFFFF] px-8 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#FFFFFF] hover:text-[#2B2D42] transition-colors ml-4 rtl:mr-4"
            >
              {t.nav.bookNow}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#2B2D42]"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFFFFF] shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-[#2B2D42] hover:text-[#2B2D42]"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  toggleLang();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-base font-medium text-[#2B2D42] hover:text-[#2B2D42]"
              >
                <Globe className="w-5 h-5" />
                <span>{lang === 'en' ? 'Switch to Arabic' : 'التبديل للإنجليزية'}</span>
              </button>
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center mt-4 px-6 py-3 border border-[#D4A373] text-[#2B2D42] font-medium hover:bg-[#FFFFFF] hover:text-[#2B2D42] transition-colors"
              >
                {t.nav.bookNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

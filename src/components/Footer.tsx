import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Instagram, MapPin, Phone, Facebook } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#111111] text-[#FFF8F0] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-[#FFF8F0]">لمسات الجود</h2>
            <p className="font-sans text-[11px] tracking-wide leading-relaxed opacity-60 max-w-xs">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] text-[#FFF8F0] font-semibold tracking-[0.3em] uppercase">{t.nav.services}</h3>
            <ul className="space-y-4 font-sans text-[11px] tracking-widest uppercase font-medium">
              <li><a href="#services" className="opacity-70 hover:opacity-100 hover:text-[#FFF8F0] transition-colors">{t.services.facial.title}</a></li>
              <li><a href="#services" className="opacity-70 hover:opacity-100 hover:text-[#FFF8F0] transition-colors">{t.services.hair.title}</a></li>
              <li><a href="#services" className="opacity-70 hover:opacity-100 hover:text-[#FFF8F0] transition-colors">{t.services.nails.title}</a></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-6">
            <h3 className="text-[10px] text-[#FFF8F0] font-semibold tracking-[0.3em] uppercase">{t.footer.openingHours}</h3>
            <div className="font-sans text-xs tracking-wide leading-loose whitespace-pre-line opacity-70">
              {t.footer.hoursDesc}
            </div>
          </div>

          {/* Socials / Contact */}
          <div className="space-y-6">
            <h3 className="text-[10px] text-[#FFF8F0] font-semibold tracking-[0.3em] uppercase">{t.footer.socials}</h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="w-10 h-10 rounded-none border border-[#E8D8C8] flex items-center justify-center hover:bg-[#D4A373] hover:border-[#D4A373] hover:text-[#FFFFFF] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-none border border-[#E8D8C8] flex items-center justify-center hover:bg-[#D4A373] hover:border-[#D4A373] hover:text-[#FFFFFF] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="tel:+966509531383" className="w-10 h-10 rounded-none border border-[#E8D8C8] flex items-center justify-center hover:bg-[#D4A373] hover:border-[#D4A373] hover:text-[#FFFFFF] transition-all">
                <Phone className="w-4 h-4" />
              </a>
              <a href="https://maps.google.com" className="w-10 h-10 rounded-none border border-[#E8D8C8] flex items-center justify-center hover:bg-[#D4A373] hover:border-[#D4A373] hover:text-[#FFFFFF] transition-all">
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-[#E8D8C8] flex flex-col md:flex-row justify-between items-center opacity-40 text-[9px] uppercase tracking-[0.2em] font-semibold">
          <span>&copy; 2026 LAMASAT AL JOOD</span>
          <span className="mt-4 md:mt-0">BISHA, KSA</span>
        </div>
      </div>
    </footer>
  );
}

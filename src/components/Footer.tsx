import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { whatsappLink } from '../data/site';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-[#111111] text-[#FFF8F0] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-[#FFF8F0]">{lang === 'en' ? 'Amāra' : 'أمارا'}</h2>
            <p className="font-sans text-[11px] tracking-wide leading-relaxed text-[#FFF8F0]/80 max-w-xs">{t.hero.subtitle}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] text-[#FFF8F0] font-semibold tracking-[0.3em] uppercase">{t.nav.services}</h3>
            <ul className="space-y-4 font-sans text-[11px] tracking-widest uppercase font-medium">
              <li><a href="#services" className="text-[#FFF8F0]/80 hover:text-[#FFF8F0] transition-colors">{t.services.facial.title}</a></li>
              <li><a href="#services" className="text-[#FFF8F0]/80 hover:text-[#FFF8F0] transition-colors">{t.services.hair.title}</a></li>
              <li><a href="#services" className="text-[#FFF8F0]/80 hover:text-[#FFF8F0] transition-colors">{t.services.nails.title}</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] text-[#FFF8F0] font-semibold tracking-[0.3em] uppercase">{t.footer.openingHours}</h3>
            <div className="font-sans text-xs tracking-wide leading-loose whitespace-pre-line text-[#FFF8F0]/80">{t.footer.hoursDesc}</div>
          </div>

          {/* Only real contact routes are shown; the old Instagram/Facebook icons linked nowhere */}
          <div className="space-y-6">
            <h3 className="text-[10px] text-[#FFF8F0] font-semibold tracking-[0.3em] uppercase">{t.nav.contact}</h3>
            <a
              href={whatsappLink(t.location.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex items-center gap-3 border border-[#E8D8C8] px-5 py-3 text-[11px] uppercase tracking-widest hover:bg-[#D4A373] hover:border-[#D4A373] hover:text-[#111111] transition-all"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" /> {t.location.whatsapp}
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#E8D8C8] flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-start">
            <span className="text-[#FFF8F0]/70 text-[9px] uppercase tracking-[0.2em] font-semibold">&copy; 2026 AMĀRA BEAUTY LOUNGE</span>
            {/* Sample-content notice: same line as the copyright, at a readable size */}
            <span className="ms-3 font-sans text-xs text-[#FFF8F0]/80">{t.footer.sampleReviews}</span>
          </p>
          <p className="mt-4 md:mt-0 text-center md:text-end">
            <span className="text-[#FFF8F0]/70 text-[9px] uppercase tracking-[0.2em] font-semibold">{t.location.region}</span>
            <span className="ms-3 font-sans text-xs text-[#FFF8F0]/80">
              {t.footer.builtBy} ·{' '}
              <a href="mailto:abdulwahababdullahi3619@gmail.com" className="underline hover:text-[#D4A373]">{t.footer.contactDev}</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

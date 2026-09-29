import React from 'react';
import { Clock, MapPin, MessageSquare } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { whatsappLink } from '../data/site';
import SmartImage from './SmartImage';
import { IMAGES } from '../data/images';

// No map or street address: Amāra is a demo brand, so the location is described generically.
export default function Location() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-[#FFF8F0] text-[#2B2D42] border-b border-[#E8D8C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#2B2D42] mb-6">{t.location.region}</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[#2B2D42]">{t.location.title}</h2>
          <div className="h-px w-24 bg-[#D4A373] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#E8D8C8]">
          <div className="lg:col-span-2 h-[360px] lg:h-[450px] relative border-b lg:border-b-0 lg:border-r rtl:lg:border-l rtl:lg:border-r-0 border-[#E8D8C8]">
            <SmartImage image={IMAGES.about} wrapperClassName="absolute inset-0" className="w-full h-full object-cover grayscale-[0.4]" />
          </div>

          <div className="lg:col-span-1 p-10 flex flex-col justify-center space-y-10 bg-[#FFF8F0]">
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#2B2D42]">{t.location.addressInfo}</h3>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#2B2D42] mt-1 shrink-0" aria-hidden="true" />
                <p className="text-[#2B2D42]/85 text-sm font-sans tracking-wide leading-relaxed">{t.location.address}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#2B2D42]">{t.footer.openingHours}</h3>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#2B2D42] mt-1 shrink-0" aria-hidden="true" />
                <p className="text-[#2B2D42]/85 text-sm whitespace-pre-line leading-relaxed">{t.footer.hoursDesc}</p>
              </div>
            </div>

            <div className="pt-8 border-t border-[#E8D8C8]">
              <a href={whatsappLink(t.location.whatsappMsg)} target="_blank" rel="noopener noreferrer" className="press flex items-center gap-4 group">
                <span className="w-8 h-8 rounded-full border border-[#D4A373] flex items-center justify-center text-[#2B2D42] group-hover:bg-[#1f7a4d] group-hover:border-[#1f7a4d] group-hover:text-[#FFFFFF] transition-colors">
                  <MessageSquare className="w-3 h-3" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium tracking-wide">{t.location.whatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

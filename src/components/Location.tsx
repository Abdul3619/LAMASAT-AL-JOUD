import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { MapPin, Phone, MessageSquare } from 'lucide-react';

export default function Location() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-[#FFF8F0] text-[#2B2D42] border-b border-[#E8D8C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#2B2D42] mb-6">
            Location Hub
          </h3>
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[#2B2D42]">
            {t.location.title}
          </h2>
          <div className="h-px w-24 bg-[#D4A373] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#E8D8C8]">
          
          {/* Map Frame */}
          <div className="lg:col-span-2 h-[450px] w-full bg-[#E8D8C8]/20 grayscale-[0.8] opacity-90 transition-all hover:opacity-100 hover:grayscale-0 overflow-hidden relative border-b lg:border-b-0 lg:border-r border-[#E8D8C8] rtl:lg:border-l rtl:lg:border-r-0">
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113693.35921869811!2d42.502934277717436!3d19.988184852928507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15f79aa0b02a2cd1%3A0x6b9d6a3f4eec3b09!2sBisha%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1714418047913!5m2!1sen!2sus" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="absolute inset-0 mix-blend-multiply"
               title="Google Maps Location"
            ></iframe>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1 p-10 flex flex-col justify-center space-y-10 bg-[#FFF8F0]">
            
            <div className="space-y-4">
              <h5 className="text-[10px] uppercase tracking-[0.3em] text-[#2B2D42] mb-3">{t.location.addressInfo}</h5>
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-[#2B2D42] mt-1 shrink-0" />
                <p className="text-[#2B2D42]/80 text-sm font-sans tracking-wide leading-relaxed">
                  {t.location.address}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-[#E8D8C8] space-y-6">
              <h5 className="text-[10px] uppercase tracking-[0.3em] text-[#2B2D42] mb-3">Connectivity</h5>

              <a 
                href="tel:+966509531383"
                className="flex items-center space-x-4 rtl:space-x-reverse group"
              >
                <div className="w-8 h-8 rounded-full border border-[#D4A373] flex items-center justify-center text-[#2B2D42] group-hover:bg-[#D4A373] group-hover:text-[#FFFFFF] transition-colors">
                  <Phone className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium tracking-wide group-hover:text-[#2B2D42] transition-colors">{t.location.callNow}</span>
              </a>

              <a 
                href="https://wa.me/966509531383"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-4 rtl:space-x-reverse group"
              >
                <div className="w-8 h-8 rounded-full border border-[#D4A373] flex items-center justify-center text-[#2B2D42] group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:text-[#FFFFFF] transition-colors">
                  <MessageSquare className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium tracking-wide group-hover:text-[#2B2D42] transition-colors">{t.location.whatsapp}</span>
              </a>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}

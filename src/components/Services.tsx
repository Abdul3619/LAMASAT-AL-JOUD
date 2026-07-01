import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { useLanguage } from '../lib/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import facialImage from '../assets/images/service_facial_1782761107251.jpg';
import hairImage from '../assets/images/service_hair_1782761122577.jpg';
import nailsImage from '../assets/images/service_nails_1782761136735.jpg';

export default function Services() {
  const { t, lang } = useLanguage();
  
  // Embla setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: lang === 'ar' ? 'rtl' : 'ltr' },
    [Autoplay({ delay: 5000, stopOnInteraction: false }), Fade()]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const servicesList = [
    {
      id: 'facial',
      image: facialImage,
      title: t.services.facial.title,
      desc: t.services.facial.desc,
    },
    {
      id: 'hair',
      image: hairImage,
      title: t.services.hair.title,
      desc: t.services.hair.desc,
    },
    {
      id: 'nails',
      image: nailsImage,
      title: t.services.nails.title,
      desc: t.services.nails.desc,
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#FFF8F0] border-b border-[#E8D8C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#2B2D42] mb-6">
            The Curated Menu
          </h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl text-[#2B2D42] mb-4"
          >
            {t.services.title}
          </motion.h2>
          <div className="h-px w-24 bg-[#D4A373] mx-auto"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Embla Viewport */}
          <div className="embla overflow-hidden border border-[#E8D8C8] shadow-sm" ref={emblaRef} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="embla__container h-[600px]">
              {servicesList.map((service, index) => (
                <div className="embla__slide relative" key={service.id}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3]"
                  />
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/40 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4A373] mb-2 font-medium">0{index + 1}</span>
                    <h4 className="font-serif text-3xl md:text-5xl text-[#FFFFFF] mb-4">
                      {service.title}
                    </h4>
                    <p className="text-[#FFFFFF]/80 text-sm tracking-wide max-w-md mb-8 font-sans leading-relaxed">
                      {service.desc}
                    </p>
                    <div>
                      <a href="#booking" className="inline-block px-8 py-3 border border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#D4A373] hover:border-[#D4A373] transition-all duration-300 text-[11px] font-semibold tracking-widest uppercase">
                        {t.services.viewDetails}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 w-12 h-12 bg-[#FFFFFF] rounded-none border border-[#E8D8C8] shadow-md flex items-center justify-center text-[#2B2D42] hover:bg-[#FFFFFF] hover:text-[#2B2D42] transition-colors z-10"
            onClick={scrollPrev}
          >
            {lang === 'ar' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          
          <button
            className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 w-12 h-12 bg-[#FFFFFF] rounded-none border border-[#E8D8C8] shadow-md flex items-center justify-center text-[#2B2D42] hover:bg-[#FFFFFF] hover:text-[#2B2D42] transition-colors z-10"
            onClick={scrollNext}
          >
            {lang === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </section>
  );
}

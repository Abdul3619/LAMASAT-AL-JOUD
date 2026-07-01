import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'motion/react';
import heroImage from '../assets/images/hero_bg_1782761055371.jpg';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-screen w-full flex flex-col justify-end pb-32 overflow-hidden bg-[#FFF8F0]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Salon Interior"
          className="w-full h-full object-cover"
        />
        {/* Cinematic dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/30 to-[#111111]/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 lg:px-24 w-full flex flex-col items-start text-[#FFFFFF]">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-6xl md:text-7xl lg:text-8xl leading-none mb-4 font-normal"
        >
          {t.hero.title}
        </motion.h1>
        
        <motion.div
           initial={{ opacity: 0, width: 0 }}
           animate={{ opacity: 1, width: 80 }}
           className="h-[1px] bg-[#D4A373] mb-4"
        ></motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-sm uppercase tracking-wide opacity-90 max-w-md font-sans mb-10"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.a 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          href="#booking"
          className="bg-[#D4A373] text-[#FFFFFF] px-8 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#FFFFFF] hover:text-[#2B2D42] transition-colors"
        >
          {t.hero.bookAppointment}
        </motion.a>
      </div>
    </section>
  );
}

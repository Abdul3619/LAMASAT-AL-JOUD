import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'motion/react';
import aboutImage from '../assets/images/about_bg_1782761085513.jpg';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-[#E8D8C8]/10 relative border-b border-[#E8D8C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#2B2D42]">
              Atelier
            </h3>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2B2D42] leading-tight">
              {t.about.title}
            </h2>
            <div className="h-px w-16 bg-[#D4A373]"></div>
            <p className="text-[#2B2D42]/80 leading-relaxed text-sm tracking-wide font-sans mt-4">
              {t.about.text1}
            </p>
            <p className="text-[#2B2D42]/80 leading-relaxed text-sm tracking-wide font-sans">
              {t.about.text2}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] w-full"
          >
            {/* Decorative Offset Border */}
            <div className="absolute inset-0 border border-[#D4A373] translate-x-4 translate-y-4"></div>
            
            <img
              src={aboutImage}
              alt="Serene Salon Interior"
              className="absolute inset-0 w-full h-full object-cover z-10 grayscale-[0.2]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

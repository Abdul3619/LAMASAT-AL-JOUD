import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useLanguage } from '../lib/LanguageContext';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import reviewsBg from '../assets/images/reviews_bg_1782761011826.jpg';

export default function Reviews() {
  const { t, lang } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    direction: lang === 'ar' ? 'rtl' : 'ltr',
    align: 'center',
    skipSnaps: false
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const reviews = [
    {
      id: 1,
      name: 'RUFF Saeed',
      initial: 'R',
      text: "The reception was amazing and the staff were so polite. I got a sweet pedicure at Mary's, she was so cute and lovely, and a manicure at Raquel's, she's a bit temperamental but her manicures are nice.",
      rating: 5,
    },
    {
      id: 2,
      name: 'Fatima A',
      initial: 'F',
      text: "Ambiance and Cleanliness: 5/5. The salon is clean, modern, and visually appealing. While the environment wasn’t relaxing due to loud noises and children, which is expected because it's a salon rather than a spa. Pricing: 4/5.",
      rating: 4,
    }
  ];

  return (
    <section id="reviews" className="py-24 relative overflow-hidden border-b border-[#E8D8C8]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={reviewsBg}
          alt="Luxury Reviews Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#FFF8F0]/80"></div>
      </div>
      
      {/* Decorative large quote icon */}
      <div className="absolute top-10 left-10 text-[#2B2D42] opacity-5 transform -rotate-12 z-10">
        <Quote className="w-64 h-64" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#2B2D42] mb-6">
            Words of Praise
          </h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-[#2B2D42] mb-4"
          >
            {t.reviews.title}
          </motion.h2>
          <div className="h-px w-24 bg-[#D4A373] mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="embla overflow-hidden cursor-grab active:cursor-grabbing pb-10" ref={emblaRef} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="embla__container flex">
              {reviews.map((review) => (
                <div 
                  className="embla__slide flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] px-4" 
                  key={review.id}
                >
                  <div className="bg-[#FFF8F0]/70 backdrop-blur-md border border-[#FFFFFF] p-10 md:p-14 h-full flex flex-col justify-between shadow-xl rounded-sm">
                    
                    <div>
                      <div className="flex space-x-1 rtl:space-x-reverse mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-[#2B2D42] fill-[#1A0B10]' : 'text-gray-200'}`} 
                          />
                        ))}
                      </div>
                      
                      <p className="font-serif text-xl italic leading-relaxed mb-6 text-[#2B2D42] font-light">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 rtl:space-x-reverse pt-6 border-t border-[#E8D8C8]/50">
                      <div className="w-10 h-10 rounded-full bg-[#E8D8C8] flex items-center justify-center text-[#2B2D42] font-serif text-lg">
                        {review.initial}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#2B2D42] tracking-wide">{review.name}</h4>
                        <p className="text-[10px] mt-1 text-[#2B2D42]/50 uppercase tracking-[0.2em]">Verified Guest</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-3 rtl:space-x-reverse -mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`h-[2px] transition-all duration-300 ${
                  index === selectedIndex ? 'w-8 bg-[#D4A373]' : 'w-4 bg-[#E8D8C8]'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

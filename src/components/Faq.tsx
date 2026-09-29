import React from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function Faq() {
  const { t } = useLanguage();
  return (
    <section id="faq" className="py-24 bg-[#FFF8F0] border-b border-[#E8D8C8]" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="faq-heading" className="font-serif text-4xl md:text-5xl text-[#2B2D42] mb-4 text-center">{t.faq.title}</h2>
        <div className="h-px w-24 bg-[#D4A373] mx-auto mb-12"></div>
        <div className="space-y-3">
          {t.faq.items.map((f) => (
            <details key={f.q} className="group border border-[#E8D8C8] bg-[#FFFFFF]/60 p-5">
              <summary className="cursor-pointer list-none flex justify-between items-center font-serif text-lg text-[#2B2D42]">
                {f.q}
                <span className="ms-4 text-[#2B2D42] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm text-[#2B2D42]/85 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

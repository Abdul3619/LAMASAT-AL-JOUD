/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageProvider } from './lib/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import BookingCalendar from './components/BookingCalendar';
import Location from './components/Location';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen font-sans bg-pearl text-ink antialiased selection:bg-[#D4A373] selection:text-[#FFFFFF]">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <BookingCalendar />
          <Location />
          <Reviews />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}


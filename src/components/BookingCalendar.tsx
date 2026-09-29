import React, { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { db, signInWithGoogle } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { isSlotAvailable, salonToday } from '../lib/availability';
import { useAuth } from '../lib/useAuth';
import { IMAGES } from '../data/images';
import { useLocalStorage } from '../lib/useLocalStorage';

const servicesList = [
  { id: 'facial', name: { en: 'Facial Treatment', ar: 'علاج الوجه' }, duration: '60 min', price: '$120' },
  { id: 'hair', name: { en: 'Hair Styling', ar: 'تصفيف الشعر' }, duration: '45 min', price: '$80' },
  { id: 'nails', name: { en: 'Nail Spa', ar: 'سبا الأظافر' }, duration: '30 min', price: '$50' },
];

const timeSlots = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function BookingCalendar() {
  const { lang, t } = useLanguage();
  const { user, loading } = useAuth();
  // Progress (service, date, time and step) is kept on this device so a reload or a detour to sign in doesn't lose it
  const [saved, setSaved, clearSaved] = useLocalStorage<{ step: number; service: string; date: string; time: string }>(
    'amara:booking', { step: 1, service: '', date: '', time: '' });
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const step = done ? 4 : saved.step;
  const selectedService = saved.service;
  const selectedTime = saved.time;
  const savedDate = saved.date ? parseISO(saved.date) : null;
  const selectedDate = savedDate && savedDate >= salonToday() ? savedDate : salonToday();
  const setStep = (s: number) => setSaved((v) => ({ ...v, step: s }));
  const setSelectedService = (service: string) => setSaved((v) => ({ ...v, service }));
  const setSelectedDate = (d: Date) => setSaved((v) => ({ ...v, date: format(d, 'yyyy-MM-dd'), time: '' }));
  const setSelectedTime = (time: string) => setSaved((v) => ({ ...v, time }));

  // Generate next 14 days
  const today = salonToday();
  const days = Array.from({ length: 14 }).map((_, i) => addDays(today, i));

  const handleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch {
      setError(lang === 'en'
        ? 'Sign-in failed. Please allow pop-ups for this site and try again.'
        : 'تعذر تسجيل الدخول. يرجى السماح بالنوافذ المنبثقة لهذا الموقع والمحاولة مرة أخرى.');
    }
  };

  const handleBook = async () => {
    if (!user || !selectedService || !selectedTime) return;
    if (!isSlotAvailable(selectedDate, selectedTime)) {
      setError(lang === 'en' ? 'That time is no longer available. Please choose another slot.' : 'هذا الموعد لم يعد متاحاً. يرجى اختيار موعد آخر.');
      setSelectedTime('');
      setStep(2);
      return;
    }
    setError(null);
    // Optimistic: show the confirmation straight away and save in the background. If saving fails, the
    // visitor is taken back to the summary with their choices intact.
    setDone(true);
    try {
      await addDoc(collection(db, 'appointments'), {
        userId: user.uid,
        serviceId: selectedService,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userName: user.displayName || 'Guest',
        userEmail: user.email || ''
      });
      clearSaved();
    } catch (err) {
      console.error('Error booking appointment:', err);
      setDone(false);
      setError(lang === 'en'
        ? 'We could not save your booking. Your choices are still here, so please try again or message us on WhatsApp.'
        : 'تعذر حفظ حجزك. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.');
    }
  };

  const reset = () => {
    clearSaved();
    setDone(false);
    setError(null);
  };

  return (
    <section id="booking" className="py-24 relative border-b border-[#E8D8C8]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.booking.src} srcSet={IMAGES.booking.srcSet} sizes="100vw" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[#FFF8F0]/80"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#2B2D42] mb-6">
            {lang === 'en' ? 'Reservations' : 'الحجوزات'}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2B2D42] mb-4">
            {lang === 'en' ? 'Book Your Visit' : 'احجز زيارتك'}
          </h2>
          <div className="h-px w-24 bg-[#D4A373] mx-auto"></div>
        </div>

        <div className="bg-[#FFF8F0]/70 backdrop-blur-md border border-[#FFFFFF] p-8 md:p-12 shadow-xl min-h-[400px] relative overflow-hidden rounded-sm">
          {error && (
            <p role="alert" className="mb-6 text-center text-sm text-red-700">{error}</p>
          )}
          {loading ? (
            <div aria-busy="true" aria-label={t.booking.loading} className="space-y-6 py-4">
              <div className="flex justify-between gap-6">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-12 flex-1" />)}</div>
              {[0, 1, 2].map((i) => <div key={i} className="skeleton h-20 w-full" />)}
            </div>
          ) : !user ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6 py-12">
              <p className="font-sans text-sm tracking-wide text-[#2B2D42]/80 text-center">
                {lang === 'en' ? 'Please sign in to book an appointment.' : 'يرجى تسجيل الدخول لحجز موعد.'}
              </p>
              <button
                onClick={handleSignIn}
                className="press bg-[#D4A373] text-[#2B2D42] px-8 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#FFFFFF] transition-colors"
              >
                {lang === 'en' ? 'Sign in with Google' : 'تسجيل الدخول باستخدام جوجل'}
              </button>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Stepper */}
              <div className="flex justify-between items-center mb-10 border-b border-[#E8D8C8] pb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-colors ${step >= i ? 'bg-[#D4A373] border-[#D4A373] text-[#2B2D42]' : 'bg-transparent border-[#E8D8C8] text-[#2B2D42]/75'}`}>
                      {step > i ? <Check className="w-4 h-4" /> : i}
                    </div>
                    <span className={`text-[9px] uppercase tracking-[0.2em] mt-3 ${step >= i ? 'text-[#2B2D42]' : 'text-[#2B2D42]/75'}`}>
                      {lang === 'en' 
                        ? (i === 1 ? 'Service' : i === 2 ? 'Date & Time' : 'Confirm') 
                        : (i === 1 ? 'الخدمة' : i === 2 ? 'الموعد' : 'تأكيد')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {servicesList.map(s => (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => { setSaved((v) => ({ ...v, service: s.id, step: 2 })); }}
                          aria-pressed={selectedService === s.id}
                          className={`press w-full text-start group border p-6 flex justify-between items-center hover:border-[#D4A373] transition-all ${selectedService === s.id ? 'border-[#D4A373] bg-[#FFFFFF]/60' : 'border-[#E8D8C8]'}`}
                        >
                          <span>
                            <span className="block font-serif text-xl text-[#2B2D42] mb-1">{s.name[lang as 'en'|'ar']}</span>
                            <span className="block text-[11px] uppercase tracking-widest text-[#2B2D42]/75">{s.duration}</span>
                          </span>
                          <span className="text-sm font-medium text-[#2B2D42]">{s.price}</span>
                        </button>
                      ))}
                      <p className="text-xs text-[#2B2D42]/75 pt-2">{t.booking.saved}</p>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="mb-8">
                        <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#2B2D42]/80 mb-4">
                          {lang === 'en' ? 'Select Date' : 'اختر التاريخ'}
                        </h4>
                        <div className="flex space-x-3 rtl:space-x-reverse overflow-x-auto pb-4 no-scrollbar">
                          {days.map(d => (
                            <button
                              key={d.toISOString()}
                              onClick={() => setSelectedDate(d)}
                              aria-pressed={isSameDay(d, selectedDate)}
                              aria-label={format(d, 'EEEE d MMMM')}
                              className={`shrink-0 flex flex-col items-center justify-center w-16 h-20 border transition-all ${
                                isSameDay(d, selectedDate)
                                  ? 'bg-[#D4A373] border-[#D4A373] text-[#2B2D42]' 
                                  : 'border-[#E8D8C8] text-[#2B2D42] hover:border-[#D4A373]'
                              }`}
                            >
                              <span className="text-[10px] uppercase tracking-wider opacity-80 mb-1">{format(d, 'EEE')}</span>
                              <span className="text-xl font-serif">{format(d, 'd')}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#2B2D42]/80 mb-4">
                          {lang === 'en' ? 'Select Time' : 'اختر الوقت'}
                        </h4>
                        <div className="grid grid-cols-4 gap-3">
                          {timeSlots.map(time => {
                            const available = isSlotAvailable(selectedDate, time);
                            return (
                            <button
                              key={time}
                              disabled={!available}
                              onClick={() => { setSaved((v) => ({ ...v, time, step: 3 })); setError(null); }}
                              aria-pressed={selectedTime === time}
                              className={`py-3 border text-xs tracking-wider transition-all disabled:opacity-40 disabled:line-through disabled:cursor-not-allowed ${
                                selectedTime === time
                                  ? 'bg-[#D4A373] border-[#D4A373] text-[#2B2D42]'
                                  : 'border-[#E8D8C8] text-[#2B2D42] hover:border-[#D4A373]'
                              }`}
                            >
                              {time}
                            </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-start">
                         <button onClick={() => setStep(1)} className="text-[11px] uppercase tracking-widest text-[#2B2D42]/80 hover:text-[#2B2D42]">
                            {lang === 'en' ? '← Back' : 'رجوع →'}
                         </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col h-full"
                    >
                      <div className="bg-[#E8D8C8]/10 p-8 border border-[#E8D8C8] space-y-4 mb-8">
                         <h4 className="font-serif text-2xl text-[#2B2D42] mb-6 border-b border-[#E8D8C8] pb-4">
                           {lang === 'en' ? 'Booking Summary' : 'ملخص الحجز'}
                         </h4>
                         <div className="flex justify-between items-center text-sm">
                           <span className="text-[#2B2D42]/80 uppercase tracking-wider text-[11px]">{lang === 'en' ? 'Service' : 'الخدمة'}</span>
                           <span className="font-medium text-[#2B2D42]">{servicesList.find(s => s.id === selectedService)?.name[lang as 'en'|'ar']}</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                           <span className="text-[#2B2D42]/80 uppercase tracking-wider text-[11px]">{lang === 'en' ? 'Date' : 'التاريخ'}</span>
                           <span className="font-medium text-[#2B2D42]">{format(selectedDate, 'MMM d, yyyy')}</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                           <span className="text-[#2B2D42]/80 uppercase tracking-wider text-[11px]">{lang === 'en' ? 'Time' : 'الوقت'}</span>
                           <span className="font-medium text-[#2B2D42]">{selectedTime}</span>
                         </div>
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                         <button onClick={() => setStep(2)} className="text-[11px] uppercase tracking-widest text-[#2B2D42]/80 hover:text-[#2B2D42]">
                            {lang === 'en' ? '← Back' : 'رجوع →'}
                         </button>
                         <button
                           onClick={handleBook}
                           className="press bg-[#D4A373] text-[#2B2D42] px-8 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#FFFFFF] transition-colors"
                         >
                           {lang === 'en' ? 'Confirm Booking' : 'تأكيد الحجز'}
                         </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-16 h-16 bg-[#D4A373]/20 rounded-full flex items-center justify-center text-[#2B2D42] mb-6">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif text-3xl text-[#2B2D42] mb-4">
                        {lang === 'en' ? 'Booking Received' : 'تم استلام الحجز'}
                      </h4>
                      <p className="text-sm font-sans tracking-wide text-[#2B2D42]/70 mb-8 max-w-sm">
                        {lang === 'en' 
                          ? `We look forward to welcoming you on ${format(selectedDate, 'MMM d')} at ${selectedTime}.`
                          : `نتطلع للترحيب بك يوم ${format(selectedDate, 'd MMM')} الساعة ${selectedTime}.`}
                      </p>
                      <button
                        onClick={reset}
                        className="press border border-[#D4A373] text-[#2B2D42] px-8 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#FFFFFF] hover:text-[#2B2D42] transition-colors"
                      >
                        {lang === 'en' ? 'Book Another' : 'حجز موعد آخر'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

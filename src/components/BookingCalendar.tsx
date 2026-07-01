import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { db, auth, signInWithGoogle, logout } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../lib/useAuth';
import bookingBg from '../assets/images/booking_bg_1782760954859.jpg';

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
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate next 14 days
  const today = startOfToday();
  const days = Array.from({ length: 14 }).map((_, i) => addDays(today, i));

  const handleBook = async () => {
    if (!user || !selectedService || !selectedTime) return;
    setIsSubmitting(true);
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
      setSuccess(true);
      setStep(4);
    } catch (error) {
      console.error('Error booking:', error);
      const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        authInfo: {
          userId: auth.currentUser?.uid,
          email: auth.currentUser?.email,
          emailVerified: auth.currentUser?.emailVerified,
          isAnonymous: auth.currentUser?.isAnonymous,
          tenantId: auth.currentUser?.tenantId,
        },
        operationType: 'create',
        path: 'appointments'
      };
      console.error('Firestore Error: ', JSON.stringify(errInfo));
      alert('Error booking appointment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedService('');
    setSelectedDate(startOfToday());
    setSelectedTime('');
    setSuccess(false);
  };

  if (loading) {
    return <div className="py-24 text-center">Loading...</div>;
  }

  return (
    <section id="booking" className="py-24 relative border-b border-[#E8D8C8]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bookingBg}
          alt="Luxury Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#FFF8F0]/80"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#2B2D42] mb-6">
            {lang === 'en' ? 'Reservations' : 'الحجوزات'}
          </h3>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2B2D42] mb-4">
            {lang === 'en' ? 'Book Your Visit' : 'احجز زيارتك'}
          </h2>
          <div className="h-px w-24 bg-[#D4A373] mx-auto"></div>
        </div>

        <div className="bg-[#FFF8F0]/70 backdrop-blur-md border border-[#FFFFFF] p-8 md:p-12 shadow-xl min-h-[400px] relative overflow-hidden rounded-sm">
          {!user ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6 py-12">
              <p className="font-sans text-sm tracking-wide text-[#2B2D42]/80 text-center">
                {lang === 'en' ? 'Please sign in to book an appointment.' : 'يرجى تسجيل الدخول لحجز موعد.'}
              </p>
              <button
                onClick={signInWithGoogle}
                className="bg-[#D4A373] text-[#FFFFFF] px-8 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#FFFFFF] hover:text-[#2B2D42] transition-colors"
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-colors ${step >= i ? 'bg-[#D4A373] border-[#D4A373] text-[#FFFFFF]' : 'bg-transparent border-[#E8D8C8] text-[#2B2D42]/50'}`}>
                      {step > i ? <Check className="w-4 h-4" /> : i}
                    </div>
                    <span className={`text-[9px] uppercase tracking-[0.2em] mt-3 ${step >= i ? 'text-[#2B2D42]' : 'text-[#2B2D42]/40'}`}>
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
                        <div 
                          key={s.id}
                          onClick={() => { setSelectedService(s.id); setStep(2); }}
                          className="group cursor-pointer border border-[#E8D8C8] p-6 flex justify-between items-center hover:border-[#D4A373] transition-all"
                        >
                          <div>
                            <h4 className="font-serif text-xl text-[#2B2D42] mb-1 group-hover:text-[#2B2D42] transition-colors">{s.name[lang as 'en'|'ar']}</h4>
                            <p className="text-[11px] uppercase tracking-widest text-[#2B2D42]/50">{s.duration}</p>
                          </div>
                          <span className="text-sm font-medium text-[#2B2D42]/80">{s.price}</span>
                        </div>
                      ))}
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
                        <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#2B2D42]/60 mb-4">
                          {lang === 'en' ? 'Select Date' : 'اختر التاريخ'}
                        </h4>
                        <div className="flex space-x-3 rtl:space-x-reverse overflow-x-auto pb-4 no-scrollbar">
                          {days.map(d => (
                            <button
                              key={d.toISOString()}
                              onClick={() => setSelectedDate(d)}
                              className={`shrink-0 flex flex-col items-center justify-center w-16 h-20 border transition-all ${
                                isSameDay(d, selectedDate) 
                                  ? 'bg-[#D4A373] border-[#D4A373] text-[#FFFFFF]' 
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
                        <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#2B2D42]/60 mb-4">
                          {lang === 'en' ? 'Select Time' : 'اختر الوقت'}
                        </h4>
                        <div className="grid grid-cols-4 gap-3">
                          {timeSlots.map(time => (
                            <button
                              key={time}
                              onClick={() => { setSelectedTime(time); setStep(3); }}
                              className={`py-3 border text-xs tracking-wider transition-all ${
                                selectedTime === time
                                  ? 'bg-[#D4A373] border-[#D4A373] text-[#FFF8F0]'
                                  : 'border-[#E8D8C8] text-[#2B2D42] hover:border-[#D4A373]'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-start">
                         <button onClick={() => setStep(1)} className="text-[11px] uppercase tracking-widest text-[#2B2D42]/60 hover:text-[#2B2D42]">
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
                           <span className="text-[#2B2D42]/60 uppercase tracking-wider text-[11px]">{lang === 'en' ? 'Service' : 'الخدمة'}</span>
                           <span className="font-medium text-[#2B2D42]">{servicesList.find(s => s.id === selectedService)?.name[lang as 'en'|'ar']}</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                           <span className="text-[#2B2D42]/60 uppercase tracking-wider text-[11px]">{lang === 'en' ? 'Date' : 'التاريخ'}</span>
                           <span className="font-medium text-[#2B2D42]">{format(selectedDate, 'MMM d, yyyy')}</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                           <span className="text-[#2B2D42]/60 uppercase tracking-wider text-[11px]">{lang === 'en' ? 'Time' : 'الوقت'}</span>
                           <span className="font-medium text-[#2B2D42]">{selectedTime}</span>
                         </div>
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                         <button onClick={() => setStep(2)} className="text-[11px] uppercase tracking-widest text-[#2B2D42]/60 hover:text-[#2B2D42]">
                            {lang === 'en' ? '← Back' : 'رجوع →'}
                         </button>
                         <button
                           onClick={handleBook}
                           disabled={isSubmitting}
                           className="bg-[#D4A373] text-[#FFFFFF] px-8 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#FFFFFF] hover:text-[#2B2D42] transition-colors disabled:opacity-50"
                         >
                           {isSubmitting ? (lang === 'en' ? 'Processing...' : 'جاري المعالجة...') : (lang === 'en' ? 'Confirm Booking' : 'تأكيد الحجز')}
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
                        {lang === 'en' ? 'Booking Confirmed' : 'تم تأكيد الحجز'}
                      </h4>
                      <p className="text-sm font-sans tracking-wide text-[#2B2D42]/70 mb-8 max-w-sm">
                        {lang === 'en' 
                          ? `We look forward to welcoming you on ${format(selectedDate, 'MMM d')} at ${selectedTime}.`
                          : `نتطلع للترحيب بك يوم ${format(selectedDate, 'd MMM')} الساعة ${selectedTime}.`}
                      </p>
                      <button
                        onClick={reset}
                        className="border border-[#D4A373] text-[#2B2D42] px-8 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#FFFFFF] hover:text-[#2B2D42] transition-colors"
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

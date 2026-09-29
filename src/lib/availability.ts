import { isSameDay } from 'date-fns';

// Current wall-clock time at the salon (Saudi time, Asia/Riyadh), so availability is right for visitors in any time zone
export function salonNow(now: Date = new Date()) {
  return new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
}

export function salonToday(now: Date = new Date()) {
  const salon = salonNow(now);
  return new Date(salon.getFullYear(), salon.getMonth(), salon.getDate());
}

// Opening hours (see footer): Sunday-Thursday 10:00-22:00, Friday-Saturday 14:00-23:00
export function isSlotAvailable(day: Date, time: string, currentTime: Date = new Date()) {
  const [hour, minute] = time.split(':').map(Number);
  const weekday = day.getDay(); // 0 = Sunday ... 5 = Friday, 6 = Saturday
  const opensAt = weekday === 5 || weekday === 6 ? 14 : 10;
  if (hour < opensAt) return false;

  const now = salonNow(currentTime);
  if (isSameDay(day, now)) {
    return hour * 60 + minute > now.getHours() * 60 + now.getMinutes();
  }
  return true;
}

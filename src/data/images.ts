// Responsive WebP versions of the salon photos (AI-generated placeholder images, not a real salon).
import about800 from '../assets/images/about-800.webp';
import about1600 from '../assets/images/about-1600.webp';
import booking800 from '../assets/images/booking-bg-800.webp';
import booking1600 from '../assets/images/booking-bg-1600.webp';
import hero800 from '../assets/images/hero-800.webp';
import hero1600 from '../assets/images/hero-1600.webp';
import reviews800 from '../assets/images/reviews-bg-800.webp';
import reviews1600 from '../assets/images/reviews-bg-1600.webp';
import facial800 from '../assets/images/facial-800.webp';
import facial1600 from '../assets/images/facial-1600.webp';
import hair800 from '../assets/images/hair-800.webp';
import hair1600 from '../assets/images/hair-1600.webp';
import nails800 from '../assets/images/nails-800.webp';
import nails1600 from '../assets/images/nails-1600.webp';

export interface ResponsiveImage {
  src: string;
  srcSet: string;
  alt: string;
}

const img = (small: string, large: string, alt: string): ResponsiveImage => ({ src: small, srcSet: `${small} 800w, ${large} 1600w`, alt });

export const IMAGES = {
  about: img(about800, about1600, 'A calm salon lounge with soft chairs and warm lighting'),
  booking: img(booking800, booking1600, ''),
  hero: img(hero800, hero1600, 'A bright salon interior with a chandelier and styling stations'),
  reviews: img(reviews800, reviews1600, ''),
  facial: img(facial800, facial1600, 'A client relaxing during a facial treatment'),
  hair: img(hair800, hair1600, 'A stylist styling a client’s hair'),
  nails: img(nails800, nails1600, 'A manicure in progress at the nail spa'),
};

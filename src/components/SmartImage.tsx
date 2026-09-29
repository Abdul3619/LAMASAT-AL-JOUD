import { useState, type ImgHTMLAttributes } from 'react';
import type { ResponsiveImage } from '../data/images';

// An image that shows a shimmer skeleton until it has loaded, lazy-loads by default and picks a
// size from srcSet. Pass eager for images visible on first paint (the hero).
interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> {
  image: ResponsiveImage;
  sizes?: string;
  eager?: boolean;
  decorative?: boolean;
  wrapperClassName?: string;
}

export default function SmartImage({ image, sizes = '(min-width: 768px) 50vw, 100vw', eager, decorative, wrapperClassName = '', className = '', ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`${loaded ? '' : 'skeleton'} ${wrapperClassName}`}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        alt={decorative ? '' : image.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(el) => { if (el?.complete && el.naturalWidth > 0 && !loaded) setLoaded(true); }}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...rest}
      />
    </div>
  );
}

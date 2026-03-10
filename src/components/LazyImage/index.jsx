import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, className, style, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before the image enters the viewport
      }
    );

    observer.observe(imgElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // useLayoutEffect runs synchronously after DOM commits, before the browser paints.
  // This reliably catches cached images where onLoad may never fire because the
  // browser resolves the image from cache before React can attach the event handler.
  useLayoutEffect(() => {
    if (isInView && imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [isInView, src]);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
      onLoad={() => setIsLoaded(true)}
      onError={() => setIsLoaded(true)}
      {...props}
    />
  );
};

export default LazyImage;

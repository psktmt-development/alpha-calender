import { useEffect, useState } from 'react';

/**
 * Preloads all images and caches them in browser memory
 * Returns loading state and preloaded image map
 */
const useImagePreloader = (imageSources) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (!imageSources || imageSources.length === 0) {
      setImagesPreloaded(true);
      return;
    }

    const imagePromises = imageSources.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve({ src, status: 'loaded' });
        img.onerror = () => resolve({ src, status: 'error' });
      });
    });

    Promise.all(imagePromises).then((results) => {
      const loaded = {};
      results.forEach(({ src, status }) => {
        loaded[src] = status === 'loaded';
      });
      setLoadedImages(loaded);
      setImagesPreloaded(true);
    });
  }, [imageSources]);

  return { imagesPreloaded, loadedImages };
};

/**
 * Immediately preloads images into browser cache on module load
 * This runs before React even mounts for maximum speed
 */
export const preloadImages = (imageSources) => {
  imageSources.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Preload images using fetch for better caching control
 */
export const preloadImagesWithFetch = async (imageSources) => {
  const promises = imageSources.map(async (src) => {
    try {
      const response = await fetch(src, { mode: 'no-cors' });
      return { src, success: true };
    } catch {
      return { src, success: false };
    }
  });
  return Promise.all(promises);
};

export default useImagePreloader;

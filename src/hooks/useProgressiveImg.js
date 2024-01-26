import { useState, useEffect } from 'react';

const useProgressiveImage = (highResSrc) => {
  const deriveLowResSrc = (src) => {
    if (typeof src === 'string') {
      return src.replace(/([^/]+)(?=\.\w+$)/, 'tiny-$1');
    } else if (src && src.default) {
      const path = src.default;
      return path.replace(/([^/]+)(?=\.\w+$)/, 'tiny-$1');
    }
    return src;
  };

  const lowResSrc = deriveLowResSrc(highResSrc);
  const [src, setSrc] = useState(lowResSrc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const highResImagePath = (typeof highResSrc === 'object' && highResSrc.default) ? highResSrc.default : highResSrc;
    const img = new Image();
    img.src = highResImagePath;
    img.onload = () => {
      setSrc(highResImagePath);
      setLoading(false);
    };
  }, [highResSrc]);

  return [src, loading];
};

export default useProgressiveImage;

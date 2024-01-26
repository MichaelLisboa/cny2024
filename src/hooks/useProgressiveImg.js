import { useState, useEffect } from 'react';

export default function useProgressiveImg(highResSrc) {
  const deriveLowResSrc = (src) => 
    typeof src === 'string' || (src && src.default)
      ? (src.default || src).replace(/([^/]+)(?=\.\w+$)/, 'tiny-$1')
      : src;

  const lowResSrc = deriveLowResSrc(highResSrc);
  const [src, setSrc] = useState(lowResSrc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = typeof highResSrc === 'object' && highResSrc.default ? highResSrc.default : highResSrc;
    img.onload = () => {
      setSrc(img.src);
      setLoading(false);
    };
  }, [highResSrc]);

  return [src, loading];
};


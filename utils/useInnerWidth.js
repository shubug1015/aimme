import { useEffect, useState } from 'react';

export const useInnerWidth = () => {
  const [innerWidth, setInnerWidth] = useState({
    innerWidth: 0,
  });
  const handleResize = () => {
    setInnerWidth({
      innerWidth: window.innerWidth,
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  return innerWidth;
};

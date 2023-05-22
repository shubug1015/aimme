import { useEffect, useState } from 'react';

export function cls(...classnames) {
  return classnames.join(' ');
}

export function comma(text) {
  return text.join(', ');
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function conditionalStyle(condition, style1, style2) {
  if (condition) {
    return style1;
  }
  if (!condition) {
    return style2;
  }
}

export function filterPriceFluctuationFactorImage(type) {
  switch (type) {
    case 'Purchase History':
      return '1';
    case "Artist's Career":
      return '2';
    case 'Reinstatement History':
      return '3';
    case 'Exhibition History':
      return '4';
    case 'Literary Reference':
      return '5';
    case "Market's Atmosphere":
      return '6';
    case 'Appraisal History':
      return '7';
    case 'Provenance History':
      return '8';
    case 'Price Fluctuation of Similar Works':
      return '9';
    case 'Frequency of Auction Participation':
      return '10';
    default:
      '0';
  }
}

export function filterMajorDealImage(type) {
  switch (type) {
    case 'Oil':
      return '1';
    case 'Water':
      return '2';
    case 'Acrylic':
      return '3';
    case 'Pen':
      return '4';
    case 'Mixed':
      return '5';
    case 'Bronze':
      return '6';
    case 'Steel':
      return '7';
    case 'Print':
      return '8';
    case 'Paper':
      return '9';
    case 'Wood':
      return '10';
    case 'Ceramic':
      return '11';
    case 'Photo':
      return '12';
    case 'Ready':
      return '13';
    default:
      '0';
  }
}

// scroll direction 가져오는 함수
export const useScrollDir = () => {
  const [scrollDir, setScrollDir] = useState('top');
  const [flag, setFlag] = useState(0);
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let test = flag;
    const updateScrollDir = () => {
      if (test === 0) {
        setFlag(1);
      }
      const scrollY = window.pageYOffset;
      setScrollDir(
        window.scrollY === 0
          ? 'top'
          : scrollY > lastScrollY
          ? 'scroll down'
          : 'scroll up'
      );
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDir);
    return () => window.removeEventListener('scroll', updateScrollDir);
  }, [scrollDir]);
  return { scrollDir, flag };
};

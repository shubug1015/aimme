module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: {
        50: '#9a9a9a',
        100: '#8f8f8f',
        200: '#454545',
        300: '#444444',
        400: '#333333',
        900: '#000000',
      },
      white: '#ffffff',
      beige: {
        100: '#fffcf8',
        200: '#fbf7f1',
        300: '#ede6db',
        400: '#cec5b7',
      },
      navy: {
        400: '#0c435b',
      },
      pink: '#ff7979',
      filterBorder: '#ede9e2',
      brown: '#ab7b6d',
    },
    fontFamily: {
      sans: ['Helvetica', 'sans-serif'],
      serif: ['"EB Garamond"', 'serif'],
    },
    extend: {
      spacing: {
        0.88: '0.22rem',
        18: '4.5rem',
        22: '5.5rem',
        38: '9.5rem',
        42: '10.5rem',
        46: '11.5rem',
        50: '12.5rem',
        54: '13.5rem',
        120: '30rem',
        144: '36rem',
        288: '72rem',
        368: '92rem',
      },
      rotate: {
        18: '18deg',
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: 0.7 },
          '50%': { opacity: 0.2 },
          '100%': { opacity: 0.7 },
        },
      },
      animation: {
        twinkle: 'twinkle 1s ease-in-out infinite',
      },
    },

    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};

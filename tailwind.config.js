module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'md': [{ 'min': '100px', 'max': '850px'}],
        'lg': [{ 'min': '851px'}],
        'sm': [{ 'max': '400px' }],
      },
      colors: {
        rebel: '#F71963',
        blue: '#142032',
        gray: '#A1A8B3',
        lightGray: '#E7E9EE',
        lightBlue: '#222C44',
      },
      animation: {
        upwards: 'upwards 0.5s ease-in forwards'
      },
      keyframes: {
        upwards: {
          '0%': { transform: 'translateY(0)', opacity: 0.5 },
          '100%': { transform: 'translateY(-20px)', opacity: 1 }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minWidth: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    maxWidth: {
      sm: '480px',
      md: '768px',
      lg: '600px',
      xl: '1440px',
      '580': '580px',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#eee',
      'dark': '#333333',
      'red': '#ff3f46',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'indigo': "#0f172a",
      "black": "#000"
    },
    fontFamily: {
      serif: ['Merriweather', 'serif'],
      default: ['Kanit']
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      width: {
        '480': '480px',
        '600': '600px',
      },
    }
  },
  plugins: [],
}
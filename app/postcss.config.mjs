const config = {
  plugins: {
    '@tailwindcss/postcss': {}
  },
  theme: {
    extend: {
      fontFamily: {
        lato: ['var(--font-lato)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        primary: '#3B82F6',
      },
    },
  },
}
export default config

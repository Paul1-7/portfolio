/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/js/*.js', './index.html'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      colors: {
        dark: '#282828',
        'card-dark': '#2E2E2E'
      },
      backgroundImage: {
        btn: 'linear-gradient(45deg,#d42b56,#ef9070,#b3287e);',
        'btn-hover':
          'linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);',
        'text-color': 'linear-gradient(45deg,#d42b56,#ef9070,#b3287e);'
        // 'background-light': 'url(./assets/svg/background-light.svg)',
        // 'background-dark': 'url(./assets/svg/background-dark.svg)'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
}

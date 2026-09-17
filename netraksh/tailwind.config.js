/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#060B14',
          900: '#0A1120',
          850: '#0D1628',
          800: '#111D33',
          700: '#182640',
          600: '#233252',
          500: '#354a72',
        },
        signal: {
          amber: '#F5A623',
          red: '#E5484D',
          green: '#2FBF71',
          cyan: '#22D3EE',
          blue: '#3B82F6',
        },
        ink: {
          100: '#EAF0FB',
          300: '#B7C4DE',
          500: '#7C8BAA',
        }
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,0.15), 0 0 24px rgba(34,211,238,0.12)',
        amberglow: '0 0 0 1px rgba(245,166,35,0.2), 0 0 24px rgba(245,166,35,0.15)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

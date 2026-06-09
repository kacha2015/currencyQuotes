import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(59,130,246,.25), transparent 50%), linear-gradient(180deg, #0f172a 0%, #020617 100%)',
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(0, 194, 255, 0.2), 0 20px 80px rgba(0, 194, 255, 0.12)'
      }
    }
  }
};

export default config;

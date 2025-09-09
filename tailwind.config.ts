import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './common/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {},
      fontSize: {},
      backgroundColor: {},
      textColor: {},
      fontFamily: {
        pretendard: 'var(--font-pretendard)',
      },
    },
  },
};

export default config;

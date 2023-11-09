/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "night", "fantasy"
      // {myTheme: {
      //   "primary": "#a991f7",
      //   "secondary": "#f6d860",
      //   "accent": "#37cdbe",
      //   "neutral": "#3d4451",
      //   "base-100": "#ffffff",
      // }}
    ]
  },
  darkMode: 'class',
}

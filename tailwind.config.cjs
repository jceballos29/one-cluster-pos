/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#3730a3',

					secondary: '#e879f9',

					accent: '#0ea5e9',

					neutral: '#dbeafe',

					'base-100': '#ccfbf1',

					info: '#67e8f9',

					success: '#4ade80',

					warning: '#fde047',

					error: '#e11d48',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};

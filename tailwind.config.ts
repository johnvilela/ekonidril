import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
const { nextui } = require('@nextui-org/react');

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				indigo: {
					extend: 'dark', // <- inherit default values from dark theme
					colors: {
						background: colors.zinc[900],
						foreground: colors.white,
						primary: {
							...colors.indigo,
							DEFAULT: colors.indigo[500],
							foreground: colors.indigo[50],
						},
						secondary: {
							...colors.orange,
							DEFAULT: colors.orange[500],
							foreground: colors.orange[50],
						},
						focus: colors.indigo[500],
					},
				},
			},
		}),
	],
};
export default config;

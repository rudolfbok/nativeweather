/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset';

module.exports = {
	darkMode: 'class',
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/**/*.{js,jsx,ts,tsx}'],
	presets: [nativewindPreset],
	theme: {
		extend: {
			colors: {
				systemBackground: '#FFFFFF',
				secondarySystemBackground: '#F2F2F7',
				secondarySystemBackground_dark: '#1C1C1E',
				tertiarySystemBackground: '#E3E3E8',
				tertiarySystemBackground_dark: '#2C2C2E',
				label: '#000000',
				label_dark: '#FFFFFF',
				secondaryLabel: '#6D6D72',
				secondaryLabel_dark: '#A9A9B0',
				systemBackground_dark: '#000000',
				primaryblue: '#007AFF',
				good: '#4FF0E6',
				fair: '#009900',
				moderate: '#FFC100',
				sensitive: '#FF6F00',
				unhealthy: '#FF0000',
				veryunhealthy: '#990099',
				hazardous: '#84212F',
				// tertiaryLabel: "#8E8E93",
				// tertiaryLabel_dark: "#636366",
			},
		},
	},
	plugins: [],
};

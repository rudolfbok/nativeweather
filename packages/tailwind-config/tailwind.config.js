/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			screens: {
				xs: '321px',
			},
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
			},
			borderRadius: {
				'4xl': '28px',
			},
		},
	},
};

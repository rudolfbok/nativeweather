const nativewindPreset = require('@nativeweather/tailwind-config');

module.exports = {
	darkMode: 'class',
	content: {
		relative: true,
		files: [
			'./app/**/*.{js,jsx,ts,tsx}',
			'../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
			'../../packages/core/src/**/*.{js,jsx,ts,tsx}',
		],
	},
	presets: [nativewindPreset],
	plugins: [],
};

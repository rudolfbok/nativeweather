const nativewindPreset = require('@nativeweather/tailwind-config');

module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./app/**/*.{js,jsx,ts,tsx}',
		'../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
		'../../packages/core/src/**/*.{js,jsx,ts,tsx}',
	],
	presets: [nativewindPreset],
	plugins: [],
};

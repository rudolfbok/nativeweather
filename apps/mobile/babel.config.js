module.exports = function (api) {
	// api.cache(true);
	const isProduction = api.env('production');

	return {
		presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
		plugins: [
			...(isProduction ? [['transform-remove-console', { exclude: ['error'] }]] : []),
			'react-native-worklets/plugin',
		],
	};
};

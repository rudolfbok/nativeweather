const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver.unstable_conditionsByPlatform = {
	...config.resolver.unstable_conditionsByPlatform,
	ios: [...config.resolver.unstable_conditionsByPlatform.ios, 'ios'],
	android: [...config.resolver.unstable_conditionsByPlatform.android, 'android'],
};

module.exports = withNativeWind(config, { input: './global.css' });

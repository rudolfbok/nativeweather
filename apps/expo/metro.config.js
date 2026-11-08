const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

// Exports maps are resolved without the 'production' condition, so @tolgee/web would ship its development build
// (devtools and in-context plugins, ~1 MB) in the web export.
if (process.env.NODE_ENV === 'production') {
	const { web = [] } = config.resolver.unstable_conditionsByPlatform;
	config.resolver.unstable_conditionsByPlatform = {
		...config.resolver.unstable_conditionsByPlatform,
		web: [...web, 'production'],
	};
}

module.exports = withUniwindConfig(config, {
	cssEntryFile: './src/global.css',
	dtsFile: './src/uniwind-types.d.ts',
});

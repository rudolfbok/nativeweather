const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/dist/metro');

const workspaceRoot = path.resolve(__dirname, '../..');
const sharedPackages = ['ui', 'core', 'api', 'types'].map((name) => ({
	name: `@nativeweather/${name}`,
	sourceRoot: path.join(workspaceRoot, 'packages', name, 'src'),
}));

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = mergeConfig(getDefaultConfig(__dirname), {
	watchFolders: [workspaceRoot],
	resolver: {
		disableHierarchicalLookup: true,
		nodeModulesPaths: [path.resolve(__dirname, 'node_modules'), path.resolve(workspaceRoot, 'node_modules')],
		resolveRequest: (context, moduleName, platform) => {
			// Resolve shared source with Metro so .macos/.native variants remain eligible.
			const sharedPackage = sharedPackages.find(
				(pkg) => moduleName === pkg.name || moduleName.startsWith(`${pkg.name}/`)
			);
			if (sharedPackage) {
				const subpath = moduleName === sharedPackage.name ? 'index' : moduleName.slice(sharedPackage.name.length + 1);
				return context.resolveRequest(context, path.join(sharedPackage.sourceRoot, subpath), platform);
			}

			if (platform === 'macos' && moduleName === 'expo-image') {
				return {
					filePath: path.resolve(__dirname, 'stubs/expo-image.js'),
					type: 'sourceFile',
				};
			}

			if (platform === 'macos' && moduleName === 'react-native-worklets') {
				return {
					filePath: path.resolve(__dirname, 'stubs/react-native-worklets.js'),
					type: 'sourceFile',
				};
			}

			return context.resolveRequest(context, moduleName, platform);
		},
		extraNodeModules: {
			react: path.resolve(__dirname, 'node_modules/react'),
			'react-native': path.resolve(__dirname, 'node_modules/react-native'),
		},
	},
});

// withNativeWind takes your config and the path to your CSS entry point
module.exports = withNativeWind(config, { input: './globals.css' });

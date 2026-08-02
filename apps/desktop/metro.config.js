const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/dist/metro');

const workspaceRoot = path.resolve(__dirname, '../..');

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

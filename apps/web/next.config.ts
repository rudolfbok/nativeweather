import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	allowedDevOrigins: ['172.20.10.5'],
	transpilePackages: [
		'react-native',
		'react-native-web',
		'react-native-css-interop',
		'react-native-mmkv',
		'react-native-nitro-modules',
		'react-native-worklets',
		'react-native-svg',
		'nativewind',
		'burnt',
		'expo-modules-core',
		'app',
	],
	compiler: {
		define: {
			__DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
		},
		removeConsole: {
			exclude: ['error'],
		},
	},
	reactStrictMode: false, // reanimated doesn't support this on web
	turbopack: {
		root: path.resolve(__dirname, '../..'),
		resolveAlias: {
			'react-native': 'react-native-web',
		},
		resolveExtensions: ['.web.ts', '.web.tsx', '.web.js', '.web.jsx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
	},
	webpack: (config, { isServer }) => {
		// Only for the client (browser) bundle
		if (!isServer) {
			// config.plugins.push(
			// 	new webpack.DefinePlugin({
			// 		global: 'window', // <-- this makes "global" point to window
			// 	})
			// );
		}
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			app: '../../packages/app',
			// "react-native-mmkv": false,
			'react-native$': require.resolve('react-native-web'),
		};
		config.resolve.extensions = ['.web.ts', '.web.tsx', '.web.js', ...config.resolve.extensions];
		return config;
	},
};

export default nextConfig;

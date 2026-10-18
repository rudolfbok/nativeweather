import { resolve } from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	allowedDevOrigins: ['172.20.10.5'],
	turbopack: {
		root: resolve(__dirname, '../..'),
		resolveAlias: {
			'react-native': 'react-native-web',
		},
		resolveExtensions: [
			'.web.ts',
			'.web.tsx',
			'.web.js',
			'.tsx',
			'.ts',
			'.jsx',
			'.js',
			'.mjs',
			'.json',
			'.node',
		],
	},
	transpilePackages: [
		'react-native',
		'react-native-web',
		'react-native-chart-kit',
		'react-native-css-interop',
		'react-native-mmkv',
		'react-native-nitro-modules',
		'react-native-safe-area-context',
		'react-native-worklets',
		'react-native-svg',
		'nativewind',
		'sonner',
		'expo-modules-core',
		'@nativeweather/ui',
		'@nativeweather/core',
		'@nativeweather/api',
		'@nativeweather/types',
	],
	compiler: {
		define: {
			__DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
		},
		removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
	},
	reactStrictMode: false, // reanimated doesn't support this on web
};

export default nextConfig;

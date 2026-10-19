import { createRequire } from 'node:module';
import { dirname, relative, resolve } from 'node:path';
import type { NextConfig } from 'next';

const webRequire = createRequire(resolve(__dirname, 'package.json'));
const workspaceRoot = resolve(__dirname, '../..');
const webPackage = (name: string) =>
	`./${relative(__dirname, dirname(webRequire.resolve(`${name}/package.json`)))}`;

const nextConfig: NextConfig = {
	allowedDevOrigins: ['172.20.10.5'],
	turbopack: {
		root: workspaceRoot,
		resolveAlias: {
			// Shared packages must use the web app's versions in the hoisted workspace.
			react: webPackage('react'),
			'react/*': `${webPackage('react')}/*`,
			'react-dom': webPackage('react-dom'),
			'react-dom/*': `${webPackage('react-dom')}/*`,
			'react-native-svg': webPackage('react-native-svg'),
			'react-native-svg/*': `${webPackage('react-native-svg')}/*`,
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

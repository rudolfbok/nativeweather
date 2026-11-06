import { buildSlug } from '@/core';
import type { NormalizedData } from '@nativeweather/types';
import { Platform, Share } from 'react-native';

/** Opens the system share sheet with the public link of a city's weather page. */
export const shareWeather = async (location: NormalizedData['location']) => {
	const url = new URL(buildSlug(location), 'https://nativeweather.app').href;

	try {
		await Share.share(Platform.OS === 'ios' ? { url } : { message: url });
	} catch (error) {
		console.error('Error sharing:', error);
	}
};

import type { NormalizedData } from '@nativeweather/types/normalizedData';
import { Platform, Share } from 'react-native';
import { buildSlug } from '@nativeweather/core/utils/weatherSlug';

export const shareLink = async (weatherData: NormalizedData) => {
	const url = new URL(buildSlug(weatherData), 'https://nativeweather.app').href;

	try {
		await Share.share(Platform.OS === 'ios' ? { url } : { message: url });
	} catch (error) {
		console.error('Error sharing:', error);
	}
};

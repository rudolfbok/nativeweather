import { NormalizedData } from '@nativeweather/types/normalizedData';
import { Share } from 'react-native';
import { buildSlug } from './weatherSlug';

export const shareLink = async (weatherData: NormalizedData) => {
	const url = `https://nativeweather.app/${buildSlug(weatherData)}`;

	try {
		await Share.share({
			url, // misto message
			title: `Weather in ${weatherData.location.name}`,
		});
	} catch (error) {
		console.error('Error sharing:', error);
	}
};

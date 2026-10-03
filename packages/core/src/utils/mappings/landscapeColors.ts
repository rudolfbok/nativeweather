import { getWeatherCondition } from '@nativeweather/core/constants/weatherConditions';

const colors = {
	clear: ['#49AADF', '#1A3861'],
	partclouds: ['#54A0C9', '#224067'],
	cloudy: ['#54A0C9', '#224067'],
	overcast: ['#7695A7', '#364E63'],
	fog: ['#92B1BF', '#3D5C71'],
	rain: ['#567D99', '#283F58'],
	snow: ['#81BCD9', '#263B58'],
	thunder: ['#43607F', '#1D314E'],
} as const;

export const weatherLandscapeBg = ({ isDay, code }: { isDay: 0 | 1; code: number | null }) => {
	const family = getWeatherCondition(code)?.landscape;
	if (!family) return isDay === 1 ? '#6B7280' : '#374151';
	return colors[family][isDay === 1 ? 0 : 1];
};

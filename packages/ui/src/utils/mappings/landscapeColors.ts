import type { LandscapeKey } from '@nativeweather/core';

// [day, night] sky colours behind each landscape illustration.
const landscapeColors: Record<LandscapeKey, [string, string]> = {
	clear: ['#49AADF', '#1A3861'],
	partclouds: ['#54A0C9', '#224067'],
	cloudy: ['#54A0C9', '#224067'],
	overcast: ['#7695A7', '#364E63'],
	fog: ['#92B1BF', '#3D5C71'],
	rain: ['#567D99', '#283F58'],
	snow: ['#81BCD9', '#263B58'],
	thunder: ['#43607F', '#1D314E'],
};

const fallback: [string, string] = ['#6B7280', '#374151'];

export const getLandscapeColor = (key: LandscapeKey | null, isDay: 0 | 1) =>
	(key ? landscapeColors[key] : fallback)[isDay === 1 ? 0 : 1];

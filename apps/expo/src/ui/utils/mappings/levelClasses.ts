import type { AirQualityLevel } from '@/core';

// Full class names so the Tailwind scanner picks them up. Important, because `Text` sets `text-label` and equal-specificity utilities are ordered alphabetically.
export const levelTextClass: Record<AirQualityLevel, string> = {
	good: 'text-good!',
	fair: 'text-fair!',
	moderate: 'text-moderate!',
	sensitive: 'text-sensitive!',
	unhealthy: 'text-unhealthy!',
	'very-unhealthy': 'text-very-unhealthy!',
	hazardous: 'text-hazardous!',
};

export const levelBgClass: Record<AirQualityLevel, string> = {
	good: 'bg-good',
	fair: 'bg-fair',
	moderate: 'bg-moderate',
	sensitive: 'bg-sensitive',
	unhealthy: 'bg-unhealthy',
	'very-unhealthy': 'bg-very-unhealthy',
	hazardous: 'bg-hazardous',
};

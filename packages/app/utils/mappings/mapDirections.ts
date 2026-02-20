import { useTranslate } from '@tolgee/react';

export const getDirection = (angle: number | null, type: 'short' | 'long') => {
	const { t } = useTranslate('weather');

	const DIRECTIONS = [
		t(`wind.label.${type}.N`),
		t(`wind.label.${type}.NNE`),
		t(`wind.label.${type}.NE`),
		t(`wind.label.${type}.ENE`),
		t(`wind.label.${type}.E`),
		t(`wind.label.${type}.ESE`),
		t(`wind.label.${type}.SE`),
		t(`wind.label.${type}.SSE`),
		t(`wind.label.${type}.S`),
		t(`wind.label.${type}.SSW`),
		t(`wind.label.${type}.SW`),
		t(`wind.label.${type}.WSW`),
		t(`wind.label.${type}.W`),
		t(`wind.label.${type}.WNW`),
		t(`wind.label.${type}.NW`),
		t(`wind.label.${type}.NNW`),
	] as const;

	if (angle === null) return null;

	const index = Math.round(angle / 22.5) % 16;
	return DIRECTIONS[index];
};

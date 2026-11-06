import { useStorageString, useWeather } from '@/core';
import { useTolgee, useTranslate } from '@tolgee/react';
import type { MetricContext } from './types';

export const useMetricContext = (): MetricContext | null => {
	const { t } = useTranslate('weather');
	const language = useTolgee(['language']).getLanguage() ?? 'en-US';
	const weather = useWeather((state) => state.weatherData);
	const [currentUnits] = useStorageString('currentUnits');
	const [currentTemp] = useStorageString('currentTemp');

	return weather ? { weather, t, isMetric: currentUnits === 'metric', currentTemp, language } : null;
};

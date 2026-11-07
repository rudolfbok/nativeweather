import { buildAirQualityWidgetSnapshot, buildLocalWidgetSnapshot, useLocalWeather, useStorageString } from '@/core';
import type { AirQualityLevel } from '@/core';
import { getLandscapeColor } from '@/ui/utils/mappings/landscapeColors';
import { getWeatherIconUri } from '@/ui/utils/mappings/weatherIconAssets';
import { useTranslate } from '@tolgee/react';
import { useEffect } from 'react';
import { useCSSVariable } from 'uniwind';

const levels: AirQualityLevel[] = ['good', 'fair', 'moderate', 'sensitive', 'unhealthy', 'very-unhealthy', 'hazardous'];
const levelVariables = levels.map((level) => `--color-${level}`);

/** Pushes the local weather and air quality to the four home-screen widgets. Mount once. */
export const useWidgets = () => {
	const { t } = useTranslate('weather');
	const weather = useLocalWeather((state) => state.weatherData);
	const airQuality = useLocalWeather((state) => state.airQualityData);
	const [currentTemp] = useStorageString('currentTemp');
	const [currentAQI] = useStorageString('currentAQI');
	const colors = useCSSVariable(levelVariables) as string[];

	useEffect(() => {
		if (!weather) return;
		let cancelled = false;
		const local = buildLocalWidgetSnapshot(weather, { currentTemp, currentAQI });
		const bgColor = getLandscapeColor(local.landscape, local.isDay);

		const update = async () => {
			const imagePath = await getWeatherIconUri(local.code, local.isDay);
			const [{ default: SmallLocal }, { default: MediumLocal }] = await Promise.all([
				import('@/ui/components/widgets/SmallLocal'),
				import('@/ui/components/widgets/MediumLocal'),
			]);
			if (cancelled) return;
			SmallLocal.updateSnapshot({
				location: local.city,
				temperature: local.temperature,
				minTemperature: local.minTemperature,
				maxTemperature: local.maxTemperature,
				imagePath,
				bgColor,
			});
			MediumLocal.updateSnapshot({
				city: local.city,
				region: local.region,
				temperature: local.temperature,
				minTemperature: local.minTemperature,
				maxTemperature: local.maxTemperature,
				condition: t(local.conditionKey),
				imagePath,
				bgColor,
			});
		};
		update().catch((error) => console.warn('Failed to update local weather widgets', error));

		return () => {
			cancelled = true;
		};
	}, [weather, currentTemp, currentAQI, t]);

	useEffect(() => {
		if (!weather || !airQuality) return;
		let cancelled = false;
		const local = buildLocalWidgetSnapshot(weather, { currentTemp, currentAQI });
		const bgColor = getLandscapeColor(local.landscape, local.isDay);
		const snapshot = buildAirQualityWidgetSnapshot(airQuality, { currentTemp, currentAQI });

		const update = async () => {
			const [{ default: SmallAQI }, { default: MediumAQI }] = await Promise.all([
				import('@/ui/components/widgets/SmallAQI'),
				import('@/ui/components/widgets/MediumAQI'),
			]);
			if (cancelled) return;
			SmallAQI.updateSnapshot({ aqi: snapshot.aqi, label: t('airquality.title'), bgColor });
			MediumAQI.updateSnapshot({
				city: local.city,
				region: local.region,
				pollutants: snapshot.pollutants.map(({ label, value, level }) => ({
					label,
					value,
					color: colors[levels.indexOf(level)],
				})),
				bgColor,
			});
		};
		update().catch((error) => console.warn('Failed to update air quality widgets', error));

		return () => {
			cancelled = true;
		};
	}, [weather, airQuality, currentTemp, currentAQI, colors, t]);
};

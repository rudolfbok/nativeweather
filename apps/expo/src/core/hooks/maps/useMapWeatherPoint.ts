import { fetchWeather } from '@nativeweather/api';
import type { NormalizedData } from '@nativeweather/types';
import { useEffect, useRef, useState } from 'react';
import type { WeatherMapLayer } from '../../constants/weatherMap';
import { useStorageString } from '../../database/useStorage';
import { formatTemperature } from '../../utils/formatting/formatTemperature';
import { selectUnit } from '../../utils/formatting/selectUnit';

export type MapWeatherPoint = {
	lngLat: [number, number];
	layer: WeatherMapLayer;
	status: 'loading' | 'ready' | 'error';
	value?: string;
	detail?: string;
	location?: string;
};

const formatWeatherPoint = (
	layer: WeatherMapLayer,
	{ current }: NormalizedData,
	currentTemp: string | undefined,
	currentUnits: string | undefined,
	gustLabel: string
) => {
	if (layer === 'precip') {
		return {
			value: selectUnit({
				metric: `${current.precipMm.toFixed(1)} mm`,
				imperial: `${current.precipIn.toFixed(2)} in`,
				currentUnits,
			}),
		};
	}

	if (layer === 'wind') {
		const speed = (kph: number, mph: number) =>
			selectUnit({ metric: `${Math.round(kph)} km/h`, imperial: `${Math.round(mph)} mph`, currentUnits });
		const gust = `${gustLabel} ${speed(current.gustKph, current.gustMph)}`;

		return { value: speed(current.windKph, current.windMph), detail: `${current.windDir} - ${gust}` };
	}

	return {
		value: formatTemperature({ celsius: current.tempC, fahrenheit: current.tempF, currentTemp, includeUnit: true }),
	};
};

export const useMapWeatherPoint = (gustLabel: string) => {
	const [currentTemp] = useStorageString('currentTemp');
	const [currentUnits] = useStorageString('currentUnits');
	const [weatherPoint, setWeatherPoint] = useState<MapWeatherPoint | null>(null);
	const requestRef = useRef(0);
	const abortRef = useRef<AbortController | null>(null);

	useEffect(() => () => abortRef.current?.abort(), []);

	const clearWeatherPoint = () => {
		requestRef.current += 1;
		abortRef.current?.abort();
		setWeatherPoint(null);
	};

	const requestWeatherPoint = async (lngLat: [number, number], layer: WeatherMapLayer) => {
		abortRef.current?.abort();
		const controller = new AbortController();
		const requestId = ++requestRef.current;
		abortRef.current = controller;
		setWeatherPoint({ lngLat, layer, status: 'loading' });

		const weather = await fetchWeather([lngLat[1], lngLat[0]].map((n) => n.toFixed(4)).join(','), {
			signal: controller.signal,
		});
		if (requestRef.current !== requestId) return;

		setWeatherPoint(
			weather
				? {
						lngLat,
						layer,
						status: 'ready',
						...formatWeatherPoint(layer, weather, currentTemp, currentUnits, gustLabel),
						location: weather.location.name,
					}
				: { lngLat, layer, status: 'error' }
		);
	};

	return { weatherPoint, requestWeatherPoint, clearWeatherPoint };
};

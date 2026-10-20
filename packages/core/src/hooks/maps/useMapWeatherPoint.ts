import { fetchWeatherAPI } from '@nativeweather/api/fetchWeatherAPI';
import { useStorageString } from '../../database/useStorage';
import { selectUnit } from '../../utils/formatting/selectUnit';
import { formatTemperature } from '../../utils/formatting/formatTemperature';
import { useEffect, useRef, useState } from 'react';
import type { WeatherMapLayer } from '../../constants/weatherMap';

type WeatherApiCurrent = {
	temp_c?: number;
	temp_f?: number;
	precip_mm?: number;
	precip_in?: number;
	wind_kph?: number;
	wind_mph?: number;
	gust_kph?: number;
	gust_mph?: number;
	wind_dir?: string;
};

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
	current: WeatherApiCurrent,
	currentTemp: string | undefined,
	currentUnits: string | undefined,
	gustLabel: string
) => {
	if (layer === 'precip') {
		if (current.precip_mm == null || current.precip_in == null) return null;

		return {
			value: selectUnit({
				metric: `${current.precip_mm.toFixed(1)} mm`,
				imperial: `${current.precip_in.toFixed(2)} in`,
				currentUnits,
			}),
		};
	}

	if (layer === 'wind') {
		if (current.wind_kph == null || current.wind_mph == null) return null;

		const value = selectUnit({
			metric: `${Math.round(current.wind_kph)} km/h`,
			imperial: `${Math.round(current.wind_mph)} mph`,
			currentUnits,
		});
		const gust =
			current.gust_kph == null || current.gust_mph == null
				? null
				: `${gustLabel} ${selectUnit({
						metric: `${Math.round(current.gust_kph)} km/h`,
						imperial: `${Math.round(current.gust_mph)} mph`,
						currentUnits,
					})}`;

		return { value, detail: [current.wind_dir, gust].filter(Boolean).join(' - ') };
	}

	if (current.temp_c == null || current.temp_f == null) return null;

	return {
		value: formatTemperature({
			celsius: current.temp_c,
			fahrenheit: current.temp_f,
			currentTemp,
			includeUnit: true,
		}),
	};
};

export const useMapWeatherPoint = (gustLabel: string) => {
	const [currentTemp] = useStorageString('currentTemp');
	const [currentUnits] = useStorageString('currentUnits');
	const [weatherPoint, setWeatherPoint] = useState<MapWeatherPoint | null>(null);
	const requestRef = useRef(0);
	const abortRef = useRef<AbortController | null>(null);

	useEffect(
		() => () => {
			abortRef.current?.abort();
		},
		[]
	);

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

		try {
			const lat = lngLat[1].toFixed(4);
			const lon = lngLat[0].toFixed(4);
			const weather = await fetchWeatherAPI(`${lat},${lon}`, { signal: controller.signal });
			const formatted = formatWeatherPoint(layer, weather?.current ?? {}, currentTemp, currentUnits, gustLabel);

			if (!formatted) throw new Error('Weather data not available');
			if (requestRef.current !== requestId) return;

			setWeatherPoint({
				lngLat,
				layer,
				status: 'ready',
				...formatted,
				location: weather?.location?.name,
			});
		} catch {
			if (controller.signal.aborted || requestRef.current !== requestId) return;
			setWeatherPoint({ lngLat, layer, status: 'error' });
		}
	};

	return { weatherPoint, requestWeatherPoint, clearWeatherPoint };
};

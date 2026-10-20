import { useMapConditions } from '@nativeweather/ui/hooks/conditions/useMapConditions';
import { useLocalWeather } from '@nativeweather/ui/hooks/weather/useLocalWeather';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { getWeatherIconUri } from '@nativeweather/ui/utils/mappings/weatherIconAssets';
import { weatherLandscapeBg } from '@nativeweather/core/utils/mappings/landscapeColors';
import { formatTemperature } from '@nativeweather/core/utils/formatting/formatTemperature';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
	NO2IndicatorColor,
	OzoneIndicatorColor,
	PM10IndicatorColor,
	PM25IndicatorColor,
} from '@nativeweather/core/utils/mappings/airQuality';

const isIOS = Platform.OS === 'ios';

const updateWidgetSnapshot = async (
	loadWidget: () => Promise<{ default: { updateSnapshot: (props: any) => void } }>,
	props: object,
	name: string
) => {
	try {
		const { default: widget } = await loadWidget();
		widget.updateSnapshot(props);
	} catch (error) {
		console.error(`Failed to update ${name} widget snapshot`, error);
	}
};

export const useWidgets = () => {
	const { localWeatherData, localAQIData } = useLocalWeather();
	const [currentTemp] = useStorageString('currentTemp');
	const [currentAQI] = useStorageString('currentAQI');
	const [imagePath, setImagePath] = useState<{ key: string; uri: string | null } | null>(null);
	const mapConditions = useMapConditions();
	const iconKey = localWeatherData
		? `${localWeatherData.current.isDay}:${localWeatherData.current.condition.code}`
		: '';
	const imagePathURI = imagePath?.key === iconKey ? imagePath.uri : null;

	const localTemp = localWeatherData
		? formatTemperature({
				celsius: localWeatherData.current.tempC,
				fahrenheit: localWeatherData.current.tempF,
				currentTemp,
			})
		: null;

	const localTempMin = localWeatherData
		? formatTemperature({
				celsius: localWeatherData.forecast.forecastday[0].day.minTempC,
				fahrenheit: localWeatherData.forecast.forecastday[0].day.minTempF,
				currentTemp,
			})
		: null;

	const localTempMax = localWeatherData
		? formatTemperature({
				celsius: localWeatherData.forecast.forecastday[0].day.maxTempC,
				fahrenheit: localWeatherData.forecast.forecastday[0].day.maxTempF,
				currentTemp,
			})
		: null;

	const feelsLikeTemperature = localWeatherData
		? formatTemperature({
				celsius: localWeatherData.current.feelsLikeC,
				fahrenheit: localWeatherData.current.feelsLikeF,
				currentTemp,
			})
		: null;

	const bgColor = localWeatherData
		? weatherLandscapeBg({
				isDay: localWeatherData.current.isDay,
				code: localWeatherData.current.condition.code,
			})
		: null;

	const condition = localWeatherData
		? mapConditions(localWeatherData.current.condition.code, localWeatherData.current.isDay)
		: null;

	useEffect(() => {
		if (!isIOS) return;
		if (!localWeatherData) return;

		let cancelled = false;
		getWeatherIconUri({
			isDay: localWeatherData.current.isDay,
			code: localWeatherData.current.condition.code,
		})
			.then((uri) => {
				if (!cancelled) setImagePath({ key: iconKey, uri });
			})
			.catch((error) => {
				if (cancelled) return;
				console.error('Failed to resolve widget weather icon URI', error);
				setImagePath({ key: iconKey, uri: null });
			});

		return () => {
			cancelled = true;
		};
	}, [iconKey, localWeatherData]);

	useEffect(() => {
		if (!isIOS || !localWeatherData || !imagePathURI || !bgColor || !condition) return;

		updateWidgetSnapshot(
			() => import('@nativeweather/ui/components/weather/widgets/MediumLocal'),
			{
				imagePath: imagePathURI,
				bgColor,
				city: localWeatherData.location.name,
				region: localWeatherData.location.region,
				temperature: localTemp,
				minTemperature: localTempMin,
				maxTemperature: localTempMax,
				feelsLikeTemperature,
				condition,
				isDay: localWeatherData.current.isDay,
				code: localWeatherData.current.condition.code,
			},
			'MediumLocal'
		);
	}, [localWeatherData, imagePathURI, localTemp, localTempMin, localTempMax, feelsLikeTemperature, bgColor, condition]);

	useEffect(() => {
		if (!isIOS || !localWeatherData || !localAQIData || !bgColor) return;

		updateWidgetSnapshot(
			() => import('@nativeweather/ui/components/weather/widgets/MediumAQI'),
			{
				PM25: localAQIData.current.pm2_5,
				PM25Indicator: PM25IndicatorColor(localAQIData.current.pm2_5),
				PM10: localAQIData.current.pm10,
				PM10Indicator: PM10IndicatorColor(localAQIData.current.pm10),
				NO2: localAQIData.current.nitrogen_dioxide,
				NO2Indicator: NO2IndicatorColor(localAQIData.current.nitrogen_dioxide),
				O3: localAQIData.current.ozone,
				O3Indicator: OzoneIndicatorColor(localAQIData.current.ozone),
				city: localWeatherData.location.name,
				region: localWeatherData.location.region,
				bgColor,
			},
			'MediumAQI'
		);
	}, [localWeatherData, localAQIData, bgColor]);

	useEffect(() => {
		if (!isIOS || !localWeatherData || !imagePathURI || !bgColor) return;

		updateWidgetSnapshot(
			() => import('@nativeweather/ui/components/weather/widgets/SmallLocal'),
			{
				temp: localTemp,
				imagePath: imagePathURI,
				minTemperature: localTempMin,
				maxTemperature: localTempMax,
				bgColor,
				location: localWeatherData.location.name,
			},
			'SmallLocal'
		);
	}, [localWeatherData, imagePathURI, localTemp, localTempMin, localTempMax, bgColor]);

	useEffect(() => {
		if (!isIOS || !localWeatherData || !localAQIData || !bgColor) return;

		const currentAQISelected = currentAQI === 'EU' ? localAQIData.current.european_aqi : localAQIData.current.us_aqi;

		updateWidgetSnapshot(
			() => import('@nativeweather/ui/components/weather/widgets/SmallAQI'),
			{
				AQI: currentAQISelected,
				bgColor,
			},
			'SmallAQI'
		);
	}, [localWeatherData, localAQIData, currentAQI, bgColor]);
};

import { useMapConditions } from 'app/hooks/conditions/useMapConditions';
import { useLocalWeather } from 'app/hooks/weather/useLocalWeather';
import { useStorageString } from 'app/storage/useStorage';
import { getWeatherIconUri } from 'app/utils/getWeatherIconUri';
import { weatherLandscapeBg } from 'app/utils/mappings/mapBgLandscapes';
import { switchTemp } from 'app/utils/switch/switchTemp';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
	NO2IndicatorColor,
	OzoneIndicatorColor,
	PM10IndicatorColor,
	PM25IndicatorColor,
} from 'app/utils/mappings/mapAQIDots';

export const useWidgets = () => {
	const { localWeatherData, localAQIData } = useLocalWeather();
	const [currentTemp] = useStorageString('currentTemp');
	const [currentSource] = useStorageString('currentSource');
	const [currentAQI] = useStorageString('currentAQI');
	const [imagePathURI, setImagePathURI] = useState<string | null>(null);
	const mapConditions = useMapConditions();
	const isIOS = Platform.OS === 'ios';

	const localTemp = switchTemp({
		celsius: localWeatherData?.current.tempC,
		fahrenheit: localWeatherData?.current.tempF,
		currentTemp,
	});

	const localTempMin = switchTemp({
		celsius: localWeatherData?.forecast.forecastday[0].day.minTempC,
		fahrenheit: localWeatherData?.forecast.forecastday[0].day.minTempF,
		currentTemp,
	});

	const localTempMax = switchTemp({
		celsius: localWeatherData?.forecast.forecastday[0].day.maxTempC,
		fahrenheit: localWeatherData?.forecast.forecastday[0].day.maxTempF,
		currentTemp,
	});

	const feelsLikeTemperature = switchTemp({
		celsius: localWeatherData?.current.feelsLikeC,
		fahrenheit: localWeatherData?.current.feelsLikeF,
		currentTemp,
	});

	const bgColor = localWeatherData
		? weatherLandscapeBg({
				isDay: localWeatherData.current.isDay,
				code: localWeatherData.current.condition.code,
			})
		: null;

	const condition = localWeatherData
		? mapConditions(localWeatherData.current.condition.code, localWeatherData.current.isDay, currentSource)
		: null;

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

	useEffect(() => {
		if (!isIOS) return;
		if (!localWeatherData) {
			setImagePathURI(null);
			return;
		}

		void getWeatherIconUri({
			isDay: localWeatherData.current.isDay,
			code: localWeatherData.current.condition.code,
		})
			.then(setImagePathURI)
			.catch((error) => {
				console.error('Failed to resolve widget weather icon URI', error);
				setImagePathURI(null);
			});
	}, [localWeatherData?.current.isDay, localWeatherData?.current.condition.code]);

	useEffect(() => {
		if (!isIOS || !localWeatherData || !imagePathURI || !bgColor || !condition) return;

		void updateWidgetSnapshot(
			() => import('app/components/weather/widgets/MediumLocal'),
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
				currentSource,
			},
			'MediumLocal'
		);
	}, [
		localWeatherData,
		imagePathURI,
		localTemp,
		localTempMin,
		localTempMax,
		feelsLikeTemperature,
		currentSource,
		mapConditions,
	]);

	useEffect(() => {
		if (!isIOS || !localWeatherData || !localAQIData || !bgColor) return;

		void updateWidgetSnapshot(
			() => import('app/components/weather/widgets/MediumAQI'),
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

		void updateWidgetSnapshot(
			() => import('app/components/weather/widgets/SmallLocal'),
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

		void updateWidgetSnapshot(
			() => import('app/components/weather/widgets/SmallAQI'),
			{
				AQI: currentAQISelected,
				bgColor,
			},
			'SmallAQI'
		);
	}, [localWeatherData, localAQIData, currentAQI, bgColor]);
};

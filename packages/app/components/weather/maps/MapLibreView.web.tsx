import { useTranslate } from '@tolgee/react';
import { fetchWeatherAPI } from 'app/api/fetchWeatherAPI';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';
import { CloudsIcon } from 'app/components/icons/CloudsIcon';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useMapLayer } from 'app/hooks/useMapLayer';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { CloudRain, InfoIcon, Thermometer, Wind, X } from 'lucide-react-native';
import maplibregl, { type Map as MapLibreMap, type MapMouseEvent } from 'maplibre-gl';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, GestureResponderEvent, Pressable, View } from 'react-native';
import { PrecipitationInfo, TemperatureInfo, WindInfo } from './TemperatureInfo';
import { TileLiberty } from 'app/components/icons/TileLiberty';
import { TilePositron } from 'app/components/icons/TilePositron';

const WEATHER_SOURCE_ID = 'weatherapi';
const WEATHER_LAYER_ID = 'weatherapi-layer';
const OPENFREEMAP_LIBERTY = 'https://tiles.openfreemap.org/styles/liberty';
const OPENFREEMAP_POSITRON = 'https://tiles.openfreemap.org/styles/positron';
const TEMPERATURE_CARD_WIDTH = 220;
const TEMPERATURE_CARD_HEIGHT = 120;
const TEMPERATURE_CARD_OFFSET = 12;

type WeatherMarker = {
	requestId: number;
	lngLat: [number, number];
	point: { x: number; y: number };
	layer: string;
	status: 'loading' | 'ready' | 'error';
	value?: string;
	detail?: string;
	location?: string;
};

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

const layerButtons = [
	{ layer: 'tmp2m', icon: <Thermometer color="#FF7000" /> },
	{ layer: 'precip', icon: <CloudRain color="#2793FF" /> },
	{ layer: 'wind', icon: <Wind color="gray" /> },
];

const tileButtons = [
	{ style: OPENFREEMAP_LIBERTY, icon: <TileLiberty /> },
	{ style: OPENFREEMAP_POSITRON, icon: <TilePositron /> },
];

const getWeatherApiMapPeriod = () => {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = String(now.getUTCMonth() + 1).padStart(2, '0');
	const day = String(now.getUTCDate()).padStart(2, '0');
	const hour = String(now.getUTCHours()).padStart(2, '0');

	return `${year}${month}${day}${hour}`;
};

const formatTemperature = (tempC: number, tempF: number, currentTemp: string | undefined) => {
	const isFahrenheit = currentTemp === 'fahrenheit';
	const value = isFahrenheit ? tempF : tempC;
	const unit = isFahrenheit ? 'F' : 'C';

	return `${Math.round(value)}°${unit}`;
};

const formatWeatherMarker = (
	layer: string,
	current: WeatherApiCurrent,
	currentTemp: string | undefined,
	currentUnits: string | undefined,
	gustLabel: string
) => {
	if (layer === 'precip') {
		if (current.precip_mm == null || current.precip_in == null) return null;

		return {
			value: currentUnits === 'imperial' ? `${current.precip_in.toFixed(2)} in` : `${current.precip_mm.toFixed(1)} mm`,
		};
	}

	if (layer === 'wind') {
		if (current.wind_kph == null || current.wind_mph == null) return null;

		const value =
			currentUnits === 'imperial' ? `${Math.round(current.wind_mph)} mph` : `${Math.round(current.wind_kph)} km/h`;
		const gust =
			current.gust_kph == null || current.gust_mph == null
				? null
				: currentUnits === 'imperial'
					? `${gustLabel} ${Math.round(current.gust_mph)} mph`
					: `${gustLabel} ${Math.round(current.gust_kph)} km/h`;
		const detail = [current.wind_dir, gust].filter(Boolean).join(' - ');

		return { value, detail };
	}

	if (current.temp_c == null || current.temp_f == null) return null;

	return { value: formatTemperature(current.temp_c, current.temp_f, currentTemp) };
};

const getTemperatureCardPoint = (map: MapLibreMap, point: { x: number; y: number }) => {
	const container = map.getContainer();
	const maxX = Math.max(
		TEMPERATURE_CARD_OFFSET,
		container.clientWidth - TEMPERATURE_CARD_WIDTH - TEMPERATURE_CARD_OFFSET
	);
	const maxY = Math.max(
		TEMPERATURE_CARD_OFFSET,
		container.clientHeight - TEMPERATURE_CARD_HEIGHT - TEMPERATURE_CARD_OFFSET
	);

	return {
		x: Math.min(Math.max(point.x + TEMPERATURE_CARD_OFFSET, TEMPERATURE_CARD_OFFSET), maxX),
		y: Math.min(Math.max(point.y - TEMPERATURE_CARD_OFFSET, TEMPERATURE_CARD_OFFSET), maxY),
	};
};

const setWeatherLayer = (map: MapLibreMap, layer: string) => {
	if (map.getLayer(WEATHER_LAYER_ID)) {
		map.removeLayer(WEATHER_LAYER_ID);
	}

	if (map.getSource(WEATHER_SOURCE_ID)) {
		map.removeSource(WEATHER_SOURCE_ID);
	}

	map.addSource(WEATHER_SOURCE_ID, {
		type: 'raster',
		tiles: [`https://weathermaps.weatherapi.com/${layer}/tiles/${getWeatherApiMapPeriod()}/{z}/{x}/{y}.png`],
		tileSize: 256,
		minzoom: 0,
		maxzoom: 6,
	});

	map.addLayer({
		id: WEATHER_LAYER_ID,
		type: 'raster',
		source: WEATHER_SOURCE_ID,
		paint: {
			'raster-fade-duration': 300,
			'raster-opacity': 0.6,
			'raster-resampling': 'linear',
		},
	});
};

const MapButton = ({
	onPress,
	icon,
}: {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	icon: ReactNode;
}) => {
	return (
		<StyledPressable onPress={onPress} className={clsx('rounded-3xl border border-transparent p-2')}>
			{icon}
		</StyledPressable>
	);
};

export const MapLibreView = () => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const { layer, setLayer } = useMapLayer();
	const [currentTemp] = useStorageString('currentTemp');
	const [currentUnits] = useStorageString('currentUnits');
	const [showLegend, setShowLegend] = useState(false);
	const [tileStyle, setTileStyle] = useState(OPENFREEMAP_POSITRON);
	const [mapLoading, setMapLoading] = useState(false);
	const [map, setMap] = useState<MapLibreMap | null>(null);
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const activeTileStyleRef = useRef(OPENFREEMAP_POSITRON);
	const currentLayerRef = useRef(layer);
	const temperatureRequestRef = useRef(0);
	const [weatherMarker, setWeatherMarker] = useState<WeatherMarker | null>(null);
	const switchColors = useSwitchColors('black', 'white');
	const mapLatitude = weatherData?.location?.lat;
	const mapLongitude = weatherData?.location?.lon;
	const getWeatherMarkerTitle = (markerLayer: string) => {
		if (markerLayer === 'precip') return t('maps.layer.1');
		if (markerLayer === 'wind') return t('maps.layer.2');

		return t('maps.layer.0');
	};
	const getLayerInfo = () => {
		if (layer === 'precip') return <PrecipitationInfo />;
		if (layer === 'wind') return <WindInfo />;

		return <TemperatureInfo />;
	};

	useEffect(() => {
		currentLayerRef.current = layer;
	}, [layer]);

	useEffect(() => {
		if (!mapContainerRef.current) return;

		const mapInstance = new maplibregl.Map({
			container: mapContainerRef.current,
			style: OPENFREEMAP_POSITRON,
			center: [0, 0],
			zoom: 2,
			attributionControl: false,
			dragRotate: false,
			pitchWithRotate: false,
			scrollZoom: true,
		});

		const handleLoad = () => setMapLoading(true);
		mapInstance.on('load', handleLoad);
		setMap(mapInstance);

		return () => {
			mapInstance.off('load', handleLoad);
			mapInstance.remove();
		};
	}, []);

	useEffect(() => {
		if (!map) return;

		const updateLayer = () => setWeatherLayer(map, layer);

		if (map.isStyleLoaded()) {
			updateLayer();
		} else {
			map.once('style.load', updateLayer);
		}

		return () => {
			map.off('style.load', updateLayer);
		};
	}, [layer, map]);

	useEffect(() => {
		if (!map || activeTileStyleRef.current === tileStyle) return;

		activeTileStyleRef.current = tileStyle;
		setMapLoading(false);

		const updateLayer = () => {
			setMapLoading(true);
			setWeatherLayer(map, currentLayerRef.current);
		};

		map.once('style.load', updateLayer);
		map.setStyle(tileStyle);

		return () => {
			map.off('style.load', updateLayer);
		};
	}, [map, tileStyle]);

	useEffect(() => {
		if (!map || mapLatitude == null || mapLongitude == null) return;

		map.easeTo({
			center: [mapLongitude, mapLatitude],
			zoom: 7,
			duration: 500,
		});
	}, [map, mapLatitude, mapLongitude]);

	useEffect(() => {
		if (!map) return;

		const resizeMap = () => map.resize();

		resizeMap();
		window.addEventListener('resize', resizeMap);

		return () => window.removeEventListener('resize', resizeMap);
	}, [map]);

	useEffect(() => {
		if (!map) return;

		const updateTemperatureMarkerPoint = () => {
			setWeatherMarker((current) => {
				if (!current) return current;

				const point = map.project(current.lngLat);

				return { ...current, point: getTemperatureCardPoint(map, point) };
			});
		};

		map.on('move', updateTemperatureMarkerPoint);

		return () => {
			map.off('move', updateTemperatureMarkerPoint);
		};
	}, [map]);

	useEffect(() => {
		if (!map) return;

		const handleMapClick = async (event: MapMouseEvent) => {
			const requestId = ++temperatureRequestRef.current;
			const markerLayer = currentLayerRef.current;
			const lngLat: [number, number] = [event.lngLat.lng, event.lngLat.lat];

			setWeatherMarker({
				requestId,
				lngLat,
				point: getTemperatureCardPoint(map, event.point),
				layer: markerLayer,
				status: 'loading',
			});

			try {
				const lat = event.lngLat.lat.toFixed(4);
				const lon = event.lngLat.lng.toFixed(4);
				const clickedWeather = await fetchWeatherAPI(`${lat},${lon}`);

				const marker = formatWeatherMarker(
					markerLayer,
					clickedWeather?.current ?? {},
					currentTemp,
					currentUnits,
					t('wind.current.gust')
				);

				if (!marker) {
					throw new Error('Weather data not available');
				}

				const location = clickedWeather.location?.name;

				setWeatherMarker((current) => {
					if (!current || current.requestId !== requestId) return current;

					return {
						...current,
						status: 'ready',
						...marker,
						location,
					};
				});
			} catch {
				setWeatherMarker((current) => {
					if (!current || current.requestId !== requestId) return current;

					return { ...current, status: 'error' };
				});
			}
		};

		map.on('click', handleMapClick);

		return () => {
			map.off('click', handleMapClick);
			temperatureRequestRef.current += 1;
		};
	}, [currentTemp, currentUnits, map, t]);

	return (
		<View className={clsx('relative flex w-full flex-1 overflow-hidden rounded-3xl')}>
			<div ref={mapContainerRef} className={clsx('h-full w-full rounded-3xl')} />
			{weatherMarker && (
				<View
					className={clsx(
						'bg-systemBackground absolute z-10 w-fit flex-row gap-2 rounded-3xl border border-black/10 p-3 shadow-md',
						'dark:bg-secondarySystemBackground_dark dark:border-white/10 dark:shadow-white/10',
						weatherMarker.status !== 'ready' && 'items-center'
					)}
					style={{ left: weatherMarker.point.x, top: weatherMarker.point.y }}
				>
					{weatherMarker.status === 'loading' && (
						<View className={clsx('flex-row items-center gap-2')}>
							<ActivityIndicator size="small" color="#007AFF" />
						</View>
					)}
					{weatherMarker.status === 'error' && (
						<StyledText type="bodysecondary" className={clsx('font-semibold')}>
							{t('maps.weatherUnavailable')}
						</StyledText>
					)}
					{weatherMarker.status === 'ready' && weatherMarker.value && (
						<View>
							<StyledText type="bodysecondary" className={clsx('opacity-70')}>
								{getWeatherMarkerTitle(weatherMarker.layer)}
							</StyledText>
							<StyledText type="title" className={clsx('font-bold')}>
								{weatherMarker.value}
							</StyledText>
							{!!weatherMarker.detail && (
								<StyledText type="bodysecondary" className={clsx('opacity-70')}>
									{weatherMarker.detail}
								</StyledText>
							)}
							{!!weatherMarker.location && (
								<StyledText type="bodysecondary" className={clsx('opacity-70')}>
									{weatherMarker.location}
								</StyledText>
							)}
						</View>
					)}
					<StyledPressable onPress={() => setWeatherMarker(null)} className={clsx('h-fit rounded-full p-1')}>
						<X color="#007AFF" size={20} />
					</StyledPressable>
				</View>
			)}
			<View className={clsx('absolute bottom-4 left-4 gap-2')}>
				{tileButtons.map(({ style, icon }) => (
					<MapButton key={style} icon={icon} onPress={() => setTileStyle(style)} />
				))}
			</View>
			{!mapLoading && (
				<View className={clsx('absolute inset-0 flex-row items-center justify-center gap-2')}>
					<ActivityIndicator size="small" color="#007AFF" />
					<StyledText type="body">{t('maps.loading')}</StyledText>
				</View>
			)}
			<View className={clsx('absolute bottom-4 right-4 flex-row items-end gap-2')}>
				{!showLegend && (
					<StyledPressable onPress={() => setShowLegend((prev) => !prev)} className={clsx('h-fit rounded-3xl p-2')}>
						<InfoIcon color={switchColors} />
					</StyledPressable>
				)}
				<View className={clsx('gap-2')}>
					{layerButtons.map(({ layer, icon }, index) => (
						<MapButton key={index} onPress={() => setLayer(layer)} icon={icon} />
					))}
				</View>
			</View>
			{showLegend && (
				<View className={clsx('absolute bottom-4 right-4 max-lg:left-4')}>
					<AnimatedView duration={30}>
						<RoundView className={clsx('p-4')}>
							<View className={clsx('flex w-full flex-row items-center justify-between')}>
								<StyledText type="subtitle">{t('maps.legend.title')}</StyledText>
								<Pressable
									onPress={() => setShowLegend((prev) => !prev)}
									className={clsx(
										'hover:bg-tertiarySystemBackground hover:dark:bg-tertiarySystemBackground_dark rounded-3xl p-1'
									)}
								>
									<X color="#007AFF" />
								</Pressable>
							</View>
							{getLayerInfo()}
						</RoundView>
					</AnimatedView>
				</View>
			)}
		</View>
	);
};

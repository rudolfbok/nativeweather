import {
	Camera,
	Layer,
	Map as NativeMap,
	RasterSource,
	type CameraRef,
	type MapProps,
	type MapRef,
} from '@maplibre/maplibre-react-native';
import { useTranslate } from '@tolgee/react';
import { fetchWeatherAPI } from 'app/api/fetchWeatherAPI';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';
import { TileLiberty } from 'app/components/icons/TileLiberty';
import { TilePositron } from 'app/components/icons/TilePositron';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useMapLayer } from 'app/hooks/useMapLayer';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorageString';
import { switchMetrics } from 'app/utils/switch/switchMetrics';
import { switchTemp } from 'app/utils/switch/switchTemp';
import { clsx } from 'clsx';
import { CloudRain, InfoIcon, Thermometer, Wind, X } from 'lucide-react-native';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, GestureResponderEvent, LayoutChangeEvent, Pressable, View } from 'react-native';
import { PrecipitationInfo, MapsLegend, WindInfo } from './MapsLegend';

const WEATHER_SOURCE_ID = 'weatherapi';
const WEATHER_LAYER_ID = 'weatherapi-layer';
const OPENFREEMAP_LIBERTY = 'https://tiles.openfreemap.org/styles/liberty';
const OPENFREEMAP_POSITRON = 'https://tiles.openfreemap.org/styles/positron';
// const TEMPERATURE_CARD_WIDTH = 150;
// const TEMPERATURE_CARD_HEIGHT = 120;
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

type MapSize = {
	width: number;
	height: number;
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
			value: switchMetrics({
				metric: `${current.precip_mm.toFixed(1)} mm`,
				imperial: `${current.precip_in.toFixed(2)} in`,
				currentUnits,
			}),
		};
	}

	if (layer === 'wind') {
		if (current.wind_kph == null || current.wind_mph == null) return null;

		const value = switchMetrics({
			metric: `${Math.round(current.wind_kph)} km/h`,
			imperial: `${Math.round(current.wind_mph)} mph`,
			currentUnits,
		});
		const gust =
			current.gust_kph == null || current.gust_mph == null
				? null
				: `${gustLabel} ${switchMetrics({
						metric: `${Math.round(current.gust_kph)} km/h`,
						imperial: `${Math.round(current.gust_mph)} mph`,
						currentUnits,
					})}`;
		const detail = [current.wind_dir, gust].filter(Boolean).join(' - ');

		return { value, detail };
	}

	if (current.temp_c == null || current.temp_f == null) return null;

	return {
		value: switchTemp({
			celsius: current.temp_c,
			fahrenheit: current.temp_f,
			currentTemp,
			includeUnit: true,
		}),
	};
};

const getTemperatureCardPoint = (point: [number, number], size: MapSize) => {
	// const maxX = Math.max(TEMPERATURE_CARD_OFFSET, size.width - TEMPERATURE_CARD_WIDTH - TEMPERATURE_CARD_OFFSET);
	// const maxY = Math.max(TEMPERATURE_CARD_OFFSET, size.height - TEMPERATURE_CARD_HEIGHT - TEMPERATURE_CARD_OFFSET);

	return {
		x: Math.min(Math.max(point[0] + TEMPERATURE_CARD_OFFSET, TEMPERATURE_CARD_OFFSET)),
		y: Math.min(Math.max(point[1] - TEMPERATURE_CARD_OFFSET, TEMPERATURE_CARD_OFFSET)),
	};
};

const MapButton = ({
	onPress,
	icon,
}: {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	icon: ReactNode;
}) => {
	return (
		<StyledPressable onPress={onPress} className={clsx('rounded-full border border-transparent p-3')}>
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
	const [tileStyle, setTileStyle] = useState(OPENFREEMAP_LIBERTY);
	const [mapLoading, setMapLoading] = useState(false);
	const [mapSize, setMapSize] = useState<MapSize>({ width: 0, height: 0 });
	const mapRef = useRef<MapRef | null>(null);
	const cameraRef = useRef<CameraRef | null>(null);
	const currentLayerRef = useRef(layer);
	const temperatureRequestRef = useRef(0);
	const [weatherMarker, setWeatherMarker] = useState<WeatherMarker | null>(null);
	const switchColors = useSwitchColors('black', 'white');
	const mapLatitude = weatherData?.location?.lat;
	const mapLongitude = weatherData?.location?.lon;
	const weatherTileUrl = `https://weathermaps.weatherapi.com/${layer}/tiles/${getWeatherApiMapPeriod()}/{z}/{x}/{y}.png`;

	const getWeatherMarkerTitle = (markerLayer: string) => {
		if (markerLayer === 'precip') return t('maps.layer.1');
		if (markerLayer === 'wind') return t('maps.layer.2');

		return t('maps.layer.0');
	};
	const getLayerInfo = () => {
		if (layer === 'precip') return <PrecipitationInfo />;
		if (layer === 'wind') return <WindInfo />;

		return <MapsLegend />;
	};

	useEffect(() => {
		currentLayerRef.current = layer;
	}, [layer]);

	useEffect(() => {
		setMapLoading(false);
	}, [tileStyle]);

	useEffect(() => {
		if (mapLatitude == null || mapLongitude == null) return;

		cameraRef.current?.easeTo({
			center: [mapLongitude, mapLatitude],
			zoom: 7,
			duration: 500,
		});
	}, [mapLatitude, mapLongitude]);

	const updateWeatherMarkerPoint = async () => {
		if (!mapRef.current || !weatherMarker || mapSize.width === 0 || mapSize.height === 0) return;

		const point = await mapRef.current.project(weatherMarker.lngLat);

		setWeatherMarker((current) => {
			if (!current) return current;

			return { ...current, point: getTemperatureCardPoint(point, mapSize) };
		});
	};

	const handleMapLayout = (event: LayoutChangeEvent) => {
		setMapSize({
			width: event.nativeEvent.layout.width,
			height: event.nativeEvent.layout.height,
		});
	};

	const handleMapPress: NonNullable<MapProps['onPress']> = async (event) => {
		if (mapSize.width === 0 || mapSize.height === 0) return;

		const requestId = ++temperatureRequestRef.current;
		const markerLayer = currentLayerRef.current;
		const lngLat = event.nativeEvent.lngLat;
		const point = event.nativeEvent.point;

		setWeatherMarker({
			requestId,
			lngLat,
			point: getTemperatureCardPoint(point, mapSize),
			layer: markerLayer,
			status: 'loading',
		});

		try {
			const lat = lngLat[1].toFixed(4);
			const lon = lngLat[0].toFixed(4);
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

	return (
		<View className={clsx('relative flex w-full flex-1 overflow-hidden')} onLayout={handleMapLayout}>
			<NativeMap
				ref={mapRef}
				mapStyle={tileStyle}
				style={{ flex: 1 }}
				attribution={false}
				logo={false}
				compass={false}
				touchRotate={false}
				touchPitch={false}
				onPress={handleMapPress}
				onDidFinishLoadingStyle={() => setMapLoading(true)}
				onDidFailLoadingMap={() => setMapLoading(true)}
				onRegionDidChange={updateWeatherMarkerPoint}
			>
				<Camera ref={cameraRef} initialViewState={{ center: [0, 0], zoom: 2 }} />
				<RasterSource
					key={`${layer}-${weatherTileUrl}`}
					id={WEATHER_SOURCE_ID}
					tiles={[weatherTileUrl]}
					tileSize={256}
					minzoom={0}
					maxzoom={6}
				>
					<Layer
						id={WEATHER_LAYER_ID}
						type="raster"
						source={WEATHER_SOURCE_ID}
						paint={{
							'raster-fade-duration': 300,
							'raster-opacity': 0.6,
							'raster-resampling': 'linear',
						}}
					/>
				</RasterSource>
			</NativeMap>
			{weatherMarker && (
				<View
					className={clsx(
						'bg-systemBackground absolute z-10 flex-row gap-2 rounded-3xl border border-black/10 p-3 shadow-md',
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
					<View>
						<View className="flex-row items-center justify-between gap-2">
							{weatherMarker.status === 'ready' && weatherMarker.value && (
								<StyledText type="bodysecondary" className={clsx('opacity-70')}>
									{getWeatherMarkerTitle(weatherMarker.layer)}
								</StyledText>
							)}
							<StyledPressable onPress={() => setWeatherMarker(null)} className={clsx('h-fit rounded-full p-1')}>
								<X color="#007AFF" size={20} />
							</StyledPressable>
						</View>
						{weatherMarker.status === 'ready' && weatherMarker.value && (
							<View>
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
					</View>
				</View>
			)}
			<View className={clsx('ios:bottom-28 absolute bottom-4 left-6 gap-2')}>
				{tileButtons.map(({ style, icon }) => (
					<MapButton key={style} icon={icon} onPress={() => setTileStyle(style)} />
				))}
			</View>
			{mapLoading && (
				<View className={clsx('absolute inset-0 flex-row items-center justify-center gap-2')}>
					<ActivityIndicator size="small" color="#007AFF" />
					<StyledText type="body">{t('maps.loading')}</StyledText>
				</View>
			)}
			<View className={clsx('ios:bottom-28 absolute bottom-4 right-6 flex-row items-end gap-2')}>
				{!showLegend && (
					<StyledPressable onPress={() => setShowLegend((prev) => !prev)} className={clsx('h-fit rounded-full p-3')}>
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
				<View className={clsx('ios:bottom-28 absolute bottom-4 left-4 right-4')}>
					<AnimatedView duration={30}>
						<RoundView className={clsx('p-4')}>
							<View className={clsx('flex w-full flex-row items-center justify-between')}>
								<StyledText type="subtitle">{t('maps.legend.title')}</StyledText>
								<Pressable onPress={() => setShowLegend((prev) => !prev)} className={clsx('rounded-full p-1')}>
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

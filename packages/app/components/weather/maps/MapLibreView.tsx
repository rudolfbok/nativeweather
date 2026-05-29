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
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useMapLayer } from 'app/hooks/useMapLayer';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import {
	formatWeatherMarker,
	getTemperatureCardPoint,
	getWeatherApiMapPeriod,
	getWeatherMarkerTitle,
	MapLayerControls,
	MapLegendOverlay,
	MapLoadingOverlay,
	MapTileControls,
	OPENFREEMAP_LIBERTY,
	WEATHER_LAYER_ID,
	WEATHER_SOURCE_ID,
	WeatherMarkerCard,
	type MapSize,
	type WeatherMarker,
} from './MapLibreShared';

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

			return { ...current, point: getTemperatureCardPoint({ x: point[0], y: point[1] }, mapSize) };
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
			point: getTemperatureCardPoint({ x: point[0], y: point[1] }, mapSize),
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
				<WeatherMarkerCard
					weatherMarker={weatherMarker}
					title={getWeatherMarkerTitle(weatherMarker.layer, t)}
					unavailableLabel={t('maps.weatherUnavailable')}
					onClose={() => setWeatherMarker(null)}
					className={clsx('flex-row gap-2')}
					loadingClassName={clsx('items-center')}
				/>
			)}
			<MapTileControls
				className={clsx('ios:bottom-28 absolute bottom-4 left-6 gap-2')}
				buttonClassName={clsx('rounded-full p-3')}
				onTilePress={setTileStyle}
			/>
			<MapLoadingOverlay visible={!mapLoading} label={t('maps.loading')} />
			<MapLayerControls
				className={clsx('ios:bottom-28 absolute bottom-4 right-6 flex-row items-end gap-2')}
				buttonClassName={clsx('rounded-full p-3')}
				infoButtonClassName={clsx('rounded-full p-3')}
				showLegend={showLegend}
				switchColors={switchColors}
				onLayerPress={setLayer}
				onToggleLegend={() => setShowLegend((prev) => !prev)}
			/>
			<MapLegendOverlay
				visible={showLegend}
				className={clsx('ios:bottom-28 absolute bottom-4 left-6 right-6')}
				closeButtonClassName={clsx('rounded-full p-1')}
				title={t('maps.legend.title')}
				layer={layer}
				onToggleLegend={() => setShowLegend((prev) => !prev)}
			/>
		</View>
	);
};

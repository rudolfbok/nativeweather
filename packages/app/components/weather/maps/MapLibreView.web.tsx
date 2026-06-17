import { useTranslate } from '@tolgee/react';
import { fetchWeatherAPI } from 'app/api/fetchWeatherAPI';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { useMapLayer } from 'app/hooks/useMapLayer';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorage';
import { clsx } from 'clsx';
import maplibregl, { type Map as MapLibreMap, type MapMouseEvent } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
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
	type WeatherMarker,
} from './MapLibreShared';

const getWebTemperatureCardPoint = (map: MapLibreMap, point: { x: number; y: number }) => {
	const container = map.getContainer();

	return getTemperatureCardPoint(point, {
		width: container.clientWidth,
		height: container.clientHeight,
	});
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

export const MapLibreView = () => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const { layer, setLayer } = useMapLayer();
	const [currentTemp] = useStorageString('currentTemp');
	const [currentUnits] = useStorageString('currentUnits');
	const [showLegend, setShowLegend] = useState(false);
	const [tileStyle, setTileStyle] = useState(OPENFREEMAP_LIBERTY);
	const [mapLoading, setMapLoading] = useState(false);
	const [map, setMap] = useState<MapLibreMap | null>(null);
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const activeTileStyleRef = useRef(OPENFREEMAP_LIBERTY);
	const currentLayerRef = useRef(layer);
	const temperatureRequestRef = useRef(0);
	const [weatherMarker, setWeatherMarker] = useState<WeatherMarker | null>(null);
	const switchColors = useSwitchColors('black', 'white');
	const mapLatitude = weatherData?.location?.lat;
	const mapLongitude = weatherData?.location?.lon;

	useEffect(() => {
		currentLayerRef.current = layer;
	}, [layer]);

	useEffect(() => {
		if (!mapContainerRef.current) return;

		const mapInstance = new maplibregl.Map({
			container: mapContainerRef.current,
			style: OPENFREEMAP_LIBERTY,
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

				return { ...current, point: getWebTemperatureCardPoint(map, point) };
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
				point: getWebTemperatureCardPoint(map, event.point),
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
				<WeatherMarkerCard
					weatherMarker={weatherMarker}
					title={getWeatherMarkerTitle(weatherMarker.layer, t)}
					unavailableLabel={t('maps.weatherUnavailable')}
					onClose={() => setWeatherMarker(null)}
					className={clsx('w-fit')}
					loadingClassName={clsx('flex-row items-center')}
				/>
			)}
			<MapTileControls
				className={clsx('absolute bottom-4 left-4 gap-2')}
				buttonClassName={clsx('rounded-3xl p-2')}
				onTilePress={setTileStyle}
			/>
			<MapLoadingOverlay visible={!mapLoading} label={t('maps.loading')} />
			<MapLayerControls
				className={clsx('absolute bottom-4 right-4 flex-row items-end gap-2')}
				buttonClassName={clsx('rounded-3xl p-2')}
				infoButtonClassName={clsx('rounded-3xl p-2')}
				showLegend={showLegend}
				switchColors={switchColors}
				onLayerPress={setLayer}
				onToggleLegend={() => setShowLegend((prev) => !prev)}
			/>
			<MapLegendOverlay
				visible={showLegend}
				className={clsx('absolute bottom-4 right-4 max-lg:left-4')}
				closeButtonClassName={clsx(
					'hover:bg-tertiarySystemBackground hover:dark:bg-tertiarySystemBackground_dark rounded-3xl p-1'
				)}
				title={t('maps.legend.title')}
				layer={layer}
				onToggleLegend={() => setShowLegend((prev) => !prev)}
			/>
		</View>
	);
};

import { useTranslate } from '@tolgee/react';
import { StyledText } from '../../common/styled/StyledText';
import {
	getBaseMapUrl,
	getWeatherTileUrl,
	MapLoadStatus,
	WEATHER_LAYER_ID,
	weatherRasterPaint,
	WEATHER_SOURCE_ID,
} from '@nativeweather/core/constants/weatherMap';
import type { BaseMapStyle, WeatherMapLayer } from '@nativeweather/core/constants/weatherMap';
import { useMapLayer } from '@nativeweather/ui/hooks/maps/useMapLayer';
import { useMapWeatherPoint } from '@nativeweather/core/hooks/maps/useMapWeatherPoint';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import type { Map as MapLibreMap, MapMouseEvent } from 'maplibre-gl';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, LayoutChangeEvent, View } from 'react-native';
import { MapCompass } from '../ui/MapCompass';
import { MapControls } from '../ui/MapControls';
import { MapNavigationControls } from '../ui/MapNavigationControls';
import { MapWeatherPopup } from '../ui/MapWeatherPopup';

type Point = { x: number; y: number };
type Size = { width: number; height: number };

const setWeatherLayer = (map: MapLibreMap, layer: WeatherMapLayer) => {
	if (map.getLayer(WEATHER_LAYER_ID)) map.removeLayer(WEATHER_LAYER_ID);
	if (map.getSource(WEATHER_SOURCE_ID)) map.removeSource(WEATHER_SOURCE_ID);

	map.addSource(WEATHER_SOURCE_ID, {
		type: 'raster',
		tiles: [getWeatherTileUrl(layer)],
		tileSize: 256,
		minzoom: 0,
		maxzoom: 6,
	});
	map.addLayer({
		id: WEATHER_LAYER_ID,
		type: 'raster',
		source: WEATHER_SOURCE_ID,
		paint: weatherRasterPaint,
	});
};

const clearWeatherLayer = (map: MapLibreMap) => {
	if (map.getLayer(WEATHER_LAYER_ID)) map.removeLayer(WEATHER_LAYER_ID);
	if (map.getSource(WEATHER_SOURCE_ID)) map.removeSource(WEATHER_SOURCE_ID);
};

export const MapLibreView = ({ showCompass = false }: { showCompass?: boolean }) => {
	const { t } = useTranslate('weather');
	const weatherData = useWeather((state) => state.weatherData);
	const { layer, setLayer } = useMapLayer();
	const { weatherPoint, requestWeatherPoint, clearWeatherPoint } = useMapWeatherPoint(t('wind.current.gust'));
	const [baseMap, setBaseMap] = useState<BaseMapStyle>('liberty');
	const [status, setStatus] = useState<MapLoadStatus>('loading');
	const [map, setMap] = useState<MapLibreMap | null>(null);
	const [mapSize, setMapSize] = useState<Size>({ width: 0, height: 0 });
	const [markerAnchor, setMarkerAnchor] = useState<Point | null>(null);
	const [bearing, setBearing] = useState(0);
	const [weatherLayerVisible, setWeatherLayerVisible] = useState(true);
	const [showLegend, setShowLegend] = useState(false);
	const [loadingDelayPassed, setLoadingDelayPassed] = useState(false);
	const showLoading = status === 'loading' && loadingDelayPassed;
	const containerRef = useRef<HTMLDivElement | null>(null);
	const activeStyleRef = useRef<BaseMapStyle>('liberty');
	const mapLatitude = weatherData?.location?.lat;
	const mapLongitude = weatherData?.location?.lon;
	const initializedLocation = useRef(
		mapLatitude != null && mapLongitude != null ? `${mapLatitude}:${mapLongitude}` : null
	);

	useEffect(() => {
		if (status !== 'loading') return;
		const timeout = setTimeout(() => setLoadingDelayPassed(true), 2000);
		return () => clearTimeout(timeout);
	}, [status]);

	useEffect(() => {
		if (!containerRef.current) return;
		let mounted = true;
		let instance: MapLibreMap | null = null;

		const createMap = async () => {
			const maplibregl = await import('maplibre-gl');
			if (!mounted || !containerRef.current) return;

			instance = new maplibregl.Map({
				container: containerRef.current,
				style: getBaseMapUrl('liberty'),
				center: mapLatitude != null && mapLongitude != null ? [mapLongitude, mapLatitude] : [0, 0],
				zoom: mapLatitude != null && mapLongitude != null ? 7 : 2,
				attributionControl: false,
				dragRotate: showCompass,
				pitchWithRotate: false,
			});
			instance.on('error', () => {
				if (mounted && !instance?.isStyleLoaded()) setStatus('error');
			});
			instance.resize();
			setMap(instance);
		};

		createMap();

		return () => {
			mounted = false;
			instance?.remove();
		};
	}, [mapLatitude, mapLongitude, showCompass]);

	useEffect(() => {
		if (!map) return;
		let cancelled = false;
		const handleReady = () => {
			if (!cancelled) setStatus('ready');
		};
		const updateLayer = () => {
			if (cancelled) return;
			if (weatherLayerVisible) setWeatherLayer(map, layer);
			else clearWeatherLayer(map);
			map.once('idle', handleReady);
		};
		if (activeStyleRef.current !== baseMap) {
			activeStyleRef.current = baseMap;
			map.once('style.load', updateLayer);
			map.setStyle(getBaseMapUrl(baseMap));
		} else if (map.isStyleLoaded()) {
			updateLayer();
		} else {
			map.once('style.load', updateLayer);
		}

		return () => {
			cancelled = true;
			map.off('style.load', updateLayer);
			map.off('idle', handleReady);
		};
	}, [baseMap, layer, map, weatherLayerVisible]);

	useEffect(() => {
		if (!map || mapLatitude == null || mapLongitude == null) return;
		const location = `${mapLatitude}:${mapLongitude}`;
		if (initializedLocation.current === location) {
			initializedLocation.current = null;
			return;
		}
		initializedLocation.current = null;
		map.easeTo({ center: [mapLongitude, mapLatitude], zoom: 7, duration: 500 });
	}, [map, mapLatitude, mapLongitude]);

	useEffect(() => {
		if (!map) return;
		const updateMarker = () => {
			if (!weatherPoint) return;
			const point = map.project(weatherPoint.lngLat);
			setMarkerAnchor({ x: point.x, y: point.y });
		};
		map.on('move', updateMarker);
		return () => {
			map.off('move', updateMarker);
		};
	}, [map, weatherPoint]);

	useEffect(() => {
		if (!map || !showCompass) return;
		const updateBearing = () => setBearing(map.getBearing());
		map.on('rotate', updateBearing);
		return () => {
			map.off('rotate', updateBearing);
		};
	}, [map, showCompass]);

	useEffect(() => {
		if (!map || !weatherLayerVisible || !showCompass) return;
		const handleClick = (event: MapMouseEvent) => {
			setShowLegend(false);
			setMarkerAnchor({ x: event.point.x, y: event.point.y });
			requestWeatherPoint([event.lngLat.lng, event.lngLat.lat], layer);
		};
		map.on('click', handleClick);
		return () => {
			map.off('click', handleClick);
		};
	}, [layer, map, requestWeatherPoint, showCompass, weatherLayerVisible]);

	const handleLayerChange = (nextLayer: WeatherMapLayer) => {
		setLoadingDelayPassed(false);
		setStatus('loading');
		setWeatherLayerVisible(true);
		setLayer(nextLayer);
		clearWeatherPoint();
		setMarkerAnchor(null);
	};

	const closePopup = () => {
		clearWeatherPoint();
		setMarkerAnchor(null);
	};

	const handleClearLayer = () => {
		setLoadingDelayPassed(false);
		setStatus('loading');
		setWeatherLayerVisible(false);
		setShowLegend(false);
		closePopup();
	};

	const handleLegendChange = (show: boolean) => {
		setShowLegend(show);
		if (show) closePopup();
	};

	const handleLayout = (event: LayoutChangeEvent) => {
		setMapSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height });
		map?.resize();
	};

	const handleBaseMapChange = (style: BaseMapStyle) => {
		setLoadingDelayPassed(false);
		setStatus('loading');
		setBaseMap(style);
	};

	return (
		<View className="relative flex w-full flex-1 overflow-hidden" onLayout={handleLayout}>
			<div ref={containerRef} className="h-full w-full rounded-3xl" />
			{showCompass && (
				<MapNavigationControls
					onZoomIn={() => map?.zoomIn({ duration: 300 })}
					onZoomOut={() => map?.zoomOut({ duration: 300 })}
					onLocate={() => {
						if (mapLatitude != null && mapLongitude != null) {
							map?.easeTo({ center: [mapLongitude, mapLatitude], zoom: 7, duration: 500 });
						}
					}}
				/>
			)}
			{showCompass && <MapCompass bearing={bearing} onPress={() => map?.resetNorth({ duration: 300 })} />}
			{showLoading && (
				<View className={clsx('pointer-events-none absolute inset-0 z-20 items-center justify-center')}>
					<View
						className={clsx('bg-systemBackground dark:bg-secondarySystemBackground_dark flex-row items-center gap-3 rounded-full px-5 py-3')}
					>
						<ActivityIndicator size="small" color="#007AFF" />
						<StyledText type="body" className="font-semibold">
							{t('maps.loading')}
						</StyledText>
					</View>
				</View>
			)}
			{status === 'error' && (
				<View className="bg-systemBackground/90 dark:bg-systemBackground_dark/90 absolute inset-0 items-center justify-center p-6">
					<StyledText type="body" className="text-center font-semibold">
						{t('maps.loadError')}
					</StyledText>
				</View>
			)}
			{showCompass && weatherPoint && markerAnchor && mapSize.width > 0 && mapSize.height > 0 && (
				<MapWeatherPopup
					weatherPoint={weatherPoint}
					anchor={markerAnchor}
					mapSize={mapSize}
					title={t(`maps.layer.${weatherPoint.layer === 'tmp2m' ? 0 : weatherPoint.layer === 'precip' ? 1 : 2}`)}
					errorLabel={t('maps.weatherUnavailable')}
					onClose={closePopup}
				/>
			)}
			<MapControls
				layer={layer}
				weatherLayerVisible={weatherLayerVisible}
				baseMap={baseMap}
				showInfo={showCompass}
				onLayerChange={handleLayerChange}
				onClearLayer={showCompass ? handleClearLayer : undefined}
				onBaseMapChange={handleBaseMapChange}
				showLegend={showLegend}
				onLegendChange={handleLegendChange}
			/>
		</View>
	);
};

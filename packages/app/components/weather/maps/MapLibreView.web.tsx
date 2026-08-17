import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import {
	getBaseMapUrl,
	getWeatherTileUrl,
	MapLoadStatus,
	WEATHER_LAYER_ID,
	weatherRasterPaint,
	WEATHER_SOURCE_ID,
} from 'app/constants/weatherMap';
import type { BaseMapStyle, WeatherMapLayer } from 'app/constants/weatherMap';
import { useMapLayer } from 'app/hooks/maps/useMapLayer';
import { useMapWeatherPoint } from 'app/hooks/maps/useMapWeatherPoint';
import { useWeather } from 'app/hooks/weather/useWeather';
import type { Map as MapLibreMap, MapMouseEvent } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, LayoutChangeEvent, View } from 'react-native';
import { MapControls } from './MapControls';
import { MapCompass } from './MapCompass';
import { MapWeatherPopup } from './MapWeatherPopup';

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
	const { weatherData } = useWeather();
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
	const containerRef = useRef<HTMLDivElement | null>(null);
	const activeStyleRef = useRef<BaseMapStyle>('liberty');

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
				center: [0, 0],
				zoom: 2,
				attributionControl: false,
				dragRotate: showCompass,
				pitchWithRotate: false,
			});
			instance.on('error', () => {
				if (mounted && !instance?.isStyleLoaded()) setStatus('error');
			});
			setMap(instance);
		};

		createMap();

		return () => {
			mounted = false;
			instance?.remove();
		};
	}, [showCompass]);

	useEffect(() => {
		if (!map) return;
		let cancelled = false;
		const updateLayer = () => {
			if (cancelled) return;
			if (weatherLayerVisible) setWeatherLayer(map, layer);
			else clearWeatherLayer(map);
			setStatus('ready');
		};

		if (activeStyleRef.current !== baseMap) {
			activeStyleRef.current = baseMap;
			setStatus('loading');
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
		};
	}, [baseMap, layer, map, weatherLayerVisible]);

	useEffect(() => {
		const latitude = weatherData?.location?.lat;
		const longitude = weatherData?.location?.lon;
		if (!map || latitude == null || longitude == null) return;
		map.easeTo({ center: [longitude, latitude], zoom: 7, duration: 500 });
	}, [map, weatherData?.location?.lat, weatherData?.location?.lon]);

	useEffect(() => {
		if (!map) return;
		map.resize();
	}, [map, mapSize]);

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
		if (!map || !weatherLayerVisible) return;
		const handleClick = (event: MapMouseEvent) => {
			setShowLegend(false);
			setMarkerAnchor({ x: event.point.x, y: event.point.y });
			requestWeatherPoint([event.lngLat.lng, event.lngLat.lat], layer);
		};
		map.on('click', handleClick);
		return () => {
			map.off('click', handleClick);
		};
	}, [layer, map, requestWeatherPoint, weatherLayerVisible]);

	const handleLayerChange = (nextLayer: WeatherMapLayer) => {
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
	};

	return (
		<View className="relative flex w-full flex-1 overflow-hidden" onLayout={handleLayout}>
			<div ref={containerRef} className="h-full w-full rounded-3xl" />
			{showCompass && (
				<MapCompass bearing={bearing} onPress={() => map?.resetNorth({ duration: 300 })} />
			)}
			{status === 'loading' && (
				<View className="absolute inset-0 flex-row items-center justify-center gap-2">
					<ActivityIndicator size="small" color="#007AFF" />
					<StyledText type="body">{t('maps.loading')}</StyledText>
				</View>
			)}
			{status === 'error' && (
				<View className="bg-systemBackground/90 absolute inset-0 items-center justify-center p-6 dark:bg-systemBackground_dark/90">
					<StyledText type="body" className="text-center font-semibold">
						{t('maps.loadError')}
					</StyledText>
				</View>
			)}
			{weatherPoint && markerAnchor && mapSize.width > 0 && mapSize.height > 0 && (
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
				onLayerChange={handleLayerChange}
				onClearLayer={showCompass ? handleClearLayer : undefined}
				onBaseMapChange={setBaseMap}
				showLegend={showLegend}
				onLegendChange={handleLegendChange}
			/>
		</View>
	);
};

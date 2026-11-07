import {
	getBaseMapUrl,
	getWeatherTileUrl,
	useMapWeatherPoint,
	useWeather,
	WEATHER_LAYER_ID,
	WEATHER_SOURCE_ID,
	weatherRasterPaint,
} from '@/core';
import type { BaseMapStyle, MapLoadStatus, WeatherMapLayer } from '@/core';
import { useTranslate } from '@tolgee/react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import Map, { Layer, Source } from 'react-map-gl/maplibre';
import type { MapLayerMouseEvent, MapRef, ViewStateChangeEvent } from 'react-map-gl/maplibre';
import { Text } from '../common/Text';
import { MapControls, MapNavigation } from './MapControls';
import { MapWeatherPopup } from './MapWeatherPopup';

type Point = { x: number; y: number };

const layerTitleKeys = { tmp2m: 0, precip: 1, wind: 2 } as const;
const HOME_ZOOM = 7;
const LOADING_PILL_DELAY_MS = 2000;

/** `interactive` is the fullscreen map: rotation, zoom buttons, click-for-weather popup and legend. */
export const MapLibreView = ({ interactive = false }: { interactive?: boolean }) => {
	const { t } = useTranslate('weather');
	const location = useWeather((state) => state.weatherData?.location);
	const { weatherPoint, requestWeatherPoint, clearWeatherPoint } = useMapWeatherPoint(t('wind.current.gust'));
	const [layer, setLayer] = useState<WeatherMapLayer>('tmp2m');
	const [baseMap, setBaseMap] = useState<BaseMapStyle>('liberty');
	const [status, setStatus] = useState<MapLoadStatus>('loading');
	const [showLoading, setShowLoading] = useState(false);
	const [size, setSize] = useState({ width: 0, height: 0 });
	const [markerAnchor, setMarkerAnchor] = useState<Point | null>(null);
	const [bearing, setBearing] = useState(0);
	const [weatherLayerVisible, setWeatherLayerVisible] = useState(true);
	const [showLegend, setShowLegend] = useState(false);
	const mapRef = useRef<MapRef>(null);
	const lat = location?.lat;
	const lon = location?.lon;
	const hasLocation = lat != null && lon != null;

	// Only show the pill when loading is slow, so quick loads don't flash it.
	useEffect(() => {
		if (status !== 'loading') return;
		const timer = setTimeout(() => setShowLoading(true), LOADING_PILL_DELAY_MS);
		return () => {
			clearTimeout(timer);
			setShowLoading(false);
		};
	}, [status]);

	// The location can arrive after the map is created.
	useEffect(() => {
		if (hasLocation) mapRef.current?.jumpTo({ center: [lon, lat], zoom: HOME_ZOOM });
	}, [hasLocation, lat, lon]);

	const handleMove = ({ target }: ViewStateChangeEvent) => {
		if (interactive) setBearing(target.getBearing());
		if (weatherPoint) {
			const point = target.project(weatherPoint.lngLat);
			setMarkerAnchor({ x: point.x, y: point.y });
		}
	};

	const handleClick = ({ point, lngLat }: MapLayerMouseEvent) => {
		if (!interactive || !weatherLayerVisible) return;
		setShowLegend(false);
		setMarkerAnchor({ x: point.x, y: point.y });
		requestWeatherPoint([lngLat.lng, lngLat.lat], layer);
	};

	const closePopup = () => {
		clearWeatherPoint();
		setMarkerAnchor(null);
	};

	const handleLayerChange = (next: WeatherMapLayer) => {
		setStatus('loading');
		setWeatherLayerVisible(true);
		setLayer(next);
		closePopup();
	};

	const handleClearLayer = () => {
		setStatus('loading');
		setWeatherLayerVisible(false);
		setShowLegend(false);
		closePopup();
	};

	const handleBaseMapChange = (style: BaseMapStyle) => {
		setStatus('loading');
		setBaseMap(style);
	};

	const handleLegendChange = (show: boolean) => {
		setShowLegend(show);
		if (show) closePopup();
	};

	const handleLayout = ({ nativeEvent }: LayoutChangeEvent) =>
		setSize({ width: nativeEvent.layout.width, height: nativeEvent.layout.height });

	const locate = () => {
		if (hasLocation) mapRef.current?.easeTo({ center: [lon, lat], zoom: HOME_ZOOM, duration: 500 });
	};

	return (
		<View className="relative w-full flex-1 overflow-hidden" onLayout={handleLayout}>
			<View style={StyleSheet.absoluteFill}>
				<Map
					ref={mapRef}
					initialViewState={{
						longitude: hasLocation ? lon : 0,
						latitude: hasLocation ? lat : 0,
						zoom: hasLocation ? HOME_ZOOM : 2,
					}}
					mapStyle={getBaseMapUrl(baseMap)}
					style={{ width: '100%', height: '100%', borderRadius: 24 }}
					attributionControl={false}
					dragRotate={interactive}
					pitchWithRotate={false}
					onMove={handleMove}
					onClick={handleClick}
					onIdle={() => setStatus('ready')}
					onError={() => setStatus('error')}
				>
					{weatherLayerVisible && (
						<Source
							key={layer}
							id={WEATHER_SOURCE_ID}
							type="raster"
							tiles={[getWeatherTileUrl(layer)]}
							tileSize={256}
							minzoom={0}
							maxzoom={6}
						>
							<Layer id={WEATHER_LAYER_ID} type="raster" paint={weatherRasterPaint} />
						</Source>
					)}
				</Map>
			</View>
			{interactive && (
				<MapNavigation
					bearing={bearing}
					onZoomIn={() => mapRef.current?.zoomIn({ duration: 300 })}
					onZoomOut={() => mapRef.current?.zoomOut({ duration: 300 })}
					onLocate={locate}
					onResetNorth={() => mapRef.current?.resetNorth({ duration: 300 })}
				/>
			)}
			{showLoading && (
				<View className="pointer-events-none absolute inset-0 z-20 items-center justify-center">
					<View className="flex-row items-center gap-3 rounded-full bg-system-background px-5 py-3">
						<ActivityIndicator size="small" />
						<Text type="body" className="font-semibold">
							{t('maps.loading')}
						</Text>
					</View>
				</View>
			)}
			{status === 'error' && (
				<View className="absolute inset-0 items-center justify-center bg-system-background/90 p-6">
					<Text type="body" className="text-center font-semibold">
						{t('maps.loadError')}
					</Text>
				</View>
			)}
			{interactive && weatherPoint && markerAnchor && size.width > 0 && (
				<MapWeatherPopup
					weatherPoint={weatherPoint}
					anchor={markerAnchor}
					mapSize={size}
					title={t(`maps.layer.${layerTitleKeys[weatherPoint.layer]}`)}
					errorLabel={t('maps.weatherUnavailable')}
					onClose={closePopup}
				/>
			)}
			<MapControls
				layer={layer}
				weatherLayerVisible={weatherLayerVisible}
				onLayerChange={handleLayerChange}
				onClearLayer={interactive ? handleClearLayer : undefined}
				onBaseMapChange={handleBaseMapChange}
				showLegend={showLegend}
				onLegendChange={handleLegendChange}
			/>
		</View>
	);
};

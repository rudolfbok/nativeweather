import { Camera, Layer, Map, RasterSource } from '@maplibre/maplibre-react-native';
import type { CameraRef, MapProps, MapRef } from '@maplibre/maplibre-react-native';
import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { getBaseMapUrl, getWeatherTileUrl, MapLoadStatus, weatherRasterPaint } from 'app/constants/weatherMap';
import type { BaseMapStyle, WeatherMapLayer } from 'app/constants/weatherMap';
import { useMapLayer } from 'app/hooks/maps/useMapLayer';
import { useMapWeatherPoint } from 'app/hooks/maps/useMapWeatherPoint';
import { useWeather } from 'app/hooks/weather/useWeather';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, LayoutChangeEvent, Platform, View } from 'react-native';
import { MapControls } from './MapControls';
import { MapCompass } from './MapCompass';
import { MapNavigationControls } from './MapNavigationControls';
import { MapWeatherPopup } from './MapWeatherPopup';

type Point = { x: number; y: number };
type Size = { width: number; height: number };

export const MapLibreView = ({ showCompass = true }: { showCompass?: boolean }) => {
	const { t } = useTranslate('weather');
	const weatherData = useWeather((state) => state.weatherData);
	const { layer, setLayer } = useMapLayer();
	const { weatherPoint, requestWeatherPoint, clearWeatherPoint } = useMapWeatherPoint(t('wind.current.gust'));
	const [baseMap, setBaseMap] = useState<BaseMapStyle>('liberty');
	const [status, setStatus] = useState<MapLoadStatus>('loading');
	const [mapSize, setMapSize] = useState<Size>({ width: 0, height: 0 });
	const [markerAnchor, setMarkerAnchor] = useState<Point | null>(null);
	const [bearing, setBearing] = useState(0);
	const [showLegend, setShowLegend] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const [mapReady, setMapReady] = useState(false);
	const mapRef = useRef<MapRef | null>(null);
	const cameraRef = useRef<CameraRef | null>(null);
	const mapLatitude = weatherData?.location?.lat;
	const mapLongitude = weatherData?.location?.lon;
	const initializedLocation = useRef(
		mapLatitude != null && mapLongitude != null ? `${mapLatitude}:${mapLongitude}` : null
	);

	useEffect(() => {
		if (status !== 'loading') {
			setShowLoading(false);
			return;
		}
		const timeout = setTimeout(() => setShowLoading(true), 2000);
		return () => clearTimeout(timeout);
	}, [status]);

	useEffect(() => {
		if (!mapReady || mapLatitude == null || mapLongitude == null) return;
		const location = `${mapLatitude}:${mapLongitude}`;
		if (initializedLocation.current === location) {
			initializedLocation.current = null;
			return;
		}
		initializedLocation.current = null;
		cameraRef.current?.easeTo({ center: [mapLongitude, mapLatitude], zoom: 7, duration: 500 });
	}, [mapLatitude, mapLongitude, mapReady]);

	const updateMarkerAnchor = async () => {
		if (!mapRef.current || !weatherPoint) return;
		const [x, y] = await mapRef.current.project(weatherPoint.lngLat);
		setMarkerAnchor({ x, y });
	};

	const handleMapPress: NonNullable<MapProps['onPress']> = async (event) => {
		setShowLegend(false);
		const [x, y] = event.nativeEvent.point;
		setMarkerAnchor({ x, y });
		await requestWeatherPoint(event.nativeEvent.lngLat, layer);
	};

	const handleLayerChange = (nextLayer: WeatherMapLayer) => {
		setStatus('loading');
		setLayer(nextLayer);
		clearWeatherPoint();
		setMarkerAnchor(null);
	};

	const handleLayout = (event: LayoutChangeEvent) => {
		setMapSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height });
	};

	const closePopup = () => {
		clearWeatherPoint();
		setMarkerAnchor(null);
	};

	const handleLegendChange = (show: boolean) => {
		setShowLegend(show);
		if (show) closePopup();
	};

	const changeZoom = async (change: number) => {
		const zoom = await mapRef.current?.getZoom();
		if (zoom != null) cameraRef.current?.zoomTo(zoom + change, { duration: 300 });
	};

	return (
		<View className="relative flex w-full flex-1 overflow-hidden" onLayout={handleLayout}>
			<Map
				ref={mapRef}
				mapStyle={getBaseMapUrl(baseMap)}
				style={{ flex: 1 }}
				attribution={false}
				logo={false}
				compass={false}
				touchRotate={true}
				touchPitch={false}
				onPress={handleMapPress}
				onDidFinishRenderingMapFully={() => {
					setMapReady(true);
					setStatus('ready');
				}}
				onDidFailLoadingMap={() => setStatus('error')}
				onRegionIsChanging={(event) => setBearing(event.nativeEvent.bearing)}
				onRegionDidChange={updateMarkerAnchor}
			>
				<Camera
					ref={cameraRef}
					initialViewState={{
						center: mapLatitude != null && mapLongitude != null ? [mapLongitude, mapLatitude] : [0, 0],
						zoom: mapLatitude != null && mapLongitude != null ? 7 : 2,
					}}
				/>
				<RasterSource
					key={layer}
					id="weatherapi"
					tiles={[getWeatherTileUrl(layer)]}
					tileSize={256}
					minzoom={0}
					maxzoom={6}
				>
					<Layer id="weatherapi-layer" type="raster" source="weatherapi" paint={weatherRasterPaint} />
				</RasterSource>
			</Map>
			{showCompass && Platform.OS === 'ios' && (
				<MapNavigationControls
					onZoomIn={() => changeZoom(1)}
					onZoomOut={() => changeZoom(-1)}
					onLocate={() => {
						if (mapLatitude != null && mapLongitude != null) {
							cameraRef.current?.easeTo({ center: [mapLongitude, mapLatitude], zoom: 7, duration: 500 });
						}
					}}
				/>
			)}
			{showCompass && (
				<MapCompass bearing={bearing} onPress={() => cameraRef.current?.setStop({ bearing: 0, duration: 300 })} />
			)}

			{showLoading && (
				<View pointerEvents="none" className="absolute inset-0 z-20 items-center justify-center">
					<View className="bg-systemBackground dark:bg-secondarySystemBackground_dark flex-row items-center gap-3 rounded-full px-5 py-3 shadow-lg">
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
				baseMap={baseMap}
				onLayerChange={handleLayerChange}
				onBaseMapChange={(style) => {
					setStatus('loading');
					setBaseMap(style);
				}}
				showLegend={showLegend}
				onLegendChange={handleLegendChange}
			/>
		</View>
	);
};

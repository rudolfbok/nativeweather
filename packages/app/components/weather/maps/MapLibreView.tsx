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
import { ActivityIndicator, LayoutChangeEvent, View } from 'react-native';
import { MapControls } from './MapControls';
import { MapCompass } from './MapCompass';
import { MapWeatherPopup } from './MapWeatherPopup';

type Point = { x: number; y: number };
type Size = { width: number; height: number };

export const MapLibreView = ({ showCompass = true }: { showCompass?: boolean }) => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const { layer, setLayer } = useMapLayer();
	const { weatherPoint, requestWeatherPoint, clearWeatherPoint } = useMapWeatherPoint(t('wind.current.gust'));
	const [baseMap, setBaseMap] = useState<BaseMapStyle>('liberty');
	const [status, setStatus] = useState<MapLoadStatus>('loading');
	const [mapSize, setMapSize] = useState<Size>({ width: 0, height: 0 });
	const [markerAnchor, setMarkerAnchor] = useState<Point | null>(null);
	const [bearing, setBearing] = useState(0);
	const [showLegend, setShowLegend] = useState(false);
	const mapRef = useRef<MapRef | null>(null);
	const cameraRef = useRef<CameraRef | null>(null);
	const mapLatitude = weatherData?.location?.lat;
	const mapLongitude = weatherData?.location?.lon;

	useEffect(() => {
		if (mapLatitude == null || mapLongitude == null) return;
		cameraRef.current?.easeTo({ center: [mapLongitude, mapLatitude], zoom: 7, duration: 500 });
	}, [mapLatitude, mapLongitude]);

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
				onDidFinishLoadingStyle={() => setStatus('ready')}
				onDidFailLoadingMap={() => setStatus('error')}
				onRegionIsChanging={(event) => setBearing(event.nativeEvent.bearing)}
				onRegionDidChange={updateMarkerAnchor}
			>
				<Camera ref={cameraRef} initialViewState={{ center: [0, 0], zoom: 2 }} />
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
			{showCompass && (
				<MapCompass
					bearing={bearing}
					onPress={() => cameraRef.current?.setStop({ bearing: 0, duration: 300 })}
				/>
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

import { useTranslate } from '@tolgee/react';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import {
	getBaseMapUrl,
	getWeatherTileUrl,
	type BaseMapStyle,
	type MapLoadStatus,
	type WeatherMapLayer,
} from '@nativeweather/core/constants/weatherMap';
import { useMapLayer } from '@nativeweather/ui/hooks/maps/useMapLayer';
import { useMapWeatherPoint } from '@nativeweather/ui/hooks/maps/useMapWeatherPoint';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, type LayoutChangeEvent, View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { MapCompass } from '../ui/MapCompass';
import { MapControls } from '../ui/MapControls';
import { MapNavigationControls } from '../ui/MapNavigationControls';
import { MapWeatherPopup } from '../ui/MapWeatherPopup';

type Point = { x: number; y: number };
type Size = { width: number; height: number };
type MapCommand =
	| {
			type: 'configure';
			styleUrl: string;
			weatherUrl: string;
			weatherVisible: boolean;
			interactive: boolean;
			center: [number, number];
			zoom: number;
	  }
	| { type: 'center'; center: [number, number]; zoom: number }
	| { type: 'zoom'; delta: number }
	| { type: 'resetNorth' }
	| { type: 'clearSelection' };
type MapEvent =
	| { type: 'bridgeReady' }
	| { type: 'ready' }
	| { type: 'error' }
	| { type: 'bearing'; bearing: number }
	| { type: 'anchor'; x: number; y: number }
	| { type: 'press'; lng: number; lat: number; x: number; y: number };

const MAP_HTML = `<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
	<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'unsafe-inline' https://cdn.jsdelivr.net; img-src data: blob: https:; connect-src https:; font-src data: https:; worker-src blob:;" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.css" />
	<style>
		html, body, #map { width: 100%; height: 100%; margin: 0; overflow: hidden; background: transparent; }
		body { user-select: none; -webkit-user-select: none; }
		.maplibregl-canvas { outline: none; }
	</style>
</head>
<body>
	<div id="map"></div>
	<script src="https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.js"></script>
	<script>
		(function () {
			var SOURCE_ID = 'weatherapi';
			var LAYER_ID = 'weatherapi-layer';
			var state = { configured: false, style: 'https://tiles.openfreemap.org/styles/liberty', weatherUrl: '', weatherVisible: false, interactive: false, selected: null };
			var configurationVersion = 0;
			var appliedVersion = -1;
			var frame = null;
			var post = function (message) {
				if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(message));
			};
			var map = new maplibregl.Map({
				container: 'map',
				style: state.style,
				center: [0, 0],
				zoom: 2,
				attributionControl: false,
				dragRotate: true,
				pitchWithRotate: false,
				renderWorldCopies: true
			});

			var applyWeather = function (version) {
				version = typeof version === 'number' ? version : configurationVersion;
				if (!state.configured || version !== configurationVersion || version === appliedVersion) return;
				if (!map.isStyleLoaded()) {
					setTimeout(function () { applyWeather(version); }, 50);
					return;
				}
				try {
					if (map.getLayer(LAYER_ID)) map.removeLayer(LAYER_ID);
					if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
					if (state.weatherVisible && state.weatherUrl) {
						map.addSource(SOURCE_ID, { type: 'raster', tiles: [state.weatherUrl], tileSize: 256, minzoom: 0, maxzoom: 6 });
						map.addLayer({
							id: LAYER_ID,
							type: 'raster',
							source: SOURCE_ID,
							paint: { 'raster-fade-duration': 300, 'raster-opacity': 0.6, 'raster-resampling': 'linear' }
						});
					}
					map.resize();
					appliedVersion = version;
					post({ type: 'ready' });
				} catch (error) {
					post({ type: 'error' });
				}
			};
			var postAnchor = function () {
				frame = null;
				if (!state.selected) return;
				var point = map.project(state.selected);
				post({ type: 'anchor', x: point.x, y: point.y });
			};

			map.on('style.load', function () { applyWeather(configurationVersion); });
			new ResizeObserver(function () { map.resize(); }).observe(document.getElementById('map'));
			map.on('error', function () {
				if (!map.isStyleLoaded()) post({ type: 'error' });
			});
			map.on('rotate', function () { post({ type: 'bearing', bearing: map.getBearing() }); });
			map.on('move', function () {
				if (!frame) frame = requestAnimationFrame(postAnchor);
			});
			map.on('click', function (event) {
				if (!state.weatherVisible || !state.interactive) return;
				state.selected = [event.lngLat.lng, event.lngLat.lat];
				post({ type: 'press', lng: event.lngLat.lng, lat: event.lngLat.lat, x: event.point.x, y: event.point.y });
			});

			window.NativeWeatherMap = {
				receive: function (command) {
					if (!command || typeof command.type !== 'string') return;
					if (command.type === 'configure' && typeof command.styleUrl === 'string' && typeof command.weatherUrl === 'string') {
						var styleChanged = state.style !== command.styleUrl;
						configurationVersion += 1;
						state.configured = true;
						state.style = command.styleUrl;
						state.weatherUrl = command.weatherUrl;
						state.weatherVisible = command.weatherVisible === true;
						state.interactive = command.interactive === true;
						if (styleChanged) {
							// setStyle removes the custom weather source/layer. The style.load
							// handler re-adds it after the new base style is ready; applying it
							// here can race with the style reset and leave the layer missing.
							map.setStyle(command.styleUrl);
						} else {
							applyWeather(configurationVersion);
						}
						if (Array.isArray(command.center)) map.easeTo({ center: command.center, zoom: command.zoom, duration: 500 });
					} else if (command.type === 'center' && Array.isArray(command.center)) {
						map.easeTo({ center: command.center, zoom: command.zoom, duration: 500 });
					} else if (command.type === 'zoom' && typeof command.delta === 'number') {
						map.easeTo({ zoom: map.getZoom() + command.delta, duration: 300 });
					} else if (command.type === 'resetNorth') {
						map.resetNorth({ duration: 300 });
					} else if (command.type === 'clearSelection') {
						state.selected = null;
					}
				}
			};
			post({ type: 'bridgeReady' });
		})();
	</script>
</body>
</html>`;

const parseMapEvent = (data: string): MapEvent | null => {
	try {
		const event = JSON.parse(data) as MapEvent;
		return event && typeof event.type === 'string' ? event : null;
	} catch {
		return null;
	}
};

export const MapLibreView = ({ showCompass = false }: { showCompass?: boolean }) => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const { layer, setLayer } = useMapLayer();
	const { weatherPoint, requestWeatherPoint, clearWeatherPoint } = useMapWeatherPoint(t('wind.current.gust'));
	const [baseMap, setBaseMap] = useState<BaseMapStyle>('liberty');
	const [status, setStatus] = useState<MapLoadStatus>('loading');
	const [mapSize, setMapSize] = useState<Size>({ width: 0, height: 0 });
	const [markerAnchor, setMarkerAnchor] = useState<Point | null>(null);
	const [bearing, setBearing] = useState(0);
	const [weatherLayerVisible, setWeatherLayerVisible] = useState(true);
	const [showLegend, setShowLegend] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const [bridgeReady, setBridgeReady] = useState(false);
	const webViewRef = useRef<WebView>(null);
	const lastControlInteraction = useRef(0);
	const mapLatitude = weatherData?.location?.lat;
	const mapLongitude = weatherData?.location?.lon;

	const send = useCallback((command: MapCommand) => {
		const payload = JSON.stringify(command).replaceAll('<', '\\u003c');
		webViewRef.current?.injectJavaScript(`window.NativeWeatherMap.receive(${payload}); true;`);
	}, []);

	useEffect(() => {
		if (status !== 'loading') return;
		const timeout = setTimeout(() => setShowLoading(true), 2000);
		return () => clearTimeout(timeout);
	}, [status]);

	useEffect(() => {
		if (!bridgeReady) return;
		send({
			type: 'configure',
			styleUrl: getBaseMapUrl(baseMap),
			weatherUrl: getWeatherTileUrl(layer),
			weatherVisible: weatherLayerVisible,
			interactive: showCompass,
			center: mapLatitude != null && mapLongitude != null ? [mapLongitude, mapLatitude] : [0, 0],
			zoom: mapLatitude != null && mapLongitude != null ? 7 : 2,
		});
	}, [baseMap, bridgeReady, layer, mapLatitude, mapLongitude, send, showCompass, weatherLayerVisible]);

	const closePopup = () => {
		clearWeatherPoint();
		setMarkerAnchor(null);
		send({ type: 'clearSelection' });
	};

	const handleLayerChange = (nextLayer: WeatherMapLayer) => {
		if (nextLayer === layer && weatherLayerVisible) return;
		setStatus('loading');
		setShowLoading(false);
		setWeatherLayerVisible(true);
		setLayer(nextLayer);
		closePopup();
	};

	const handleClearLayer = () => {
		setStatus('loading');
		setShowLoading(false);
		setWeatherLayerVisible(false);
		setShowLegend(false);
		closePopup();
	};

	const handleLegendChange = (show: boolean) => {
		setShowLegend(show);
		if (show) closePopup();
	};

	const handleMessage = (event: WebViewMessageEvent) => {
		const message = parseMapEvent(event.nativeEvent.data);
		if (!message) return;

		if (message.type === 'bridgeReady') setBridgeReady(true);
		else if (message.type === 'ready') {
			setShowLoading(false);
			setStatus('ready');
		} else if (message.type === 'error') {
			setShowLoading(false);
			setStatus('error');
		} else if (message.type === 'bearing' && Number.isFinite(message.bearing)) setBearing(message.bearing);
		else if (message.type === 'anchor' && Number.isFinite(message.x) && Number.isFinite(message.y)) {
			setMarkerAnchor({ x: message.x, y: message.y });
		} else if (
			showCompass &&
			message.type === 'press' &&
			[message.lng, message.lat, message.x, message.y].every(Number.isFinite)
		) {
			if (Date.now() - lastControlInteraction.current < 500) return;
			setShowLegend(false);
			setMarkerAnchor({ x: message.x, y: message.y });
			requestWeatherPoint([message.lng, message.lat], layer);
		}
	};

	const handleLayout = (event: LayoutChangeEvent) => setMapSize(event.nativeEvent.layout);
	const markControlInteraction = () => {
		lastControlInteraction.current = Date.now();
	};

	return (
		<View
			className="relative flex w-full flex-1 overflow-hidden rounded-3xl"
			style={{ borderRadius: 24 }}
			onLayout={handleLayout}
		>
			<WebView
				ref={webViewRef}
				source={{ html: MAP_HTML, baseUrl: 'https://nativeweather.local/' }}
				style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 24 }}
				originWhitelist={['*']}
				javaScriptEnabled={true}
				cacheEnabled={true}
				allowsBackForwardNavigationGestures={false}
				onShouldStartLoadWithRequest={({ url }) =>
					url === 'about:blank' || url.startsWith('https://nativeweather.local')
				}
				onMessage={handleMessage}
				onLoadEnd={() => setBridgeReady(true)}
				onLoadStart={() => {
					setBridgeReady(false);
					setShowLoading(false);
					setStatus('loading');
				}}
				onError={() => {
					setShowLoading(false);
					setStatus('error');
				}}
				onHttpError={() => {
					setShowLoading(false);
					setStatus('error');
				}}
			/>
			{showCompass && (
				<MapNavigationControls
					onInteraction={markControlInteraction}
					onZoomIn={() => send({ type: 'zoom', delta: 1 })}
					onZoomOut={() => send({ type: 'zoom', delta: -1 })}
					onLocate={() => {
						if (mapLatitude != null && mapLongitude != null) {
							send({ type: 'center', center: [mapLongitude, mapLatitude], zoom: 7 });
						}
					}}
				/>
			)}
			{showCompass && (
				<MapCompass
					bearing={bearing}
					onInteraction={markControlInteraction}
					onPress={() => send({ type: 'resetNorth' })}
				/>
			)}
			{showLoading && (
				<View pointerEvents="none" className="absolute inset-0 z-20 items-center justify-center">
					<View className="bg-systemBackground dark:bg-secondarySystemBackground_dark flex-row items-center gap-3 rounded-full px-5 py-3">
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
					onInteraction={markControlInteraction}
					weatherPoint={weatherPoint}
					anchor={markerAnchor}
					mapSize={mapSize}
					title={t(`maps.layer.${weatherPoint.layer === 'tmp2m' ? 0 : weatherPoint.layer === 'precip' ? 1 : 2}`)}
					errorLabel={t('maps.weatherUnavailable')}
					onClose={closePopup}
				/>
			)}
			<MapControls
				onInteraction={markControlInteraction}
				layer={layer}
				weatherLayerVisible={weatherLayerVisible}
				baseMap={baseMap}
				showInfo={showCompass}
				onLayerChange={handleLayerChange}
				onClearLayer={showCompass ? handleClearLayer : undefined}
				onBaseMapChange={(style) => {
					if (style === baseMap) return;
					setStatus('loading');
					setShowLoading(false);
					setBaseMap(style);
				}}
				showLegend={showLegend}
				onLegendChange={handleLegendChange}
			/>
		</View>
	);
};

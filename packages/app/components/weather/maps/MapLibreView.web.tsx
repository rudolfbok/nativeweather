import { useTranslate } from '@tolgee/react';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';
import { CloudsIcon } from 'app/components/icons/CloudsIcon';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useMapLayer } from 'app/hooks/useMapLayer';
import { useWeather } from 'app/hooks/useWeather';
import { clsx } from 'clsx';
import { CloudRain, InfoIcon, Thermometer, X } from 'lucide-react-native';
import maplibregl, { Map as MapLibreMap } from 'maplibre-gl';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { TemperatureInfo } from './TemperatureInfo';

const WEATHER_SOURCE_ID = 'openweather';
const WEATHER_LAYER_ID = 'openweather-layer';
const OPENSTREETMAP_VECTOR_STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';

const layerButtons = [
	{ layer: 'temp_new', icon: <Thermometer color="#FF7000" /> },
	{ layer: 'precipitation_new', icon: <CloudRain color="#2793FF" /> },
	{ layer: 'clouds_new', icon: <CloudsIcon /> },
];

const setWeatherLayer = (map: MapLibreMap, layer: string) => {
	if (map.getLayer(WEATHER_LAYER_ID)) {
		map.removeLayer(WEATHER_LAYER_ID);
	}

	if (map.getSource(WEATHER_SOURCE_ID)) {
		map.removeSource(WEATHER_SOURCE_ID);
	}

	map.addSource(WEATHER_SOURCE_ID, {
		type: 'raster',
		tiles: [`https://my-openweather-proxy.rudolf-bok-account.workers.dev/${layer}/{z}/{x}/{y}.png`],
		tileSize: 256,
		maxzoom: 19,
	});

	map.addLayer({
		id: WEATHER_LAYER_ID,
		type: 'raster',
		source: WEATHER_SOURCE_ID,
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
	const [showLegend, setShowLegend] = useState(false);
	const [isMapReady, setIsMapReady] = useState(false);
	const [map, setMap] = useState<MapLibreMap | null>(null);
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const switchColors = useSwitchColors('black', 'white');
	const mapLatitude = weatherData?.location?.lat;
	const mapLongitude = weatherData?.location?.lon;

	useEffect(() => {
		if (!mapContainerRef.current) return;

		const mapInstance = new maplibregl.Map({
			container: mapContainerRef.current,
			style: OPENSTREETMAP_VECTOR_STYLE_URL,
			center: [0, 0],
			zoom: 2,
			attributionControl: false,
			dragRotate: false,
			pitchWithRotate: false,
			scrollZoom: true,
		});

		const handleLoad = () => setIsMapReady(true);
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
			map.once('load', updateLayer);
		}

		return () => {
			map.off('load', updateLayer);
		};
	}, [layer, map]);

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

	return (
		<View className={clsx('relative flex w-full flex-1 overflow-hidden rounded-3xl')}>
			<div ref={mapContainerRef} className={clsx('h-full w-full rounded-3xl')} />
			{!isMapReady && (
				<View className={clsx('absolute inset-0 items-center justify-center')}>
					<StyledText type="body">{t('maps.loading')}</StyledText>
				</View>
			)}
			<View className={clsx('absolute bottom-4 right-4 flex-row items-end gap-2')}>
				{!showLegend && layer === 'temp_new' && (
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
			{showLegend && layer === 'temp_new' && (
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
							<TemperatureInfo />
						</RoundView>
					</AnimatedView>
				</View>
			)}
		</View>
	);
};

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/ui/RoundView';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { CloudsIcon } from 'app/components/icons/CloudsIcon';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useWeather } from 'app/hooks/useWeather';
import { clsx } from 'clsx';
import { CloudRain, InfoIcon, Thermometer, X } from 'lucide-react-native';
import { ReactNode, useEffect, useState } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { mapColorTheme } from './GoogleMapsTheme';
import { TemperatureInfo } from './TemperatureInfo';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';

export const GoogleMapsView = ({ className }: { className?: string }) => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const [showLegend, setShowLegend] = useState(false);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [layer, setLayer] = useState<string | null>('temp_new');
	const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

	const switchColors = useSwitchColors('black', 'white');

	const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: GOOGLE_API_KEY,
	});

	const mapOptions = {
		disableDefaultUI: true,
		styles: mapColorTheme(layer),
		// gestureHandling: 'cooperative',
	};

	useEffect(() => {
		if (weatherData?.location) {
			const newCenter = {
				lat: weatherData.location.lat,
				lng: weatherData.location.lon,
			};
			setMapCenter(newCenter);

			if (map) {
				map.panTo(newCenter);
				map.setZoom(10);
			}
		}
	}, [weatherData, map]);

	const handleOnLoad = (mapInstance: google.maps.Map) => {
		setMap(mapInstance);
		if (weatherData?.location) {
			mapInstance.setCenter({
				lat: weatherData.location.lat,
				lng: weatherData.location.lon,
			});
		}
	};

	useEffect(() => {
		if (!map) return;

		const weatherTile = new window.google.maps.ImageMapType({
			getTileUrl: (coord, zoom) =>
				`https://my-openweather-proxy.rudolf-bok-account.workers.dev/${layer}/${zoom}/${coord.x}/${coord.y}.png`,
			tileSize: new window.google.maps.Size(256, 256),
			opacity: 5,
			name: 'Weather',
			maxZoom: 19,
			minZoom: 0,
		});

		map.overlayMapTypes.clear();
		map.overlayMapTypes.insertAt(0, weatherTile);
		map.setOptions({ gestureHandling: 'cooperative' });

		return () => {
			map.overlayMapTypes.clear();
		};
	}, [map, layer]);

	if (!isLoaded) {
		return (
			<View className={clsx('h-full items-center justify-center')}>
				<StyledText type="body">{t('maps.loading')}</StyledText>
			</View>
		);
	}

	if (!GOOGLE_API_KEY) {
		console.error('Google Maps API key is missing!');
		return (
			<View className={clsx('h-full items-center justify-center')}>
				<StyledText type="body">Maps unavailable - missing API key</StyledText>
			</View>
		);
	}

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

	const layerButtons = [
		{ layer: 'temp_new', icon: <Thermometer color="#FF7000" /> },
		{ layer: 'precipitation_new', icon: <CloudRain color="#2793FF" /> },
		{ layer: 'clouds_new', icon: <CloudsIcon /> },
	];

	return (
		<View className={clsx('flex w-full', className)}>
			<GoogleMap
				mapContainerClassName={clsx('h-full w-full rounded-3xl')}
				center={mapCenter}
				zoom={7}
				onLoad={handleOnLoad}
				options={mapOptions}
			/>
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

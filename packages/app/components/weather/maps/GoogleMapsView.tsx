import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useTranslate } from '@tolgee/react';
import { fetchLocation } from 'app/api/fetchWeather';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { useWeather } from 'app/hooks/useWeather';
import { clsx } from 'clsx';
import { CloudRain, InfoIcon, Thermometer, X } from 'lucide-react-native';
import { ReactNode, useEffect, useState } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { StyledPressable } from 'app/components/common/StyledPressable';
import { StyledText } from 'app/components/common/StyledText';
import { CloudsIcon } from 'app/components/icons/CloudsIcon';
import { TemperatureInfo } from './TemperatureInfo';
import { RoundView } from 'app/components/common/RoundView';
import { mapColorTheme } from './GoogleMapsTheme';

export const GoogleMapsView = ({ className }: { className?: string }) => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const [showLegend, setShowLegend] = useState(false);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [layer, setLayer] = useState<string | null>('temp_new');
	const [mapCenter, setMapCenter] = useState({ lat, lng: lon });

	const switchColors = useSwitchColors('black', 'white');

	useEffect(() => {
		if (map && mapCenter) {
			map.setCenter(mapCenter);
			map.setZoom(10);
		}
	}, [weatherData]);

	const GOOGLE_API_KEY = 'REDACTED_GOOGLE_MAPS_API_KEY'!;
	const OPENWEATHER_API_KEY = 'REDACTED_OPENWEATHER_API_KEY';

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: GOOGLE_API_KEY,
	});

	const mapOptions = {
		disableDefaultUI: true,
		styles: mapColorTheme(layer),
		// gestureHandling: 'cooperative',
	};

	const handleLocationSearch = async (location: string) => {
		function removeAccents(input: string) {
			return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		}

		const trimmedLocation = removeAccents(location);

		if (trimmedLocation) {
			const { locationData } = await fetchLocation(trimmedLocation);

			if (locationData) {
				setLat(locationData[0].lat);
				setLon(locationData[0].lon);
				setMapCenter({ lat: locationData[0].lat, lng: locationData[0].lon });
			}
		}
	};

	useEffect(() => {
		if (weatherData?.location?.name) {
			const locationString = [
				weatherData.location.name,
				weatherData.location.region,
				weatherData.location.country,
			].join(', ');
			handleLocationSearch(locationString);
		}
	}, [weatherData!.location.name, weatherData?.location.region, weatherData?.location.country]);

	useEffect(() => {
		if (!map) return;

		const weatherTile = new window.google.maps.ImageMapType({
			getTileUrl: (coord, zoom) =>
				`https://tile.openweathermap.org/map/${layer}/${zoom}/${coord.x}/${coord.y}.png?appid=${OPENWEATHER_API_KEY}`,
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
		return <StyledText type="body">{t('maps.loading')}</StyledText>;
	}

	if (!GOOGLE_API_KEY) {
		console.error('Google Maps API key is missing!');
		return <StyledText type="body">Maps unavailable - missing API key</StyledText>;
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
				onLoad={setMap}
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
				<View className={clsx('absolute bottom-4 left-4 right-4')}>
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
				</View>
			)}
		</View>
	);
};

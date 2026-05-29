import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';
import { TileLiberty } from 'app/components/icons/TileLiberty';
import { TilePositron } from 'app/components/icons/TilePositron';
import { switchMetrics } from 'app/utils/switch/switchMetrics';
import { switchTemp } from 'app/utils/switch/switchTemp';
import { clsx } from 'clsx';
import { CloudRain, InfoIcon, Thermometer, Wind, X } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import { MapsLegend, PrecipitationInfo, WindInfo } from './MapsLegend';

export const WEATHER_SOURCE_ID = 'weatherapi';
export const WEATHER_LAYER_ID = 'weatherapi-layer';
export const OPENFREEMAP_LIBERTY = 'https://tiles.openfreemap.org/styles/liberty';
export const OPENFREEMAP_POSITRON = 'https://tiles.openfreemap.org/styles/positron';
export const TEMPERATURE_CARD_WIDTH = 220;
export const TEMPERATURE_CARD_HEIGHT = 120;
export const TEMPERATURE_CARD_OFFSET = 12;

export type WeatherMarker = {
	requestId: number;
	lngLat: [number, number];
	point: { x: number; y: number };
	layer: string;
	status: 'loading' | 'ready' | 'error';
	value?: string;
	detail?: string;
	location?: string;
};

export type WeatherApiCurrent = {
	temp_c?: number;
	temp_f?: number;
	precip_mm?: number;
	precip_in?: number;
	wind_kph?: number;
	wind_mph?: number;
	gust_kph?: number;
	gust_mph?: number;
	wind_dir?: string;
};

export type MapSize = {
	width: number;
	height: number;
};

export const layerButtons = [
	{ layer: 'tmp2m', icon: <Thermometer color="#FF7000" /> },
	{ layer: 'precip', icon: <CloudRain color="#2793FF" /> },
	{ layer: 'wind', icon: <Wind color="gray" /> },
];

export const tileButtons = [
	{ style: OPENFREEMAP_LIBERTY, icon: <TileLiberty /> },
	{ style: OPENFREEMAP_POSITRON, icon: <TilePositron /> },
];

export const getWeatherApiMapPeriod = () => {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = String(now.getUTCMonth() + 1).padStart(2, '0');
	const day = String(now.getUTCDate()).padStart(2, '0');
	const hour = String(now.getUTCHours()).padStart(2, '0');

	return `${year}${month}${day}${hour}`;
};

export const formatWeatherMarker = (
	layer: string,
	current: WeatherApiCurrent,
	currentTemp: string | undefined,
	currentUnits: string | undefined,
	gustLabel: string
) => {
	if (layer === 'precip') {
		if (current.precip_mm == null || current.precip_in == null) return null;

		return {
			value: switchMetrics({
				metric: `${current.precip_mm.toFixed(1)} mm`,
				imperial: `${current.precip_in.toFixed(2)} in`,
				currentUnits,
			}),
		};
	}

	if (layer === 'wind') {
		if (current.wind_kph == null || current.wind_mph == null) return null;

		const value = switchMetrics({
			metric: `${Math.round(current.wind_kph)} km/h`,
			imperial: `${Math.round(current.wind_mph)} mph`,
			currentUnits,
		});
		const gust =
			current.gust_kph == null || current.gust_mph == null
				? null
				: `${gustLabel} ${switchMetrics({
						metric: `${Math.round(current.gust_kph)} km/h`,
						imperial: `${Math.round(current.gust_mph)} mph`,
						currentUnits,
					})}`;
		const detail = [current.wind_dir, gust].filter(Boolean).join(' - ');

		return { value, detail };
	}

	if (current.temp_c == null || current.temp_f == null) return null;

	return {
		value: switchTemp({
			celsius: current.temp_c,
			fahrenheit: current.temp_f,
			currentTemp,
			includeUnit: true,
		}),
	};
};

export const getTemperatureCardPoint = (point: { x: number; y: number }, size: MapSize) => {
	const maxX = Math.max(TEMPERATURE_CARD_OFFSET, size.width - TEMPERATURE_CARD_WIDTH - TEMPERATURE_CARD_OFFSET);
	const maxY = Math.max(TEMPERATURE_CARD_OFFSET, size.height - TEMPERATURE_CARD_HEIGHT - TEMPERATURE_CARD_OFFSET);

	return {
		x: Math.min(Math.max(point.x + TEMPERATURE_CARD_OFFSET, TEMPERATURE_CARD_OFFSET), maxX),
		y: Math.min(Math.max(point.y - TEMPERATURE_CARD_OFFSET, TEMPERATURE_CARD_OFFSET), maxY),
	};
};

export const getWeatherMarkerTitle = (markerLayer: string, t: (key: string) => string) => {
	if (markerLayer === 'precip') return t('maps.layer.1');
	if (markerLayer === 'wind') return t('maps.layer.2');

	return t('maps.layer.0');
};

export const getLayerInfo = (layer: string) => {
	if (layer === 'precip') return <PrecipitationInfo />;
	if (layer === 'wind') return <WindInfo />;

	return <MapsLegend />;
};

export const MapButton = ({
	onPress,
	icon,
	className,
}: {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	icon: ReactNode;
	className?: string;
}) => {
	return (
		<StyledPressable onPress={onPress} className={clsx('border border-transparent', className)}>
			{icon}
		</StyledPressable>
	);
};

export const WeatherMarkerCard = ({
	weatherMarker,
	title,
	unavailableLabel,
	onClose,
	className,
	loadingClassName,
}: {
	weatherMarker: WeatherMarker;
	title: string;
	unavailableLabel: string;
	onClose: () => void;
	className?: string;
	loadingClassName?: string;
}) => {
	return (
		<View
			className={clsx(
				'bg-systemBackground absolute z-10 rounded-3xl border border-black/10 p-3 shadow-md',
				'dark:bg-secondarySystemBackground_dark dark:border-white/10 dark:shadow-white/10',
				weatherMarker.status !== 'ready' && loadingClassName,
				className
			)}
			style={{ left: weatherMarker.point.x, top: weatherMarker.point.y }}
		>
			{weatherMarker.status === 'loading' && <ActivityIndicator size="small" color="#007AFF" />}
			{weatherMarker.status === 'error' && (
				<StyledText type="bodysecondary" className={clsx('font-semibold')}>
					{unavailableLabel}
				</StyledText>
			)}
			<View>
				<View className="flex-row items-center justify-between gap-2">
					{weatherMarker.status === 'ready' && weatherMarker.value && (
						<StyledText type="bodysecondary" className={clsx('opacity-70')}>
							{title}
						</StyledText>
					)}
					<StyledPressable onPress={onClose} className={clsx('h-fit rounded-full p-1')}>
						<X color="#007AFF" size={20} />
					</StyledPressable>
				</View>
				{weatherMarker.status === 'ready' && weatherMarker.value && (
					<View>
						<StyledText type="title" className={clsx('font-bold')}>
							{weatherMarker.value}
						</StyledText>
						{!!weatherMarker.detail && (
							<StyledText type="bodysecondary" className={clsx('opacity-70')}>
								{weatherMarker.detail}
							</StyledText>
						)}
						{!!weatherMarker.location && (
							<StyledText type="bodysecondary" className={clsx('opacity-70')}>
								{weatherMarker.location}
							</StyledText>
						)}
					</View>
				)}
			</View>
		</View>
	);
};

export const MapTileControls = ({
	className,
	buttonClassName,
	onTilePress,
}: {
	className?: string;
	buttonClassName?: string;
	onTilePress: (style: string) => void;
}) => {
	return (
		<View className={clsx(className)}>
			{tileButtons.map(({ style, icon }) => (
				<MapButton key={style} icon={icon} className={buttonClassName} onPress={() => onTilePress(style)} />
			))}
		</View>
	);
};

export const MapLoadingOverlay = ({ visible, label }: { visible: boolean; label: string }) => {
	if (!visible) return null;

	return (
		<View className={clsx('absolute inset-0 flex-row items-center justify-center gap-2')}>
			<ActivityIndicator size="small" color="#007AFF" />
			<StyledText type="body">{label}</StyledText>
		</View>
	);
};

export const MapLayerControls = ({
	className,
	buttonClassName,
	infoButtonClassName,
	showLegend,
	switchColors,
	onLayerPress,
	onToggleLegend,
}: {
	className?: string;
	buttonClassName?: string;
	infoButtonClassName?: string;
	showLegend: boolean;
	switchColors: string;
	onLayerPress: (layer: string) => void;
	onToggleLegend: () => void;
}) => {
	return (
		<View className={clsx(className)}>
			{!showLegend && (
				<StyledPressable onPress={onToggleLegend} className={clsx('h-fit', infoButtonClassName)}>
					<InfoIcon color={switchColors} />
				</StyledPressable>
			)}
			<View className={clsx('gap-2')}>
				{layerButtons.map(({ layer, icon }, index) => (
					<MapButton key={index} onPress={() => onLayerPress(layer)} icon={icon} className={buttonClassName} />
				))}
			</View>
		</View>
	);
};

export const MapLegendOverlay = ({
	visible,
	className,
	closeButtonClassName,
	title,
	layer,
	onToggleLegend,
}: {
	visible: boolean;
	className?: string;
	closeButtonClassName?: string;
	title: string;
	layer: string;
	onToggleLegend: () => void;
}) => {
	if (!visible) return null;

	return (
		<View className={clsx(className)}>
			<AnimatedView duration={30}>
				<RoundView className={clsx('p-4')}>
					<View className={clsx('flex w-full flex-row items-center justify-between')}>
						<StyledText type="subtitle">{title}</StyledText>
						<Pressable onPress={onToggleLegend} className={clsx(closeButtonClassName)}>
							<X color="#007AFF" />
						</Pressable>
					</View>
					{getLayerInfo(layer)}
				</RoundView>
			</AnimatedView>
		</View>
	);
};

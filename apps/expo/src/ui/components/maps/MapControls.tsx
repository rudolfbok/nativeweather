import type { BaseMapStyle, WeatherMapLayer } from '@/core';
import { useTranslate } from '@tolgee/react';
import { CloudOff, Copyright, Info, Locate, Minus, Plus, X } from '@/ui/components/icons/lucide';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Linking, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { Pressable } from '../common/Pressable';
import { RoundView } from '../common/RoundView';
import { Text } from '../common/Text';
import { MapIcon } from '../icons/main/MapIcon';
import { RainIcon, WindIcon } from '../icons/main/MetricIcons';
import { NoColorMapIcon } from '../icons/maps/NoColorMapIcon';
import { ThermometerIcon } from '../icons/maps/ThermometerIcon';
import { MapsLegend } from './MapsLegend';

const InfoIcon = withUniwind(Info);
const CopyrightIcon = withUniwind(Copyright);
const NoLayerIcon = withUniwind(CloudOff);
const CloseIcon = withUniwind(X);
const PlusIcon = withUniwind(Plus);
const MinusIcon = withUniwind(Minus);
const LocateIcon = withUniwind(Locate);

const weatherLayers = [
	{ id: 'tmp2m', icon: <ThermometerIcon /> },
	{ id: 'precip', icon: <RainIcon /> },
	{ id: 'wind', icon: <WindIcon /> },
] as const;

const baseMaps = [
	{ id: 'liberty', icon: <MapIcon /> },
	{ id: 'positron', icon: <NoColorMapIcon /> },
] as const;

const attributions = [
	{ label: 'OpenFreeMap', url: 'https://openfreemap.org' },
	{ label: '© OpenMapTiles', url: 'https://openmaptiles.org' },
	{ label: '© OpenStreetMap contributors', url: 'https://www.openstreetmap.org/copyright' },
	{ label: 'WeatherAPI', url: 'https://www.weatherapi.com' },
] as const;

const MapButton = ({ onPress, children, label }: { onPress: () => void; children: ReactNode; label: string }) => (
	<Pressable onPress={onPress} accessibilityLabel={label} className="items-center rounded-full p-2">
		{children}
	</Pressable>
);

export const MapControls = ({
	layer,
	weatherLayerVisible,
	onLayerChange,
	onClearLayer,
	onBaseMapChange,
	showLegend,
	onLegendChange,
}: {
	layer: WeatherMapLayer;
	weatherLayerVisible: boolean;
	onLayerChange: (layer: WeatherMapLayer) => void;
	/** Only the interactive map can hide the weather layer, and only it has a legend. */
	onClearLayer?: () => void;
	onBaseMapChange: (style: BaseMapStyle) => void;
	showLegend: boolean;
	onLegendChange: (show: boolean) => void;
}) => {
	const { t } = useTranslate('weather');
	const [showCredits, setShowCredits] = useState(false);

	return (
		<>
			<View className="absolute bottom-4 left-4 gap-2">
				{baseMaps.map(({ id, icon }) => (
					<MapButton key={id} label={id} onPress={() => onBaseMapChange(id)}>
						{icon}
					</MapButton>
				))}
				<MapButton label="Map credits" onPress={() => setShowCredits((show) => !show)}>
					<CopyrightIcon colorClassName="accent-label" size={20} />
				</MapButton>
			</View>
			{showCredits && (
				<RoundView className="absolute bottom-4 left-20 max-w-[60%] flex-row flex-wrap gap-x-2 px-3 py-2">
					{attributions.map(({ label, url }) => (
						<Text key={label} type="caption" onPress={() => Linking.openURL(url)}>
							{label}
						</Text>
					))}
				</RoundView>
			)}
			<View className="absolute right-4 bottom-4 flex-row items-end gap-2">
				{onClearLayer && !showLegend && weatherLayerVisible && (
					<MapButton label={t('maps.legend.title')} onPress={() => onLegendChange(true)}>
						<InfoIcon colorClassName="accent-label" />
					</MapButton>
				)}
				<View className="gap-2">
					{weatherLayers.map(({ id, icon }) => (
						<MapButton key={id} label={id} onPress={() => onLayerChange(id)}>
							{icon}
						</MapButton>
					))}
					{onClearLayer && (
						<MapButton label="Hide layer" onPress={onClearLayer}>
							<NoLayerIcon colorClassName="accent-label" />
						</MapButton>
					)}
				</View>
			</View>
			{showLegend && (
				<View className="absolute right-4 bottom-4 max-md:left-4">
					<RoundView className="w-full p-4 md:w-96">
						<View className="w-full flex-row items-center justify-between">
							<Text type="body" className="font-semibold">
								{t('maps.legend.title')}
							</Text>
							<MapButton label="Close" onPress={() => onLegendChange(false)}>
								<CloseIcon colorClassName="accent-label" size={22} />
							</MapButton>
						</View>
						<MapsLegend layer={layer} />
					</RoundView>
				</View>
			)}
		</>
	);
};

const directions = [
	'N',
	'NNE',
	'NE',
	'ENE',
	'E',
	'ESE',
	'SE',
	'SSE',
	'S',
	'SSW',
	'SW',
	'WSW',
	'W',
	'WNW',
	'NW',
	'NNW',
] as const;

/** Zoom and locate buttons (top left) plus a bearing compass that resets north (top right). */
export const MapNavigation = ({
	bearing,
	onZoomIn,
	onZoomOut,
	onLocate,
	onResetNorth,
}: {
	bearing: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onLocate: () => void;
	onResetNorth: () => void;
}) => {
	const { t } = useTranslate('weather');
	const direction = directions[Math.round((((bearing % 360) + 360) % 360) / 22.5) % directions.length];

	return (
		<>
			<View className="absolute top-4 left-4 gap-2">
				<MapButton label="Zoom in" onPress={onZoomIn}>
					<PlusIcon colorClassName="accent-label" size={24} strokeWidth={2.5} />
				</MapButton>
				<MapButton label="Zoom out" onPress={onZoomOut}>
					<MinusIcon colorClassName="accent-label" size={24} strokeWidth={2.5} />
				</MapButton>
				<MapButton label="Locate" onPress={onLocate}>
					<LocateIcon colorClassName="accent-primary-blue" size={24} strokeWidth={2.5} />
				</MapButton>
			</View>
			<View className="absolute top-4 right-4 items-center gap-1">
				<Pressable
					onPress={onResetNorth}
					accessibilityLabel="Reset north"
					className="h-11 w-11 items-center justify-center rounded-full"
				>
					<View className="h-7 w-1" style={{ transform: [{ rotate: `${-bearing}deg` }] }}>
						<View className="h-3.5 w-1 rounded-t-full bg-system-red" />
						<View className="h-3.5 w-1 rounded-b-full bg-system-gray" />
					</View>
					<View className="absolute h-2 w-2 rounded-full bg-label" />
				</Pressable>
				<View className="items-center justify-center rounded-md bg-card-background p-0.5">
					<Text type="caption" className="font-bold">
						{t(`wind.label.short.${direction}`)}
					</Text>
				</View>
			</View>
		</>
	);
};

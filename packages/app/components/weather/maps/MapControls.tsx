import { useTranslate } from '@tolgee/react';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';
import { RainIcon, WindIcon } from 'app/components/icons/main';
import { ThermometerIcon } from 'app/components/icons/maps/ThermometerIcon';
import { CloseIcon } from 'app/components/icons/ui/CloseIcon';
import { TileLiberty } from 'app/components/icons/ui/TileLiberty';
import { TilePositron } from 'app/components/icons/ui/TilePositron';
import type { BaseMapStyle, WeatherMapLayer } from 'app/constants/weatherMap';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { InfoIcon } from 'lucide-react-native';
import { ReactNode, useState } from 'react';
import { View } from 'react-native';
import { MapsLegend, PrecipitationInfo, WindInfo } from './MapsLegend';

const weatherLayers = [
	{ id: 'tmp2m' as const, icon: <ThermometerIcon />, labelKey: 'maps.layer.0' },
	{ id: 'precip' as const, icon: <RainIcon />, labelKey: 'maps.layer.1' },
	{ id: 'wind' as const, icon: <WindIcon />, labelKey: 'maps.layer.2' },
];

const baseMapButtons = [
	{ id: 'liberty' as const, icon: <TileLiberty />, labelKey: 'maps.basemap.liberty' },
	{ id: 'positron' as const, icon: <TilePositron />, labelKey: 'maps.basemap.positron' },
];

const MapButton = ({
	active,
	label,
	onPress,
	icon,
}: {
	active?: boolean;
	label: string;
	onPress: () => void;
	icon: ReactNode;
}) => (
	<StyledPressable
		onPress={onPress}
		accessibilityLabel={label}
		accessibilityRole="button"
		accessibilityState={{ selected: active }}
		className={clsx(
			'ios:p-3 items-center rounded-full border p-2',
			active ? 'border-systemBlue bg-tertiarySystemBackground dark:bg-tertiarySystemBackground_dark' : 'border-transparent'
		)}
	>
		{icon}
	</StyledPressable>
);

export const MapControls = ({
	layer,
	baseMap,
	onLayerChange,
	onBaseMapChange,
	onOpenLegend,
}: {
	layer: WeatherMapLayer;
	baseMap: BaseMapStyle;
	onLayerChange: (layer: WeatherMapLayer) => void;
	onBaseMapChange: (style: BaseMapStyle) => void;
	onOpenLegend: () => void;
}) => {
	const { t } = useTranslate('weather');
	const { text } = useThemeColors();
	const [showLegend, setShowLegend] = useState(false);
	const closeLegend = () => setShowLegend(false);
	const layerInfo = layer === 'precip' ? <PrecipitationInfo /> : layer === 'wind' ? <WindInfo /> : <MapsLegend />;

	return (
		<>
			<View className="ios:bottom-28 absolute bottom-4 left-4 gap-2">
				{baseMapButtons.map(({ id, icon, labelKey }) => (
					<MapButton
						key={id}
						active={baseMap === id}
						label={t(labelKey)}
						icon={icon}
						onPress={() => onBaseMapChange(id)}
					/>
				))}
			</View>
			<View className="ios:bottom-28 absolute bottom-4 right-4 flex-row items-end gap-2">
				{!showLegend && (
					<MapButton
						label={t('maps.legend.title')}
						icon={<InfoIcon color={text} />}
						onPress={() => {
							setShowLegend(true);
							onOpenLegend();
						}}
					/>
				)}
				<View className="gap-2">
					{weatherLayers.map(({ id, icon, labelKey }) => (
						<MapButton
							key={id}
							active={layer === id}
							label={t(labelKey)}
							icon={icon}
							onPress={() => onLayerChange(id)}
						/>
					))}
				</View>
			</View>
			{showLegend && (
				<View className="ios:bottom-28 absolute bottom-4 right-4 max-md:left-4">
					<AnimatedView duration={30}>
						<RoundView className="w-full border border-black/10 p-4 shadow-md md:w-96 dark:border-white/10 dark:shadow-white/10">
							<View className="flex w-full flex-row items-center justify-between">
								<StyledText type="body" className="font-semibold">
									{t('maps.legend.title')}
								</StyledText>
								<StyledPressable
									onPress={closeLegend}
									accessibilityLabel={t('maps.closeLegend')}
									accessibilityRole="button"
									className="rounded-full p-1"
								>
									<CloseIcon size={22} color={text} />
								</StyledPressable>
							</View>
							{layerInfo}
						</RoundView>
					</AnimatedView>
				</View>
			)}
		</>
	);
};

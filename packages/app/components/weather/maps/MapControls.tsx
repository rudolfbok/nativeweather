import { useTranslate } from '@tolgee/react';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';
import { RainIcon, WindIcon } from 'app/components/icons/main';
import { ColorMapIcon } from 'app/components/icons/maps/ColorMapIcon';
import { NoColorMapIcon } from 'app/components/icons/maps/NoColorMapIcon';
import { ThermometerIcon } from 'app/components/icons/maps/ThermometerIcon';
import { CloseIcon } from 'app/components/icons/ui/CloseIcon';
import type { BaseMapStyle, WeatherMapLayer } from 'app/constants/weatherMap';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { CloudOff, InfoIcon } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { MapsLegend, PrecipitationInfo, WindInfo } from './MapsLegend';

const weatherLayers = [
	{ id: 'tmp2m' as const, icon: <ThermometerIcon /> },
	{ id: 'precip' as const, icon: <RainIcon /> },
	{ id: 'wind' as const, icon: <WindIcon /> },
];

const baseMapButtons = [
	{ id: 'liberty' as const, icon: <ColorMapIcon /> },
	{ id: 'positron' as const, icon: <NoColorMapIcon /> },
];

const MapButton = ({ onPress, icon }: { onPress: () => void; icon: ReactNode }) => (
	<StyledPressable
		onPress={onPress}
		liquidGlass={true}
		glassEffectStyle="clear"
		// colorScheme="auto"
		className={clsx('ios:p-3 items-center rounded-full p-2.5')}
	>
		{icon}
	</StyledPressable>
);

export const MapControls = ({
	layer,
	weatherLayerVisible = true,
	baseMap,
	onLayerChange,
	onClearLayer,
	onBaseMapChange,
	showLegend,
	onLegendChange,
}: {
	layer: WeatherMapLayer;
	weatherLayerVisible?: boolean;
	baseMap: BaseMapStyle;
	onLayerChange: (layer: WeatherMapLayer) => void;
	onClearLayer?: () => void;
	onBaseMapChange: (style: BaseMapStyle) => void;
	showLegend: boolean;
	onLegendChange: (show: boolean) => void;
}) => {
	const { t } = useTranslate('weather');
	const { text } = useThemeColors();
	const layerInfo = layer === 'precip' ? <PrecipitationInfo /> : layer === 'wind' ? <WindInfo /> : <MapsLegend />;

	return (
		<>
			<View className="ios:bottom-28 ios:gap-4 ios:left-6 absolute bottom-4 left-4 gap-2">
				{baseMapButtons.map(({ id, icon }) => (
					<MapButton key={id} icon={icon} onPress={() => onBaseMapChange(id)} />
				))}
			</View>
			<View className="ios:bottom-28 ios:gap-4 ios:right-6 absolute bottom-4 right-4 flex-row items-end gap-2">
				{!showLegend && weatherLayerVisible && (
					<MapButton
						icon={<InfoIcon color={Platform.OS === 'web' ? text : 'black'} />}
						onPress={() => onLegendChange(true)}
					/>
				)}
				<View className="ios:gap-4 gap-2">
					{weatherLayers.map(({ id, icon }) => (
						<MapButton key={id} icon={icon} onPress={() => onLayerChange(id)} />
					))}
					{onClearLayer && <MapButton icon={<CloudOff color={text} />} onPress={onClearLayer} />}
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
								<StyledPressable onPress={() => onLegendChange(false)} className="rounded-full p-1">
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

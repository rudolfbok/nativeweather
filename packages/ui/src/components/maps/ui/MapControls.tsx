import { useTranslate } from '@tolgee/react';
import { AnimatedView } from '@nativeweather/ui/components/common/animated/AnimatedView';
import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { RainIcon, WindIcon } from '@nativeweather/ui/components/icons/main';
import { ColorMapIcon } from '@nativeweather/ui/components/icons/maps/ColorMapIcon';
import { NoColorMapIcon } from '@nativeweather/ui/components/icons/maps/NoColorMapIcon';
import { ThermometerIcon } from '@nativeweather/ui/components/icons/maps/ThermometerIcon';
import { CloseIcon } from '@nativeweather/ui/components/icons/ui/CloseIcon';
import type { BaseMapStyle, WeatherMapLayer } from '@nativeweather/core/constants/weatherMap';
import { border } from '@nativeweather/core/constants/border';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { CloudOff, InfoIcon } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { MapsLegend, PrecipitationInfo, WindInfo } from '../legend/MapsLegend';

const weatherLayers = [
	{ id: 'tmp2m' as const, icon: <ThermometerIcon /> },
	{ id: 'precip' as const, icon: <RainIcon /> },
	{ id: 'wind' as const, icon: <WindIcon /> },
];

const baseMapButtons = [
	{ id: 'liberty' as const, icon: <ColorMapIcon /> },
	{ id: 'positron' as const, icon: <NoColorMapIcon /> },
];

const MapButton = ({ onPress, onPressIn, icon }: { onPress: () => void; onPressIn: () => void; icon: ReactNode }) => (
	<StyledPressable
		onPress={onPress}
		onPressIn={onPressIn}
		className={clsx('ios:p-3 items-center rounded-full p-2', border)}
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
	showInfo = false,
	showLegend,
	onLegendChange,
	onInteraction = () => {},
}: {
	layer: WeatherMapLayer;
	weatherLayerVisible?: boolean;
	baseMap: BaseMapStyle;
	onLayerChange: (layer: WeatherMapLayer) => void;
	onClearLayer?: () => void;
	onBaseMapChange: (style: BaseMapStyle) => void;
	showInfo?: boolean;
	showLegend: boolean;
	onLegendChange: (show: boolean) => void;
	onInteraction?: () => void;
}) => {
	const { t } = useTranslate('weather');
	const { text } = useThemeColors();
	const layerInfo = layer === 'precip' ? <PrecipitationInfo /> : layer === 'wind' ? <WindInfo /> : <MapsLegend />;

	return (
		<>
			<View className="ios:bottom-28 ios:gap-4 ios:left-6 absolute bottom-4 left-4 gap-2">
				{baseMapButtons.map(({ id, icon }) => (
					<MapButton key={id} icon={icon} onPressIn={onInteraction} onPress={() => onBaseMapChange(id)} />
				))}
			</View>
			<View className="ios:bottom-28 ios:gap-4 ios:right-6 absolute bottom-4 right-4 flex-row items-end gap-2">
				{showInfo && !showLegend && weatherLayerVisible && (
					<MapButton
						icon={<InfoIcon color={Platform.OS === 'ios' ? 'black' : text} />}
						onPressIn={onInteraction}
						onPress={() => onLegendChange(true)}
					/>
				)}
				<View className="ios:gap-4 gap-2">
					{weatherLayers.map(({ id, icon }) => (
						<MapButton key={id} icon={icon} onPressIn={onInteraction} onPress={() => onLayerChange(id)} />
					))}
					{onClearLayer && (
						<MapButton icon={<CloudOff color={text} />} onPressIn={onInteraction} onPress={onClearLayer} />
					)}
				</View>
			</View>
			{showLegend && (
				<View className="ios:bottom-28 absolute bottom-4 right-4 max-md:left-4">
					<AnimatedView duration={250}>
						<RoundView className={clsx('w-full p-4 md:w-96', border)}>
							<View className="flex w-full flex-row items-center justify-between">
								<StyledText type="body" className="font-semibold">
									{t('maps.legend.title')}
								</StyledText>
								<StyledPressable
									onPressIn={onInteraction}
									onPress={() => onLegendChange(false)}
									className={clsx('rounded-full p-1', border)}
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

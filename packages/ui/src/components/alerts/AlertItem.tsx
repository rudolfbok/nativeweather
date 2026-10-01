import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { ChevronIcon } from '@nativeweather/ui/components/icons/ui/ChevronIcon';
import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { DotIndicator } from '@nativeweather/ui/components/icons/ui/DotIndicator';
import { getAlertSeverityDotColor } from '@nativeweather/core/utils/mappings/alertSeverity';

interface AlertItemProps {
	title: string;
	area: string;
	severity: string;
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
}

export const AlertItem = ({ title, area, severity, onPress }: AlertItemProps) => {
	return (
		<StyledPressable onPress={onPress} className={clsx('w-full flex-row items-center gap-2 p-4')}>
			<View className={clsx('mx-2')}>
				<DotIndicator fill={getAlertSeverityDotColor(severity)} />
			</View>
			<View className={clsx('flex-1')}>
				<StyledText type="sectiontitle">{title}</StyledText>
				{area.length > 0 && (
					<StyledText type="body" numberOfLines={1} ellipsizeMode="tail" className={clsx('opacity-70')}>
						{area}
					</StyledText>
				)}
			</View>
			<ChevronIcon />
		</StyledPressable>
	);
};

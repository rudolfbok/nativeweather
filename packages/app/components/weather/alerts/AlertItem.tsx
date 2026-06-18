import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { ChevronIcon } from 'app/components/icons/ChevronIcon';
import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';
import { StyledText } from 'app/components/common/styled/StyledText';
import { DotIndicator } from 'app/components/icons/DotIndicator';
import { getAlertSeverityDotColor } from 'app/utils/mappings/mapAlertSeverity';

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
				<StyledText type="subtitle">{title}</StyledText>
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

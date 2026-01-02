import { StyledPressable } from 'app/components/common/StyledPressable';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { StyledText } from '../../common/StyledText';

interface AlertItemProps {
	title: string;
	severity: string;
	area: string;
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
}

export const AlertItem = ({ title, severity, area, onPress }: AlertItemProps) => {
	return (
		<StyledPressable onPress={onPress} className={clsx('w-full flex-row items-center gap-2 rounded-3xl p-4')}>
			<View className={clsx('flex-1')}>
				<StyledText type="subtitle">{title}</StyledText>
				{severity !== 'Unknown' && (
					<StyledText type="body" className={clsx('line-clamp-1')}>
						{severity}
					</StyledText>
				)}
				{area.length > 0 && (
					<StyledText type="body" className={clsx('line-clamp-1')}>
						{area}
					</StyledText>
				)}
			</View>
			<ChevronRight color="#007AFF" size={28} />
		</StyledPressable>
	);
};

import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { StyledText } from 'app/components/common/styled/StyledText';

interface AlertItemProps {
	title: string;
	area: string;
	onPress?: (event: GestureResponderEvent) => void | Promise<void>;
}

export const AlertItem = ({ title, area, onPress }: AlertItemProps) => {
	return (
		<StyledPressable onPress={onPress} className={clsx('w-full flex-row items-center gap-2 rounded-3xl p-4')}>
			<View className={clsx('flex-1')}>
				<StyledText type="subtitle">{title}</StyledText>
				{area.length > 0 && (
					<StyledText type="body" numberOfLines={1} ellipsizeMode="tail">
						{area}
					</StyledText>
				)}
			</View>
			<ChevronRight color="#007AFF" size={28} />
		</StyledPressable>
	);
};

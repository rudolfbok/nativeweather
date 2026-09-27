import { clsx } from 'clsx';
import { GestureResponderEvent } from 'react-native';
import { StyledPressable } from '../../common/styled/StyledPressable';
import { CardContent } from './CardContent';

interface CardProps {
	onPress: (event?: GestureResponderEvent) => void;
	city: string;
	conditionCode: number;
	isDay: 0 | 1;
	tempC: number;
	tempF: number;
	timeZone?: string;
	displayTime: boolean;
	region: string;
	tintColor?: string;
}

export const Card = ({ onPress, tintColor, ...cardProps }: CardProps) => (
	<StyledPressable
		onPress={onPress}
		className={clsx('min-h-[134px] w-full select-none flex-row items-center justify-between rounded-3xl p-4')}
		tintColor={`${tintColor}E6`}
	>
		<CardContent {...cardProps} />
	</StyledPressable>
);

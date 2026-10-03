import { clsx } from 'clsx';
import { GlassView } from 'expo-glass-effect';
import { cssInterop } from 'nativewind';
import { GestureResponderEvent, Pressable } from 'react-native';
import { CardContent } from './CardContent';

const StyledGlassView = cssInterop(GlassView, { className: 'style' });

interface CardProps {
	onPress: (event?: GestureResponderEvent) => void;
	city: string;
	conditionCode: number | null;
	isDay: 0 | 1;
	tempC: number;
	tempF: number;
	timeZone?: string;
	displayTime: boolean;
	region: string;
	tintColor?: string;
}

export const Card = ({ onPress, tintColor, ...cardProps }: CardProps) => (
	<Pressable onPress={onPress} className={clsx('w-full')}>
		<StyledGlassView
			glassEffectStyle="clear"
			isInteractive
			tintColor={tintColor}
			className={clsx('min-h-[134px] w-full flex-row items-center justify-between rounded-3xl p-4')}
		>
			<CardContent {...cardProps} />
		</StyledGlassView>
	</Pressable>
);

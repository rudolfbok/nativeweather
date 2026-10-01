import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { clsx } from 'clsx';
import { useRef } from 'react';
import { GestureResponderEvent, Platform, View } from 'react-native';

interface SearchResultProps {
	index: number;
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	city: string;
	region: string;
	country: string;
	isLast: boolean;
}

export const SearchResult = ({ index, onPress, city, region, country, isLast }: SearchResultProps) => {
	const handledPressInRef = useRef(false);

	const handlePressIn = (event: GestureResponderEvent) => {
		if (Platform.OS !== 'web') return;

		handledPressInRef.current = true;
		onPress(event);
	};

	const handlePress = (event: GestureResponderEvent) => {
		if (Platform.OS === 'web' && handledPressInRef.current) {
			handledPressInRef.current = false;
			return;
		}

		onPress(event);
	};

	return (
		<StyledPressable
			key={index}
			onPress={handlePress}
			onPressIn={handlePressIn}
			className={clsx(
				'web:bg-secondarySystemBackground dark:hover:bg-tertiarySystemBackground_dark hover:bg-tertiarySystemBackground px-4 pt-4',
				'active:!bg-tertiarySystemBackground active:dark:!bg-tertiarySystemBackground_dark'
			)}
		>
			<View className={clsx('pb-4', isLast && 'border-b border-gray-200 dark:border-zinc-800')}>
				<StyledText type="body">{city}</StyledText>
				<StyledText type="caption" className={clsx('opacity-70')}>
					{region || (!region && city)}
				</StyledText>
				<StyledText type="body">{country}</StyledText>
			</View>
		</StyledPressable>
	);
};

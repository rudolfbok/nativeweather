import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';

interface SearchResultProps {
	index: number;
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	city: string;
	region: string;
	country: string;
	isLast: boolean;
}

export const SearchResult = ({ index, onPress, city, region, country, isLast }: SearchResultProps) => {
	return (
		<StyledPressable
			key={index}
			onPress={onPress}
			className={clsx(
				'web:bg-secondarySystemBackground dark:hover:bg-tertiarySystemBackground_dark hover:bg-tertiarySystemBackground px-4 pt-4'
			)}
		>
			<View className={clsx('pb-4', isLast && 'border-b border-gray-200 dark:border-zinc-800')}>
				<StyledText type="body">{city}</StyledText>
				<StyledText type="bodysecondary" className={clsx('!text-secondaryLabel dark:!text-secondaryLabel_dark')}>
					{region || (!region && city)}
				</StyledText>
				<StyledText type="body">{country}</StyledText>
			</View>
		</StyledPressable>
	);
};

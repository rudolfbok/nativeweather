import { StyledText } from 'app/components/common/StyledText';
import clsx from 'clsx';
import { View, Pressable, GestureResponderEvent } from 'react-native';

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
		<Pressable
			key={index}
			onPress={onPress}
			className={clsx(
				'ios:dark:bg-secondarySystemBackground_dark dark:hover:bg-tertiarySystemBackground_dark active:bg-tertiarySystemBackground dark:active:bg-tertiarySystemBackground_dark hover:bg-tertiarySystemBackground px-4 pt-4',
				index === 0 && 'rounded-t-3xl',
				!isLast && 'rounded-b-3xl'
			)}
		>
			<View className={clsx('pb-4', isLast && 'border-b border-gray-200 dark:border-zinc-800')}>
				<StyledText type="body">{city}</StyledText>
				<StyledText type="bodysecondary" className={clsx('!text-secondaryLabel dark:!text-secondaryLabel_dark')}>
					{region || (!region && city)}
				</StyledText>
				<StyledText type="body">{country}</StyledText>
			</View>
		</Pressable>
	);
};

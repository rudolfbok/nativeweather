import { useTranslate } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { CloseIcon } from '@nativeweather/ui/components/icons/ui/CloseIcon';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { Search } from 'lucide-react-native';
import { useState } from 'react';
import { GestureResponderEvent, NativeSyntheticEvent, Pressable, TargetedEvent, TextInput } from 'react-native';

interface SearchInputProps {
	searchValue: string;
	isFocused: boolean;
	onChangeText: (text: string) => void | Promise<void>;
	clearSearch: (event: GestureResponderEvent) => void | Promise<void>;
	performSearch: () => void | Promise<void>;
	onFocus: (e: NativeSyntheticEvent<TargetedEvent>) => void;
	onBlur: () => void | Promise<void>;
}

export const SearchInput = ({
	searchValue,
	isFocused,
	clearSearch,
	performSearch,
	onFocus,
	onChangeText,
	onBlur,
}: SearchInputProps) => {
	const { t } = useTranslate('common');
	const [isXHovered, setIsXHovered] = useState(false);
	const { unfocusedSearch } = useThemeColors();

	return (
		<RoundView
			className={clsx(
				'bg-tertiarySystemBackground dark:bg-secondarySystemBackground_dark w-full flex-row items-center justify-center px-4',
				isFocused && '!border-primaryblue'
			)}
		>
			<Pressable onPress={performSearch} className={clsx('cursor-pointer')}>
				<Search size={22} color={isFocused ? '#007AFF' : unfocusedSearch} style={{ pointerEvents: 'none' }} />
			</Pressable>
			<TextInput
				value={searchValue}
				onChangeText={onChangeText}
				onSubmitEditing={performSearch}
				returnKeyType="search"
				autoComplete="off"
				placeholder={isFocused ? '' : t('search.searchbar')}
				placeholderTextColor={unfocusedSearch}
				onFocus={onFocus}
				onBlur={onBlur}
				className={clsx(
					'text-label web:h-11 dark:text-label_dark mx-2 flex h-14 flex-1 flex-row truncate text-[16px] leading-[20px] outline-none'
				)}
			/>
			{searchValue.length > 0 && (
				<Pressable
					onPress={clearSearch}
					className={clsx('cursor-pointer')}
					onHoverIn={() => setIsXHovered(true)}
					onHoverOut={() => setIsXHovered(false)}
				>
					<CloseIcon size={22} color={isXHovered ? '#007AFF' : undefined} />
				</Pressable>
			)}
		</RoundView>
	);
};

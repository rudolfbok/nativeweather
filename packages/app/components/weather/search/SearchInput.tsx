import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import clsx from 'clsx';
import { Search, X } from 'lucide-react-native';
import { useState } from 'react';
import {
	GestureResponderEvent,
	NativeSyntheticEvent,
	Pressable,
	TargetedEvent,
	TextInput,
	useColorScheme,
} from 'react-native';

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
	const currentColorScheme = useColorScheme();
	const [isXHovered, setIsXHovered] = useState(false);

	return (
		<RoundView
			className={clsx(
				'ios:bg-systemBackground bg-tertiarySystemBackground dark:bg-secondarySystemBackground_dark ios:mb-4 w-full flex-row items-center justify-center border border-transparent px-4',
				isFocused && '!border-primaryblue'
			)}
		>
			<Pressable onPress={performSearch} className={clsx('cursor-pointer')}>
				<Search size={22} color={isFocused ? '#007AFF' : currentColorScheme === 'dark' ? '#98989F' : '#7F7F84'} />
			</Pressable>
			<TextInput
				// ref={ref}
				value={searchValue}
				onChangeText={onChangeText}
				onSubmitEditing={performSearch}
				returnKeyType="search"
				autoComplete="off"
				placeholder={isFocused ? '' : t('search.searchbar')}
				placeholderTextColor={currentColorScheme === 'dark' ? '#98989F' : '#7F7F84'}
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
					<X size={22} color={isXHovered ? '#007AFF' : currentColorScheme === 'dark' ? '#98989F' : '#7F7F84'} />
				</Pressable>
			)}
		</RoundView>
	);
};

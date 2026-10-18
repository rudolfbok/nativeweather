import { NativeInstance } from '@nativeweather/ui/utils/nativeInstance';
import { useTranslate } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { CloseIcon } from '@nativeweather/ui/components/icons/ui/CloseIcon';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { Search } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { GestureResponderEvent, NativeSyntheticEvent, Pressable, TargetedEvent, TextInput } from 'react-native';

interface SearchInputProps {
	searchValue: string;
	isFocused: boolean;
	onChangeText: (text: string) => void | Promise<void>;
	clearSearch: (event: GestureResponderEvent) => void | Promise<void>;
	performSearch: () => void | Promise<void>;
	onFocus: (event: NativeSyntheticEvent<TargetedEvent>) => void;
	onBlur: () => void | Promise<void>;
}

export const SearchInput = ({
	searchValue,
	isFocused,
	onChangeText,
	clearSearch,
	performSearch,
	onFocus,
	onBlur,
}: SearchInputProps) => {
	const { t } = useTranslate('common');
	const inputRef = useRef<NativeInstance<typeof TextInput>>(null);
	const [isClearHovered, setIsClearHovered] = useState(false);
	const { text, unfocusedSearch } = useThemeColors();

	useEffect(() => {
		let focusFrame: number | undefined;
		const focusSearch = () => {
			if (focusFrame !== undefined) cancelAnimationFrame(focusFrame);
			const { navigationScreen, modalScreen } = useNavigationScreen.getState();
			if (navigationScreen === 'search' && !modalScreen) {
				focusFrame = requestAnimationFrame(() => inputRef.current?.focus());
			}
		};

		focusSearch();
		const unsubscribe = useNavigationScreen.subscribe(focusSearch);
		return () => {
			unsubscribe();
			if (focusFrame !== undefined) cancelAnimationFrame(focusFrame);
		};
	}, []);

	const handleClear = (event: GestureResponderEvent) => {
		clearSearch(event);
		inputRef.current?.focus();
	};

	return (
		<RoundView
			className={clsx(
				'h-12 w-full flex-row items-center justify-center border border-black/10 bg-systemBackground px-3 dark:border-white/10 dark:bg-secondarySystemBackground_dark',
				isFocused && '!border-primaryblue'
			)}
		>
			<Pressable
				onPress={() => inputRef.current?.focus()}
				className="h-8 w-8 cursor-pointer items-center justify-center rounded-full"
			>
				<Search size={19} strokeWidth={2.25} color={isFocused ? '#007AFF' : unfocusedSearch} />
			</Pressable>

			<TextInput
				ref={inputRef}
				// @ts-expect-error enableFocusRing is provided by react-native-macos.
				enableFocusRing={false}
				textAlignVertical="center"
				value={searchValue}
				onChangeText={onChangeText}
				onSubmitEditing={performSearch}
				onFocus={onFocus}
				onBlur={onBlur}
				returnKeyType="search"
				autoComplete="off"
				autoCorrect={false}
				placeholder={t('search.searchbar')}
				placeholderTextColor={unfocusedSearch}
				selectionColor="#007AFF"
				accessibilityLabel="Search for a city or coordinates"
				className={clsx(
					'line-height-[18px] mx-1 h-[18px] flex-1 text-[16px] text-label outline-none ring-0 dark:text-label_dark'
				)}
			/>

			{searchValue.length > 0 && (
				<Pressable
					onPress={handleClear}
					onHoverIn={() => setIsClearHovered(true)}
					onHoverOut={() => setIsClearHovered(false)}
					className={clsx('h-7 w-7 cursor-pointer items-center justify-center rounded-full')}
				>
					<CloseIcon size={19} color={isClearHovered ? '#007AFF' : text} />
				</Pressable>
			)}
		</RoundView>
	);
};

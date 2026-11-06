import { useTranslate } from '@tolgee/react';
import { Search, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { withUniwind } from 'uniwind';
import { RoundView } from '../common/RoundView';

const SearchIcon = withUniwind(Search);
const ClearIcon = withUniwind(X);

interface SearchFieldProps {
	value: string;
	onChangeText: (text: string) => void;
	onSubmit: () => void;
}

// A capsule like the iOS search bar, on every platform.
export const SearchField = ({ value, onChangeText, onSubmit }: SearchFieldProps) => {
	const { t } = useTranslate('common');
	const [focused, setFocused] = useState(false);

	return (
		<RoundView
			className={twMerge(
				'w-full flex-row items-center rounded-full bg-tertiary-system-background px-4',
				focused && 'border-primary-blue'
			)}
		>
			<Pressable onPress={onSubmit} accessibilityLabel={t('search.title')}>
				<SearchIcon size={22} colorClassName={focused ? 'accent-primary-blue' : 'accent-secondary-label'} />
			</Pressable>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				onSubmitEditing={onSubmit}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				returnKeyType="search"
				autoComplete="off"
				placeholder={t('search.searchbar')}
				placeholderTextColorClassName="accent-secondary-label"
				className="mx-2 h-11 flex-1 text-base text-label outline-none"
			/>
			{value.length > 0 && (
				<Pressable onPress={() => onChangeText('')} accessibilityLabel="Clear" className="web:cursor-pointer">
					<ClearIcon size={22} colorClassName="accent-secondary-label" />
				</Pressable>
			)}
		</RoundView>
	);
};

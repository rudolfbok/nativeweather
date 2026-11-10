import { CityList, desktopWidth, ScreenWrapper, SearchField, Text } from '@/ui';
import { isTauri } from '@tauri-apps/api/core';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { Platform, View } from 'react-native';
import { useCitySelection } from '@/hooks/useCitySelection';

export default function SearchScreen() {
	const { t } = useTranslate('common');
	const { query, setQuery, cities, selectCity, submit } = useCitySelection();

	return (
		<ScreenWrapper dismissKeyboard>
			{/* Native has a title in the navigation bar; the web has no bar. */}
			<View className={clsx('gap-4', desktopWidth)}>
			{Platform.OS === 'web' && (
				<Text type="screentitle" className="mb-3">
					{t('search.title')}
				</Text>
			)}
				<SearchField
					value={query}
					onChangeText={setQuery}
					onSubmit={() => void submit()}
					autoFocus={Platform.OS === 'web' && isTauri()}
				/>
				<CityList cities={cities} onSelect={selectCity} />
			</View>
		</ScreenWrapper>
	);
}

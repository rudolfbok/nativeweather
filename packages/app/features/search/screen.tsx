'use client';

import { useNavigation } from '@react-navigation/native';
import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { SearchBar } from 'app/components/weather/search/SearchBar';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { clsx } from 'clsx';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { RecentSearches } from 'app/components/weather/search/RecentSearches';
import { SuggestionsList } from 'app/components/weather/search/SuggestionsList';
import { useSearchController } from 'app/hooks/useSearchController';
import {
	NativeEventSubscription,
	NativeSyntheticEvent,
	TextInputChangeEvent,
	TextInputChangeEventData,
	View,
} from 'react-native';

export const SearchFeature = () => {
	const {
		searchValue,
		setSearchValue,
		isSearchBarFocused,
		setIsSearchBarFocused,
		recentSearches,
		handleCityPress,
		handleInputSearch,
		showRecentSearches,
		showSuggestions,
		suggestions,
		addToRecentSearches,
	} = useSearchController();

	const { t } = useTranslate('common');
	const navigation = useNavigation();

	const [primaryTitle, setPrimaryTitle] = useState('');

	const scrollY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (scrollY.value > 10) {
				navigation.setOptions({
					headerTitle: t('title'),
				});
				setPrimaryTitle('');
			} else {
				navigation.setOptions({
					headerTransparent: true,
					headerTitle: '',
					headerBackground: undefined,
				});
				setPrimaryTitle(t('search.title'));
			}
		}, 16);
		return () => clearInterval(interval);
	}, [navigation, scrollY]);

	useEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				placeholder: 'Search any city or coordinates..',
				onChangeText: (event) => setSearchValue(event.nativeEvent.text),
				onSearchButtonPress: () => handleInputSearch(searchValue),
				onFocus: () => setIsSearchBarFocused(true),
				onBlur: () => setIsSearchBarFocused(false),
			},
		});
	}, [navigation, searchValue]);

	return (
		<Animated.ScrollView
			onScroll={scrollHandler}
			contentInsetAdjustmentBehavior="automatic"
			showsVerticalScrollIndicator={true}
			contentContainerClassName={clsx('px-4 pb-4')}
		>
			<StyledText type="screentitle" className={clsx('mb-3')}>
				{primaryTitle}
			</StyledText>
			{showRecentSearches && (
				<View className={clsx('w-full')}>
					<RecentSearches recentSearches={recentSearches} onSelect={(item) => handleCityPress(item)} />
				</View>
			)}
			{showSuggestions && (
				<View className={clsx('w-full')}>
					<SuggestionsList
						suggestions={suggestions}
						onSelect={(item) => {
							handleCityPress(item);
							addToRecentSearches(item);
							setSearchValue('');
						}}
					/>
				</View>
			)}
		</Animated.ScrollView>
	);
};

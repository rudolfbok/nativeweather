'use client';

import { useNavigation } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { SearchBar } from '@nativeweather/ui/components/weather/search/SearchBar';
import { useCallback, useEffect, useState } from 'react';
import Animated, { runOnJS, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { clsx } from 'clsx';

export const SearchFeature = () => {
	const { t } = useTranslate('common');
	const navigation = useNavigation();

	const [isCollapsed, setIsCollapsed] = useState(false);

	const headerCollapsed = useSharedValue(false);

	const updateHeader = useCallback((collapsed: boolean) => setIsCollapsed(collapsed), []);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			const collapsed = event.contentOffset.y > 10;
			if (collapsed !== headerCollapsed.value) {
				headerCollapsed.value = collapsed;
				runOnJS(updateHeader)(collapsed);
			}
		},
	});

	useEffect(() => {
		navigation.setOptions(
			isCollapsed
				? { headerTitle: t('search.title'), headerTransparent: false }
				: { headerTransparent: true, headerTitle: '', headerBackground: undefined }
		);
	}, [isCollapsed, navigation, t]);

	return (
		<Animated.ScrollView
			onScroll={scrollHandler}
			contentInsetAdjustmentBehavior="automatic"
			showsVerticalScrollIndicator={true}
			contentContainerClassName={clsx('px-4 pb-4')}
		>
			<StyledText type="screentitle" className={clsx('mb-3')}>
				{isCollapsed ? '' : t('search.title')}
			</StyledText>
			<SearchBar />
		</Animated.ScrollView>
	);
};

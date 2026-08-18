'use client';

import { useNavigation } from '@react-navigation/native';
import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { SearchBar } from 'app/components/weather/search/SearchBar';
import { useEffect, useState } from 'react';
import Animated, { runOnJS, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { clsx } from 'clsx';

export const SearchFeature = () => {
	const { t } = useTranslate('common');
	const navigation = useNavigation();

	const [primaryTitle, setPrimaryTitle] = useState('');

	const headerCollapsed = useSharedValue(false);

	const updateHeader = (collapsed: boolean) => {
		if (collapsed) {
			navigation.setOptions({ headerTitle: t('search.title') });
			setPrimaryTitle('');
		} else {
			navigation.setOptions({ headerTransparent: true, headerTitle: '', headerBackground: undefined });
			setPrimaryTitle(t('search.title'));
		}
	};

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
		updateHeader(false);
	}, [navigation, t]);

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
			<SearchBar />
		</Animated.ScrollView>
	);
};

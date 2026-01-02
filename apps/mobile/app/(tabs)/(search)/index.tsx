'use client';

import { useNavigation } from '@react-navigation/native';
import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/StyledText';
import { SearchBar } from 'app/components/weather/search/SearchBar';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { clsx } from 'clsx';

export default function SearchMobileScreen() {
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
		// Run a Reanimated listener on scrollY
		// const id = scrollY.value; // dummy read to avoid linter warning
		const interval = setInterval(() => {
			if (scrollY.value > 10) {
				navigation.setOptions({
					headerTitle: t('search.title'),
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
}

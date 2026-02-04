'use client';

import { useNavigation } from '@react-navigation/native';
import { useTranslate } from '@tolgee/react';
import { SettingsFeature } from 'app/features/settings/screen';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export default function SettingsScreen() {
	const { t } = useTranslate('settings');
	const [primaryTitle, setPrimaryTitle] = useState('');
	const navigation = useNavigation();

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
			if (scrollY.value > 5) {
				(navigation.setOptions({
					headerTitle: t('settings'),
				}),
					setPrimaryTitle(''));
			} else {
				(navigation.setOptions({
					headerTitle: '',
				}),
					setPrimaryTitle(t('settings')));
			}
		}, 16);
		return () => clearInterval(interval);
	}, [navigation, scrollY]);
	return (
		<Animated.ScrollView onScroll={scrollHandler}>
			<SettingsFeature title={primaryTitle} />
		</Animated.ScrollView>
	);
}

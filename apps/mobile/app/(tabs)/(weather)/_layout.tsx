import { useTranslate } from '@tolgee/react';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useWeather } from 'app/hooks/weather/useWeather';
import { isCityInFavorites } from 'app/database/crudMMKVService';
import { extractCity } from 'app/utils/extractCity';
import { clsx } from 'clsx';
import { Stack } from 'expo-router';
import { Share, Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, Pressable } from 'react-native';
import type { ColorValue } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { weatherData } = useWeather();
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();
	const { background, text } = useThemeColors();
	useEffect(() => {
		if (!weatherData) return;

		const city = extractCity(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [setIsFavorite, weatherData]);

	const LeftButton = ({ color }: { color: ColorValue }) => {
		return (
			<Pressable
				onPress={() => console.log('Shared button was clicked!')}
				className={clsx('android:mr-2 h-fit w-10 items-center justify-center')}
			>
				<Share size={Platform.OS === 'ios' ? 22 : 28} color={text} style={{ pointerEvents: 'none' }} />
			</Pressable>
		);
	};

	const RightButton = ({ color }: { color: ColorValue }) => {
		if (!weatherData) return null;

		return (
			<Pressable
				onPress={() => handleFavoriteToggle(extractCity(weatherData))}
				className={clsx('h-10 w-10 items-center justify-center')}
			>
				<Star
					size={Platform.OS === 'ios' ? 22 : 28}
					color={text}
					fill={isFavorite ? text : 'transparent'}
					style={{ pointerEvents: 'none' }}
				/>
			</Pressable>
		);
	};

	return (
		<Stack nativeContainerStyle={{ backgroundColor: background }}>
			<Stack.Screen
				name="[city]"
				options={{
					title: t('tab.weather'),
					headerLeft: ({ tintColor }) => weatherData && <LeftButton color={tintColor ?? text} />,
					headerRight: ({ tintColor }) => weatherData && <RightButton color={tintColor ?? text} />,
					headerShadowVisible: false,
					headerTransparent: true,
					headerTintColor: weatherData ? 'white' : text,
					// headerBackground: () =>
					// 	headerBackgroundColor ? <View style={{ flex: 1, backgroundColor: '#77CFE2' }} /> : null,
					headerTitleAlign: 'center',
					// headerTitleStyle: { color: headerTextColor },
					// headerTitle: () => <StyledText type="title">Hey</StyledText>,
					contentStyle: {
						backgroundColor: background,
						paddingHorizontal: 0,
					},
				}}
			/>
		</Stack>
	);
}

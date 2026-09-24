import { useTranslate } from '@tolgee/react';
import { isCityInFavorites } from 'app/database/crudMMKVService';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useWeather } from 'app/hooks/weather/useWeather';
import { extractCity } from 'app/utils/extractCity';
import { weatherLandscapeBg, weatherLandscapeText } from 'app/utils/mappings/landscapeColors';
import { clsx } from 'clsx';
import { Stack } from 'expo-router';
import { Share, Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, Pressable, View } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { weatherData } = useWeather();
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();
	const { background, text } = useThemeColors();
	const headerBackgroundColor = weatherData
		? weatherLandscapeBg({ isDay: weatherData.current.isDay, code: weatherData.current.condition.code })
		: background;
	const headerTextColor = weatherData
		? weatherLandscapeText({ isDay: weatherData.current.isDay, code: weatherData.current.condition.code })
		: text;
	useEffect(() => {
		if (!weatherData) return;

		const city = extractCity(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [setIsFavorite, weatherData]);

	const LeftButton = () => {
		return (
			<Pressable
				onPress={() => console.log('Shared button was clicked!')}
				className={clsx('android:mr-2 h-fit w-10 items-center justify-center')}
			>
				<Share size={Platform.OS === 'ios' ? 22 : 28} color={headerTextColor} style={{ pointerEvents: 'none' }} />
			</Pressable>
		);
	};

	const RightButton = () => {
		if (!weatherData) return null;

		return (
			<Pressable
				onPress={() => handleFavoriteToggle(extractCity(weatherData))}
				className={clsx('h-10 w-10 items-center justify-center')}
			>
				<Star
					size={Platform.OS === 'ios' ? 22 : 28}
					color={headerTextColor}
					fill={isFavorite ? headerTextColor : 'transparent'}
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
					headerLeft: () => weatherData && <LeftButton />,
					headerRight: () => weatherData && <RightButton />,
					headerShadowVisible: false,
					headerTransparent: true,
					headerTintColor: headerTextColor,
					headerBackground: () => <View style={{ flex: 1, backgroundColor: headerBackgroundColor }} />,
					headerTitleStyle: { color: headerTextColor },
					contentStyle: {
						backgroundColor: background,
						paddingHorizontal: 0,
					},
				}}
			/>
		</Stack>
	);
}

import { useTranslate } from '@tolgee/react';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { useWeather } from 'app/hooks/useWeather';
import { isCityInFavorites } from 'app/storage/crudMMKVService';
import { cityFromWeather } from 'app/utils/helpers/cityFromWeather';
import { shareLink } from 'app/utils/services/shareLink';
import { clsx } from 'clsx';
import { Stack } from 'expo-router';
import { Share, Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, Pressable } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { weatherData } = useWeather();
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();
	const { backgroundColor, textColor } = useThemeColors();

	// const titleColor = Platform.OS === 'ios' ? DynamicColorIOS({ light: 'black', dark: 'white' }) : 'black';

	useEffect(() => {
		if (!weatherData) return;

		const city = cityFromWeather(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [weatherData]);

	const LeftButton = () => {
		return (
			<Pressable
				onPress={() => shareLink(weatherData)}
				className={clsx('android:mr-2 h-fit w-10 items-center justify-center')}
			>
				<Share size={Platform.OS === 'ios' ? 22 : 28} color={textColor} style={{ pointerEvents: 'none' }} />
			</Pressable>
		);
	};

	const RightButton = () => {
		return (
			<Pressable
				onPress={() => handleFavoriteToggle(cityFromWeather(weatherData))}
				className={clsx('h-10 w-10 items-center justify-center')}
			>
				<Star
					size={Platform.OS === 'ios' ? 22 : 28}
					color={textColor}
					fill={isFavorite ? textColor : 'transparent'}
					style={{ pointerEvents: 'none' }}
				/>
			</Pressable>
		);
	};

	return (
		<Stack nativeContainerStyle={{ backgroundColor }}>
			<Stack.Screen
				name="[city]"
				options={{
					title: t('tab.weather'),
					headerLeft: () => weatherData && <LeftButton />,
					headerRight: () => weatherData && <RightButton />,
					headerShadowVisible: false,
					headerTransparent: true,
					// headerStyle: { backgroundColor: 'rgba(73, 205, 240, 1)' },
					headerTitleAlign: 'center',
					headerTitleStyle: { color: !weatherData ? textColor : 'white' },
					// headerBackground: () => (
					// 	<WeatherLandscape code={weatherData?.current.condition.code} isDay={weatherData?.current.isDay} />
					// ),
					contentStyle: {
						backgroundColor,
						// marginTop: Platform.OS === 'android' ? 110 : 0,
						paddingHorizontal: 0,
					},
				}}
			/>
		</Stack>
	);
}

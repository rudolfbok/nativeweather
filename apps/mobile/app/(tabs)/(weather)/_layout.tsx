import { useTranslate } from '@tolgee/react';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { useWeather } from 'app/hooks/useWeather';
import { isCityInFavorites } from 'app/storage/crudMMKVService';
import { cityFromWeather } from 'app/utils/helpers/cityFromWeather';
import { weatherLandscapeBg } from 'app/utils/mappings/mapBgLandscapes';
import { shareLink } from 'app/utils/services/shareLink';
import { clsx } from 'clsx';
import { Stack } from 'expo-router';
import { Share, Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, Pressable, View } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { weatherData } = useWeather();
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();
	const { backgroundColor, textColor } = useThemeColors();
	const headerTextColor = weatherData ? 'white' : textColor;
	const headerBackgroundColor = weatherData
		? weatherLandscapeBg({ code: weatherData.current.condition.code, isDay: weatherData.current.isDay })
		: undefined;

	useEffect(() => {
		if (!weatherData) return;

		const city = cityFromWeather(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [setIsFavorite, weatherData]);

	const LeftButton = () => {
		return (
			<Pressable
				onPress={() => shareLink(weatherData)}
				className={clsx('android:mr-2 h-fit w-10 items-center justify-center')}
			>
				<Share size={Platform.OS === 'ios' ? 22 : 28} color={headerTextColor} style={{ pointerEvents: 'none' }} />
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
					color={headerTextColor}
					fill={isFavorite ? headerTextColor : 'transparent'}
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
					headerTintColor: headerTextColor,
					headerBackground: () =>
						headerBackgroundColor ? <View style={{ flex: 1, backgroundColor: headerBackgroundColor }} /> : null,
					headerTitleAlign: 'center',
					headerTitleStyle: { color: headerTextColor },
					contentStyle: {
						backgroundColor,
						paddingHorizontal: 0,
					},
				}}
			/>
		</Stack>
	);
}

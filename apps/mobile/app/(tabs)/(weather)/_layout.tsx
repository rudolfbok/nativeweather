import { useTranslate } from '@tolgee/react';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { useWeather } from 'app/hooks/useWeather';
import { isCityInFavorites } from 'app/storage/crudMMKVService';
import { cityFromWeather } from 'app/utils/helpers/cityFromWeather';
import { clsx } from 'clsx';
import { Stack } from 'expo-router';
import { Share, Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { DynamicColorIOS, Pressable } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { weatherData } = useWeather();
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();

	const titleColor = DynamicColorIOS({ light: 'black', dark: 'white' });
	const headerTintColor = useSwitchColors('black', 'white');
	const backgroundColor = useSwitchColors('#F2F2F7', '#000');

	useEffect(() => {
		if (!weatherData) return;

		const city = cityFromWeather(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [weatherData]);

	const LeftButton = () => {
		return (
			<Pressable
				onPress={() => console.log('Share button was pressed!')}
				className={clsx('h-fit w-10 items-center justify-center')}
			>
				<Share size={22} color={titleColor} />
			</Pressable>
		);
	};

	const RightButton = () => {
		return (
			<Pressable
				onPress={() => handleFavoriteToggle(cityFromWeather(weatherData))}
				className={clsx('h-10 w-10 items-center justify-center')}
			>
				<Star size={22} color={titleColor} fill={isFavorite ? titleColor : 'transparent'} />
			</Pressable>
		);
	};

	return (
		<Stack>
			<Stack.Screen
				name="[city]"
				options={{
					title: t('tab.weather'),
					headerTintColor: headerTintColor,
					headerLeft: () => weatherData && <LeftButton />,
					headerRight: () => weatherData && <RightButton />,
					headerShadowVisible: false,
					headerTransparent: true,
					contentStyle: {
						backgroundColor: backgroundColor,
						paddingHorizontal: 0,
					},
				}}
			/>
		</Stack>
	);
}

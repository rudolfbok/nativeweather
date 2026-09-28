import { useTranslate } from '@tolgee/react';
import { isCityInFavorites } from 'app/database/crudMMKVService';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useWeather } from 'app/hooks/weather/useWeather';
import { getAlerts } from 'app/utils/alertFilters';
import { extractCity } from 'app/utils/extractCity';
import { weatherLandscapeBg } from 'app/utils/mappings/landscapeColors';
import { GlassView } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { Share, Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { weatherData } = useWeather();
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();
	const { background, text } = useThemeColors();
	const alerts = weatherData ? getAlerts(weatherData.alerts.alert, weatherData.location) : [];
	const headerBackgroundColor = weatherData
		? weatherLandscapeBg({ isDay: weatherData.current.isDay, code: weatherData.current.condition.code })
		: background;
	useEffect(() => {
		if (!weatherData) return;

		const city = extractCity(weatherData);
		setIsFavorite(isCityInFavorites(city));
	}, [setIsFavorite, weatherData]);

	return (
		<Stack nativeContainerStyle={{ backgroundColor: background }}>
			<Stack.Screen
				name="[city]"
				options={{
					title: t('tab.weather'),
					headerShadowVisible: false,
					headerTransparent: true,
					headerTintColor: weatherData ? 'white' : text,
					headerStyle: { backgroundColor: headerBackgroundColor },
					headerTitleStyle: { color: weatherData ? 'white' : text },
					contentStyle: {
						backgroundColor: background,
						paddingHorizontal: 0,
					},
				}}
			>
				{weatherData && (
					<Stack.Toolbar placement="left">
						<Stack.Toolbar.View hidesSharedBackground>
							<Pressable onPress={() => console.log('Share button was pressed!')}>
								<GlassView glassEffectStyle="clear" isInteractive style={{ borderRadius: 999, padding: 10 }}>
									<Share color="#FFFFFF" />
								</GlassView>
							</Pressable>
						</Stack.Toolbar.View>
					</Stack.Toolbar>
				)}
				{weatherData && (
					<Stack.Toolbar placement="right" backgroundColor="red">
						<Stack.Toolbar.View hidesSharedBackground>
							<Pressable
								accessibilityLabel={t(isFavorite ? 'favorites.delete' : 'favorites.title')}
								onPress={() => handleFavoriteToggle(extractCity(weatherData))}
							>
								<GlassView glassEffectStyle="clear" isInteractive style={{ borderRadius: 999, padding: 10 }}>
									<Star
										color="#FFFFFF"
										fill={isFavorite ? '#FFFFFF' : 'transparent'}
										style={{ pointerEvents: 'none' }}
									/>
								</GlassView>
							</Pressable>
						</Stack.Toolbar.View>
					</Stack.Toolbar>
				)}
			</Stack.Screen>
		</Stack>
	);
}

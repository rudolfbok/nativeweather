import { useTranslate } from '@tolgee/react';
import { isCityInFavorites } from '@nativeweather/core/database/crudMMKVService';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { useFavoriteCities } from '@nativeweather/ui/hooks/weather/useFavoriteCities';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { extractCity } from '@nativeweather/core/utils/extractCity';
import { weatherLandscapeBg } from '@nativeweather/core/utils/mappings/landscapeColors';
import { GlassView } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { Share, Star } from 'lucide-react-native';
import { Pressable } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { weatherData } = useWeather();
	const { handleFavoriteToggle, favoriteCitiesValue } = useFavoriteCities();
	const { background, text } = useThemeColors();
	const headerBackgroundColor = weatherData
		? weatherLandscapeBg({ isDay: weatherData.current.isDay, code: weatherData.current.condition.code })
		: background;
	const isFavorite =
		favoriteCitiesValue !== undefined && weatherData !== null && isCityInFavorites(extractCity(weatherData));

	return (
		<Stack unstable_nativeProps={{ nativeContainerStyle: { backgroundColor: background } }}>
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
					gestureEnabled: false,
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
					<Stack.Toolbar placement="right">
						<Stack.Toolbar.View hidesSharedBackground>
							<Pressable
								accessibilityLabel={t(isFavorite ? 'favorites.delete' : 'favorites.title')}
								onPress={() => handleFavoriteToggle(extractCity(weatherData))}
							>
								<GlassView glassEffectStyle="clear" isInteractive style={{ borderRadius: 999, padding: 10 }}>
									<Star color="#FFFFFF" fill={isFavorite ? '#FFFFFF' : 'transparent'} />
								</GlassView>
							</Pressable>
						</Stack.Toolbar.View>
					</Stack.Toolbar>
				)}
			</Stack.Screen>
		</Stack>
	);
}

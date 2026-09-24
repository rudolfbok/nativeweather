import { useTranslate } from '@tolgee/react';
import { isCityInFavorites } from 'app/database/crudMMKVService';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useWeather } from 'app/hooks/weather/useWeather';
import { extractCity } from 'app/utils/extractCity';
import { getAlerts, getMostSevereAlert } from 'app/utils/alertFilters';
import { getAlertSeverityDotColor } from 'app/utils/mappings/alertSeverity';
import { weatherLandscapeBg, weatherLandscapeText } from 'app/utils/mappings/landscapeColors';
import { Stack } from 'expo-router';
import { Star } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, Pressable, View } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslate('common');
	const { weatherData } = useWeather();
	const { handleFavoriteToggle, isFavorite, setIsFavorite } = useFavoriteCities();
	const { background, text } = useThemeColors();
	const alerts = weatherData ? getAlerts(weatherData.alerts.alert, weatherData.location) : [];
	const mostSevereAlert = getMostSevereAlert(alerts);
	const alertDotColor = mostSevereAlert ? getAlertSeverityDotColor(mostSevereAlert.severity) : undefined;
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

	return (
		<Stack nativeContainerStyle={{ backgroundColor: background }}>
			<Stack.Screen
				name="[city]"
				options={{
					title: t('tab.weather'),
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
			>
				<Stack.Toolbar placement="left">
					{weatherData && (
						<Stack.Toolbar.Button
							accessibilityLabel={t('favorites.share')}
							icon="square.and.arrow.up"
							hidesSharedBackground
							onPress={() => console.log('Shared button was clicked!')}
							tintColor={headerTextColor}
						/>
					)}
				</Stack.Toolbar>
				{weatherData && (
					<Stack.Toolbar placement="right" asChild>
						<Pressable
							accessibilityLabel={t(isFavorite ? 'favorites.delete' : 'favorites.title')}
							onPress={() => handleFavoriteToggle(extractCity(weatherData))}
							className="relative mr-4 h-10 w-10 items-center justify-center rounded-full bg-white/20 active:bg-white/30"
						>
							<Star
								size={Platform.OS === 'ios' ? 22 : 28}
								color={headerTextColor}
								fill={isFavorite ? headerTextColor : 'transparent'}
								style={{ pointerEvents: 'none' }}
							/>
							{alertDotColor && (
								<View
									className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full"
									style={{ backgroundColor: alertDotColor }}
								/>
							)}
						</Pressable>
					</Stack.Toolbar>
				)}
			</Stack.Screen>
		</Stack>
	);
}

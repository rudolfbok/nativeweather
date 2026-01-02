import React, { useCallback } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { CityCard } from './weather/CityCard';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useSearchController } from 'app/hooks/useSearchController';
import { useFocusEffect } from 'expo-router';

const SwipeableCityCard = ({ city, weather, onPress }) => {
	const MAX_LEFT = -60;
	const MAX_RIGHT = 60;

	const translateX = useSharedValue(0);

	const gesture = Gesture.Pan()
		.onUpdate((e) => {
			translateX.value = Math.max(MAX_LEFT, Math.min(e.translationX, MAX_RIGHT));
		})
		.onEnd(() => {
			let target = 0;
			if (translateX.value < MAX_LEFT / 2) target = MAX_LEFT;
			else if (translateX.value > MAX_RIGHT / 2) target = MAX_RIGHT;

			translateX.value = withTiming(target, {
				duration: 200,
				easing: Easing.inOut(Easing.ease),
			});
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={[animatedStyle, { marginBottom: 16 }]} className="rounded-3xl">
				<CityCard
					onPress={onPress}
					city={city.name}
					conditionCode={weather.current.condition.code}
					isDay={weather.current.is_day}
					tempC={weather.current.temp_c}
					tempF={weather.current.temp_f}
					displayTime={true}
					timeZone={weather.location.tz_id}
					region={city.region}
				/>
			</Animated.View>
		</GestureDetector>
	);
};

export const ReanimatedTest2 = () => {
	const { favoritesData, refreshFavoriteCities } = useFavoriteCities();
	const { handleCityPress } = useSearchController();

	useFocusEffect(
		useCallback(() => {
			refreshFavoriteCities({ displayToast: false });
		}, [])
	);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={{ flex: 1 }} className="rounded-3xl">
				<ScrollView className="gap-4">
					{favoritesData.length === 0 && (
						<View className="w-full items-center justify-center p-4">
							<Text className="text-center text-gray-500">No saved cities</Text>
						</View>
					)}

					{favoritesData.map(({ city, weather }, index) => (
						<SwipeableCityCard key={index} city={city} weather={weather} onPress={() => handleCityPress(city)} />
					))}
				</ScrollView>
			</View>
		</GestureHandlerRootView>
	);
};

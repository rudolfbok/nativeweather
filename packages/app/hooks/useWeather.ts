import { create } from 'zustand';
import { WeatherData } from 'app/types/weatherData';
import { buildWeatherSlug } from 'app/utils/helpers/buildWeatherSlug';
import { Share } from 'react-native';

interface WeatherState {
	weatherData: WeatherData | null;
	setWeatherData: (data: WeatherData | null) => void;
}

export const shareLink = async (weatherData: WeatherData) => {
	const message = `Current weather in ${weatherData.location.name} - nativeweather.app/${buildWeatherSlug(weatherData)}`;

	try {
		await Share.share({
			message,
			title: `Weather in ${weatherData.location.name}`, // volitelné
		});
	} catch (error) {
		console.error('Error sharing:', error);
	}
};

export const useWeather = create<WeatherState>((set) => ({
	weatherData: null,
	setWeatherData: (data) => set({ weatherData: data }),
}));

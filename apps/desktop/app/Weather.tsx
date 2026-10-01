import { ScreenWrapper } from '@nativeweather/ui/components/common/layout/ScreenWrapper.macos';
import { WeatherFeature } from '@nativeweather/ui/features/weather/screen.macos';

export const Weather = () => {
	return (
		<ScreenWrapper>
			<WeatherFeature />
		</ScreenWrapper>
	);
};

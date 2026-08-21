import { ScreenWrapper } from 'app/components/common/layout/ScreenWrapper.macos';
import { WeatherFeature } from 'app/features/weather/screen.macos';

export const Weather = () => {
	return (
		<ScreenWrapper>
			<WeatherFeature />
		</ScreenWrapper>
	);
};

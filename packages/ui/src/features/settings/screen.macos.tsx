import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { AboutButton } from '@nativeweather/ui/components/settings/items/AboutButton';
import { AQIButton } from '@nativeweather/ui/components/settings/items/AQIButton';
import { FeedbackButton } from '@nativeweather/ui/components/settings/items/FeedbackButton';
import { LanguageButton } from '@nativeweather/ui/components/settings/items/LanguageButton';
import { LocalWeatherToggle } from '@nativeweather/ui/components/settings/items/LocalWeatherToggle';
import { TemperatureButton } from '@nativeweather/ui/components/settings/items/TemperatureButton';
import { ThemeButton } from '@nativeweather/ui/components/settings/items/ThemeButton';
import { UnitsButton } from '@nativeweather/ui/components/settings/items/UnitsButton';
import { WorldTimeToggle } from '@nativeweather/ui/components/settings/items/WorldTimeToggle';
import { View } from 'react-native';

export const SettingsFeature = () => {
	return (
		<View className="w-full gap-4">
			<View className="w-full flex-row items-start gap-4">
				<View className="flex-1 gap-4">
					<RoundView>
						<ThemeButton />
						<LanguageButton />
					</RoundView>
					<RoundView>
						<TemperatureButton />
						<UnitsButton />
						<AQIButton />
					</RoundView>
				</View>
				<View className="flex-1 gap-4">
					<RoundView>
						<LocalWeatherToggle />
						<WorldTimeToggle />
					</RoundView>
					<RoundView>
						<AboutButton />
						<FeedbackButton />
					</RoundView>
				</View>
			</View>

			<View className="items-center">
				<StyledText type="caption">NativeWeather</StyledText>
				<StyledText type="caption">Version: 1.0</StyledText>
				<StyledText type="caption">© {new Date().getFullYear()}</StyledText>
			</View>
		</View>
	);
};

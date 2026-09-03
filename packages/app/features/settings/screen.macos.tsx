import { RoundView } from 'app/components/common/styled/RoundView';
import { StyledText } from 'app/components/common/styled/StyledText';
import { AboutButton } from 'app/components/settings/items/AboutButton';
import { AQIButton } from 'app/components/settings/items/AQIButton';
import { FeedbackButton } from 'app/components/settings/items/FeedbackButton';
import { LanguageButton } from 'app/components/settings/items/LanguageButton';
import { LocalWeatherToggle } from 'app/components/settings/items/LocalWeatherToggle';
import { TemperatureButton } from 'app/components/settings/items/TemperatureButton';
import { ThemeButton } from 'app/components/settings/items/ThemeButton';
import { UnitsButton } from 'app/components/settings/items/UnitsButton';
import { WorldTimeToggle } from 'app/components/settings/items/WorldTimeToggle';
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
				<StyledText type="bodysecondary">NativeWeather</StyledText>
				<StyledText type="bodysecondary">Version: 1.0</StyledText>
				<StyledText type="bodysecondary">© {new Date().getFullYear()}</StyledText>
			</View>
		</View>
	);
};

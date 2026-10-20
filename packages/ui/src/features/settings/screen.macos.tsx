import { RoundView } from '../../components/common/styled/RoundView';
import { StyledText } from '../../components/common/styled/StyledText';
import { AboutButton } from '../../components/settings/items/AboutButton';
import { AQIButton } from '../../components/settings/items/AQIButton';
import { FeedbackButton } from '../../components/settings/items/FeedbackButton';
import { LanguageButton } from '../../components/settings/items/LanguageButton';
import { LocalTimeToggle } from '../../components/settings/items/LocalTimeToggle';
import { LocalWeatherToggle } from '../../components/settings/items/LocalWeatherToggle';
import { TemperatureButton } from '../../components/settings/items/TemperatureButton';
import { ThemeButton } from '../../components/settings/items/ThemeButton';
import { UnitsButton } from '../../components/settings/items/UnitsButton';
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
						<LocalTimeToggle />
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
			</View>
		</View>
	);
};

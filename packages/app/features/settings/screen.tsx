import { RoundView } from 'app/components/common/ui/RoundView';
import { StyledText } from 'app/components/common/styled/StyledText';
import { AQIButton } from 'app/components/settings/items/AQIButton';
import { CompassButton } from 'app/components/settings/items/CompassButton';
import { AboutButton } from 'app/components/settings/items/AboutButton';
import { LanguageButton } from 'app/components/settings/items/LanguageButton';
import { LocalWeatherToggle } from 'app/components/settings/items/LocalWeatherToggle';
import { SendFeedbackButton } from 'app/components/settings/items/SendFeedbackButton';
import { TemperatureButton } from 'app/components/settings/items/TemperatureButton';
import { ThemeButton } from 'app/components/settings/items/ThemeButton';
import { UnitsButton } from 'app/components/settings/items/UnitsButton';
import { WorldTimeToggle } from 'app/components/settings/items/WorldTimeToggle';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { SourceButton } from 'app/components/settings/items/SourceButton';

export const SettingsFeature = ({ title }: { title: string }) => {
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

	return (
		<View className={clsx('px-4 pb-4')}>
			<StyledText type="screentitle" className={clsx('mb-3')}>
				{title}
			</StyledText>
			<View className={clsx('gap-4')}>
				<RoundView>
					<ThemeButton />
					<LanguageButton />
				</RoundView>
				{/* <RoundView>
					<SourceButton />
				</RoundView> */}
				<RoundView>
					<TemperatureButton />
					<UnitsButton />
					<AQIButton />
				</RoundView>
				<RoundView>
					<LocalWeatherToggle />
					<WorldTimeToggle />
				</RoundView>
				{isIOS && (
					<RoundView>
						<CompassButton />
					</RoundView>
				)}
				<RoundView>
					<AboutButton />
					<SendFeedbackButton />
				</RoundView>
				<View className={clsx('flex items-center')}>
					<StyledText type="bodysecondary">NativeWeather</StyledText>
					<StyledText type="bodysecondary">Version: 1.0</StyledText>
					<StyledText type="bodysecondary">© {new Date().getFullYear()}</StyledText>
				</View>
			</View>
		</View>
	);
};

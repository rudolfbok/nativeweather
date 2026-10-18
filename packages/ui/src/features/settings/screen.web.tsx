import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { AboutButton } from '@nativeweather/ui/components/settings/items/AboutButton';
import { AQIButton } from '@nativeweather/ui/components/settings/items/AQIButton';
import { CompassButton } from '@nativeweather/ui/components/settings/items/CompassButton';
import { FeedbackButton } from '@nativeweather/ui/components/settings/items/FeedbackButton';
import { LanguageButton } from '@nativeweather/ui/components/settings/items/LanguageButton';
import { LocalTimeToggle } from '@nativeweather/ui/components/settings/items/LocalTimeToggle';
import { LocalWeatherToggle } from '@nativeweather/ui/components/settings/items/LocalWeatherToggle';
import { TemperatureButton } from '@nativeweather/ui/components/settings/items/TemperatureButton';
import { ThemeButton } from '@nativeweather/ui/components/settings/items/ThemeButton';
import { UnitsButton } from '@nativeweather/ui/components/settings/items/UnitsButton';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const SettingsFeature = () => {
	const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
	const { t } = useTranslate('settings');

	return (
		<View className={clsx('pb-4 web:px-4')}>
			<StyledText type="screentitle" className={clsx('native:hidden mb-3')}>
				{t('settings')}
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
					<LocalTimeToggle />
				</RoundView>
				{isAppleDevice && (
					<RoundView>
						<CompassButton />
					</RoundView>
				)}
				<RoundView>
					<AboutButton />
					<FeedbackButton />
				</RoundView>
				<View className={clsx('flex items-center')}>
					<StyledText type="caption">NativeWeather</StyledText>
					<StyledText type="caption">Version: 1.2</StyledText>
				</View>
			</View>
		</View>
	);
};

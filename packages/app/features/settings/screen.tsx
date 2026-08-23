import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/styled/RoundView';
import { AboutButton } from 'app/components/settings/items/AboutButton';
import { AQIButton } from 'app/components/settings/items/AQIButton';
import { CompassButton } from 'app/components/settings/items/CompassButton';
import { FeedbackButton } from 'app/components/settings/items/FeedbackButton';
import { LanguageButton } from 'app/components/settings/items/LanguageButton';
import { LocalWeatherToggle } from 'app/components/settings/items/LocalWeatherToggle';
import { TemperatureButton } from 'app/components/settings/items/TemperatureButton';
import { ThemeButton } from 'app/components/settings/items/ThemeButton';
import { UnitsButton } from 'app/components/settings/items/UnitsButton';
import { WorldTimeToggle } from 'app/components/settings/items/WorldTimeToggle';
import { clsx } from 'clsx';
import Constants from 'expo-constants';
import { Platform, View } from 'react-native';
import pkg from '../../../../apps/web/package.json';
import { ReactNode } from 'react';

export const SettingsFeature = () => {
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
	const { t } = useTranslate('settings');

	return (
		<View className={clsx('web:px-4 web:pb-4')}>
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
					<WorldTimeToggle />
				</RoundView>
				{isIOS && (
					<RoundView>
						<CompassButton />
					</RoundView>
				)}
				<RoundView>
					<AboutButton />
					<FeedbackButton />
				</RoundView>
				<View className={clsx('flex items-center')}>
					<StyledText type="bodysecondary">NativeWeather</StyledText>
					<StyledText type="bodysecondary">
						Version:&nbsp;
						{Platform.OS === 'web' && pkg.version}
						{(Platform.OS === 'ios' || Platform.OS === 'android') && Constants.expoConfig?.version}
						{Platform.OS === 'macos' && '0.0.1'}
					</StyledText>
					<StyledText type="bodysecondary">© {new Date().getFullYear()}</StyledText>
				</View>
			</View>
		</View>
	);
};

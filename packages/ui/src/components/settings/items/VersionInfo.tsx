import { useTranslate } from '@tolgee/react';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { clsx } from 'clsx';
import Constants from 'expo-constants';
import { View } from 'react-native';

export const VersionInfo = () => {
	const { t } = useTranslate('settings');

	return (
		<View className={clsx('flex items-center')}>
			<StyledText type="caption">NativeWeather</StyledText>
			<StyledText type="caption">
				{t('version')}: {Constants.expoConfig?.version}
			</StyledText>
			<StyledText type="body">© 2025</StyledText>
		</View>
	);
};

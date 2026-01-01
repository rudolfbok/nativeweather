import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/StyledText';
import { clsx } from 'clsx';
import Constants from 'expo-constants';
import { View } from 'react-native';

export const VersionInfo = () => {
	const { t } = useTranslate('settings');

	return (
		<View className={clsx('flex items-center')}>
			<StyledText type="bodysecondary">NativeWeather</StyledText>
			<StyledText type="bodysecondary">
				{t('version')}: {Constants.expoConfig?.version}
			</StyledText>
			<StyledText type="body">© 2025</StyledText>
		</View>
	);
};

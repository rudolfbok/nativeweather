import { getSettingOption, isSettingOptionKey, OptionList, ScreenWrapper } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';

export default function SettingOptionScreen() {
	const { option } = useLocalSearchParams<{ option: string }>();
	const { t } = useTranslate('settings');

	if (!isSettingOptionKey(option)) return <Redirect href="/settings" />;

	const { titleKey, pageTitleKey } = getSettingOption(option);

	return (
		<>
			<Stack.Screen options={{ title: t(pageTitleKey ?? titleKey) }} />
			<ScreenWrapper>
				<OptionList option={option} />
			</ScreenWrapper>
		</>
	);
}

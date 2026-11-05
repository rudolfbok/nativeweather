// STUB(phase-6): slice 6.9 replaces this with the shared option list.
import { useStorageString } from '@nativeweather/core';
import { Pressable, RoundView, ScreenWrapper, Separator, Text } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { Fragment } from 'react';
import { View } from 'react-native';
import { isSettingOptionKey, settingOptions } from '@/settings/options';
import type { SettingOptionKey } from '@/settings/options';

const OptionList = ({ option }: { option: SettingOptionKey }) => {
	const { t } = useTranslate('settings');
	const { storageKey, titleKey, values } = settingOptions[option];
	const [current, setCurrent] = useStorageString(storageKey);

	return (
		<View className="flex-1 bg-screen-background">
			<Stack.Screen options={{ title: t(titleKey) }} />
			<ScreenWrapper>
				<RoundView>
					{values.map(([value, labelKey], index) => (
						<Fragment key={value}>
							{index > 0 && <Separator className="mx-4" />}
							<Pressable className="flex-row justify-between p-4" onPress={() => setCurrent(value)}>
								<Text type="body">{labelKey ? t(labelKey) : value}</Text>
								{current === value && <Text type="body">✓</Text>}
							</Pressable>
						</Fragment>
					))}
				</RoundView>
			</ScreenWrapper>
		</View>
	);
};

export default function SettingOptionScreen() {
	const { option } = useLocalSearchParams<{ option: string }>();

	return isSettingOptionKey(option) ? <OptionList option={option} /> : <Redirect href="/settings" />;
}

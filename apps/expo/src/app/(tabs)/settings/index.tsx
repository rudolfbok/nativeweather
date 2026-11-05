// STUB(phase-6): settings list arrives with slice 6.9.
import { Pressable, RoundView, ScreenWrapper, Separator, Text } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Link } from 'expo-router';
import { Fragment } from 'react';
import { View } from 'react-native';
import { settingOptions } from '@/settings/options';
import type { SettingOptionKey } from '@/settings/options';

const optionKeys = Object.keys(settingOptions) as SettingOptionKey[];

export default function SettingsScreen() {
	const { t } = useTranslate('settings');

	return (
		<View className="flex-1 bg-screen-background">
			<ScreenWrapper>
				<RoundView>
					{optionKeys.map((option) => (
						<Fragment key={option}>
							<Link href={{ pathname: '/settings/[option]', params: { option } }} asChild>
								<Pressable className="p-4">
									<Text type="body">{t(settingOptions[option].titleKey)}</Text>
								</Pressable>
							</Link>
							<Separator className="mx-4" />
						</Fragment>
					))}
					<Link href="/settings/about" asChild>
						<Pressable className="p-4">
							<Text type="body">{t('about.title')}</Text>
						</Pressable>
					</Link>
				</RoundView>
				<View className="h-8" />
			</ScreenWrapper>
		</View>
	);
}

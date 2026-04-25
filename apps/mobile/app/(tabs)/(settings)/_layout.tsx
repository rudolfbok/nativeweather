import { useTranslate } from '@tolgee/react';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
	const { t } = useTranslate('settings');
	const { backgroundColor, textColor } = useThemeColors();

	return (
		<Stack
			nativeContainerStyle={{ backgroundColor }}
			screenOptions={{
				headerTransparent: true,
				headerTintColor: textColor,
				headerBackButtonDisplayMode: 'minimal',
				contentStyle: {
					backgroundColor,
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerLargeTitleEnabled: true,
					headerTitle: t('settings'),
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<Stack.Screen
				name="theme"
				options={{
					headerTitle: t('theme.title'),
				}}
			/>
			<Stack.Screen
				name="language"
				options={{
					headerTitle: t('language.title'),
				}}
			/>
			<Stack.Screen
				name="temperature"
				options={{
					headerTitle: t('temperature'),
				}}
			/>
			<Stack.Screen
				name="units"
				options={{
					headerTitle: t('units.title'),
				}}
			/>
			<Stack.Screen
				name="aqi"
				options={{
					headerTitle: t('airquality.title'),
				}}
			/>
			<Stack.Screen
				name="source"
				options={{
					headerTitle: t('source.title'),
				}}
			/>
			<Stack.Screen
				name="about"
				options={{
					headerTitle: t('about.title'),
					headerLargeTitleEnabled: true,
				}}
			/>
			<Stack.Screen
				name="feedback"
				options={{
					title: t('feedback.title'),
					headerLargeTitleEnabled: true,
				}}
			/>
		</Stack>
	);
}

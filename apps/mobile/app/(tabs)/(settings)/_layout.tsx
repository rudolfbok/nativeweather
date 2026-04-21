import { useHeaderHeight } from '@react-navigation/elements';
import { useTranslate } from '@tolgee/react';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
	const { t } = useTranslate('settings');
	const headerHeight = useHeaderHeight();
	const backgroundColor = useSwitchColors('#F2F2F7', '#000');

	return (
		<Stack
			nativeContainerStyle={{ backgroundColor }}
			screenOptions={{
				headerShadowVisible: false,
				headerTintColor: useSwitchColors('black', 'white'),
				headerBackButtonDisplayMode: 'minimal',
				contentStyle: {
					backgroundColor,
					paddingHorizontal: 16,
					paddingTop: headerHeight,
				},
				headerStyle: {
					backgroundColor,
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					contentStyle: {
						backgroundColor,
					},
					headerTransparent: true,
					headerLargeTitle: true,
					title: t('settings'),
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
					headerTransparent: true,
					headerStyle: {
						backgroundColor: 'transparent',
					},
					contentStyle: {
						backgroundColor,
						paddingTop: headerHeight,
					},
				}}
			/>
			<Stack.Screen
				name="feedback"
				options={{
					title: t('feedback.title'),
				}}
			/>
		</Stack>
	);
}

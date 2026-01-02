import { useHeaderHeight } from '@react-navigation/elements';
import { useTranslate } from '@tolgee/react';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
	const { t } = useTranslate('settings');
	const headerHeight = useHeaderHeight();

	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerTintColor: useSwitchColors('black', 'white'),
				contentStyle: {
					backgroundColor: useSwitchColors('#F2F2F7', '#000'),
					paddingHorizontal: 16,
					paddingTop: headerHeight,
				},
				headerStyle: {
					backgroundColor: useSwitchColors('#F2F2F7', '#000'),
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					contentStyle: {
						backgroundColor: useSwitchColors('#F2F2F7', '#000'),
						paddingHorizontal: 0,
					},
					headerTransparent: true,
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
				name="datasource"
				options={{
					headerTitle: t('datasource'),
					headerTransparent: true,
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			{/* 
			<Stack.Screen
				name="compass"
				options={{
					headerShown: Platform.OS === 'web' ? false : true,
					title: t('settings.compass'),
				}}
			/>
			<Stack.Screen
				name="feedback"
				options={{
					headerShown: Platform.OS === 'web' ? false : true,
					title: t('settings.feedback'),
				}}
			/> */}
		</Stack>
	);
}

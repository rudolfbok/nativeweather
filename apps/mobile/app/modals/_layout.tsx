import { useTranslate } from '@tolgee/react';
import { ModalHeader } from '@nativeweather/ui/components/common/modal/ModalHeader';
import {
	CloudsIcon,
	HumidityIcon,
	MoonIcon,
	PressureIcon,
	RainIcon,
	RangeIcon,
	SnowIcon,
	SunriseIcon,
	SunsetIcon,
	UVIcon,
	WindIcon,
} from '@nativeweather/ui/components/icons/main';
import { CloseIcon } from '@nativeweather/ui/components/icons/ui/CloseIcon';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { router, Stack, useNavigation } from 'expo-router';
import { Pressable } from 'react-native';

export default function ModalsLayout() {
	const { t } = useTranslate('weather');
	const { t: settingsT } = useTranslate('settings');
	const { modalBg, text } = useThemeColors();
	const navigation = useNavigation('/modals');
	const closeModal = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
			return;
		}

		router.replace('/(tabs)/(weather)/[city]');
	};

	return (
		<Stack
			nativeContainerStyle={{ backgroundColor: modalBg }}
			screenOptions={{
				headerBackButtonDisplayMode: 'minimal',
				headerTransparent: true,
				scrollEdgeEffects: {
					top: 'soft',
				},
				headerTitleStyle: {
					color: text,
				},
				headerRight: () => (
					<Pressable onPress={closeModal} className={clsx('h-10 w-10 items-center justify-center')}>
						<CloseIcon />
					</Pressable>
				),
			}}
		>
			<Stack.Screen
				name="humidity"
				options={{
					headerTitle: () => <ModalHeader icon={<HumidityIcon />} header={t('humidity.title')} />,
				}}
			/>
			<Stack.Screen
				name="moon"
				options={{
					headerTitle: () => <ModalHeader icon={<MoonIcon />} header={t('moon.title')} />,
				}}
			/>
			<Stack.Screen
				name="pressure"
				options={{
					headerTitle: () => <ModalHeader icon={<PressureIcon />} header={t('pressure.title')} />,
				}}
			/>
			<Stack.Screen
				name="rain"
				options={{
					headerTitle: () => <ModalHeader icon={<RainIcon />} header={t('rain.title')} />,
				}}
			/>
			<Stack.Screen
				name="snow"
				options={{
					headerTitle: () => <ModalHeader icon={<SnowIcon />} header={t('snow.title')} />,
				}}
			/>
			<Stack.Screen
				name="sunrise"
				options={{
					headerTitle: () => <ModalHeader icon={<SunriseIcon />} header={t('sunrise.title')} />,
				}}
			/>
			<Stack.Screen
				name="sunset"
				options={{
					headerTitle: () => <ModalHeader icon={<SunsetIcon />} header={t('sunset.title')} />,
				}}
			/>
			<Stack.Screen
				name="uv"
				options={{
					headerTitle: () => <ModalHeader icon={<UVIcon />} header="UV Index" />,
				}}
			/>
			<Stack.Screen
				name="range"
				options={{
					headerTitle: () => <ModalHeader icon={<RangeIcon />} header={t('range.title')} />,
				}}
			/>
			<Stack.Screen
				name="wind"
				options={{
					headerTitle: () => <ModalHeader icon={<WindIcon />} header={t('wind.title')} />,
				}}
			/>
			<Stack.Screen
				name="clouds"
				options={{
					headerTitle: () => <ModalHeader icon={<CloudsIcon />} header={t('cloudcover.title')} />,
				}}
			/>
			<Stack.Screen name="airquality" options={{ headerShown: false }} />
			<Stack.Screen name="alerts" options={{ headerShown: false }} />
			<Stack.Screen name="feedback" options={{ title: settingsT('feedback.title') }} />
		</Stack>
	);
}

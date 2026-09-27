import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
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
} from 'app/components/icons/main';
import { CloseIcon } from 'app/components/icons/ui/CloseIcon';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { router, Stack, useNavigation } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

export default function ModalsLayout() {
	const { t } = useTranslate('weather');
	const { modalBg, text } = useThemeColors();
	const navigation = useNavigation('/modals');
	const closeModal = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
			return;
		}

		router.replace('/(tabs)/(weather)/[city]');
	};

	const ModalHeader = ({ icon, title }: { icon: ReactNode; title: string }) => {
		return (
			<View className={clsx('flex-row items-center gap-2')}>
				{icon}
				<StyledText type="title" className="font-bold">
					{title}
				</StyledText>
			</View>
		);
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
					headerTitle: () => <ModalHeader icon={<HumidityIcon />} title={t('humidity.title')} />,
				}}
			/>
			<Stack.Screen
				name="moon"
				options={{
					headerTitle: () => <ModalHeader icon={<MoonIcon />} title={t('moon.title')} />,
				}}
			/>
			<Stack.Screen
				name="pressure"
				options={{
					headerTitle: () => <ModalHeader icon={<PressureIcon />} title={t('pressure.title')} />,
				}}
			/>
			<Stack.Screen
				name="rain"
				options={{
					headerTitle: () => <ModalHeader icon={<RainIcon />} title={t('rain.title')} />,
				}}
			/>
			<Stack.Screen
				name="snow"
				options={{
					headerTitle: () => <ModalHeader icon={<SnowIcon />} title={t('snow.title')} />,
				}}
			/>
			<Stack.Screen
				name="sunrise"
				options={{
					headerTitle: () => <ModalHeader icon={<SunriseIcon />} title={t('sunrise.title')} />,
				}}
			/>
			<Stack.Screen
				name="sunset"
				options={{
					headerTitle: () => <ModalHeader icon={<SunsetIcon />} title={t('sunset.title')} />,
				}}
			/>
			<Stack.Screen
				name="uv"
				options={{
					headerTitle: () => <ModalHeader icon={<UVIcon />} title="UV Index" />,
				}}
			/>
			<Stack.Screen
				name="range"
				options={{
					headerTitle: () => <ModalHeader icon={<RangeIcon />} title={t('range.title')} />,
				}}
			/>
			<Stack.Screen
				name="wind"
				options={{
					headerTitle: () => <ModalHeader icon={<WindIcon />} title={t('wind.title')} />,
				}}
			/>
			<Stack.Screen
				name="clouds"
				options={{
					headerTitle: () => <ModalHeader icon={<CloudsIcon />} title={t('cloudcover.title')} />,
				}}
			/>
			<Stack.Screen name="airquality" options={{ headerShown: false }} />
			<Stack.Screen name="alerts" options={{ headerShown: false }} />
		</Stack>
	);
}

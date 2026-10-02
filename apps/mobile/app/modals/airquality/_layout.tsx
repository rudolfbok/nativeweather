import { useTranslate } from '@tolgee/react';
import { ModalHeader } from '@nativeweather/ui/components/common/modal/ModalHeader';
import { AirQualityIcon } from '@nativeweather/ui/components/icons/main/AirQualityIcon';
import { CloseIcon } from '@nativeweather/ui/components/icons/ui/CloseIcon';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { router, Stack } from 'expo-router';
import { Pressable } from 'react-native';

export default function ModalsLayout() {
	const { t } = useTranslate('weather');
	const { modalBg, text } = useThemeColors();

	return (
		<Stack
			screenOptions={{
				headerTransparent: true,
				headerBackButtonDisplayMode: 'minimal',
				headerTitleStyle: { color: text },
				headerRight: () => (
					<Pressable
						onPress={() => router.replace('/(tabs)/(weather)/[city]')}
						className={clsx('h-10 w-10 items-center justify-center')}
					>
						<CloseIcon />
					</Pressable>
				),
				contentStyle: {
					backgroundColor: modalBg,
				},
			}}
			nativeContainerStyle={{ backgroundColor: modalBg }}
		>
			<Stack.Screen
				name="index"
				options={{
					scrollEdgeEffects: {
						top: 'soft',
					},
					headerTitle: () => <ModalHeader icon={<AirQualityIcon />} header={t('airquality.title')} />,
				}}
			/>
			<Stack.Screen
				name="no2"
				options={{
					headerTitle: t('airquality.item.no2'),
				}}
			/>
			<Stack.Screen
				name="o3"
				options={{
					headerTitle: t('airquality.item.ozone'),
				}}
			/>
			<Stack.Screen
				name="pm10"
				options={{
					headerTitle: t('airquality.item.pm10'),
				}}
			/>
			<Stack.Screen
				name="pm25"
				options={{
					headerTitle: t('airquality.item.pm25'),
				}}
			/>
			<Stack.Screen
				name="usaqi"
				options={{
					headerTitle: t('airquality.item.usaqi'),
				}}
			/>
			<Stack.Screen
				name="euaqi"
				options={{
					headerTitle: t('airquality.item.euaqi'),
				}}
			/>
		</Stack>
	);
}

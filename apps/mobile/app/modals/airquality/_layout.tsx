import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { AirQualityIcon } from 'app/components/icons/main/AirQualityIcon';
import { CloseIcon } from 'app/components/icons/ui/CloseIcon';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { clsx } from 'clsx';
import { router, Stack } from 'expo-router';
import React, { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

export default function ModalsLayout() {
	const { t } = useTranslate('weather');
	const { modalBg } = useThemeColors();

	const ModalHeader = ({ icon, title }: { icon: ReactNode; title: string }) => {
		return (
			<View className={clsx('flex-row items-center gap-2')}>
				{icon}
				<StyledText type="title">{title}</StyledText>
			</View>
		);
	};

	return (
		<Stack
			screenOptions={{
				headerTransparent: true,
				headerBackButtonDisplayMode: 'minimal',
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
					headerTitle: () => <ModalHeader icon={<AirQualityIcon />} title={t('airquality.title')} />,
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

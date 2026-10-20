import { useTranslate } from '@tolgee/react';
import { ModalHeader } from '@nativeweather/ui/components/common/modal/ModalHeader';
import { AlertIcon } from '@nativeweather/ui/components/icons/main/AlertIcon';
import { CloseIcon } from '@nativeweather/ui/components/icons/ui/CloseIcon';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import { getAlerts, getMostSevereAlert } from '@nativeweather/core/utils/alertFilters';
import { getAlertSeverityDotColor } from '@nativeweather/core/utils/mappings/alertSeverity';
import { clsx } from 'clsx';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function ModalsLayout() {
	const { t } = useTranslate('weather');
	const { modalBg, text } = useThemeColors();
	const weatherData = useWeather((state) => state.weatherData);
	const router = useRouter();
	const filteredAlerts = getAlerts(weatherData?.alerts.alert, weatherData?.location);
	const alertIconColor = getAlertSeverityDotColor(getMostSevereAlert(filteredAlerts)?.severity ?? 'Unknown');

	return (
		<Stack
			unstable_nativeProps={{ nativeContainerStyle: { backgroundColor: modalBg } }}
			screenOptions={{
				headerTransparent: true,
				contentStyle: {
					backgroundColor: modalBg,
				},
				headerTitleStyle: {
					color: text,
				},
				headerRight: () => (
					<Pressable onPress={() => router.back()} className={clsx('h-10 w-10 items-center justify-center')}>
						<CloseIcon />
					</Pressable>
				),
				headerBackButtonMenuEnabled: true,
				headerBackButtonDisplayMode: 'minimal',
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: () => (
						<ModalHeader icon={<AlertIcon mostSevere={alertIconColor} />} header={t('alerts.modaltitle')} />
					),
				}}
			/>
			<Stack.Screen
				name="detail"
				options={{
					headerTitle: 'detail',
				}}
			/>
		</Stack>
	);
}

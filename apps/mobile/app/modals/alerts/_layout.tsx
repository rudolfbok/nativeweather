import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { AlertIcon } from 'app/components/icons/main/AlertIcon';
import { CloseIcon } from 'app/components/icons/ui/CloseIcon';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { useWeather } from 'app/hooks/weather/useWeather';
import { getAlerts, getMostSevereAlert } from 'app/utils/helpers/getAlerts';
import { getAlertSeverityDotColor } from 'app/utils/mappings/mapAlertSeverity';
import { clsx } from 'clsx';
import { Stack, useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

export default function ModalsLayout() {
	const { t } = useTranslate('weather');
	const { modalBg, text } = useThemeColors();
	const weatherData = useWeather((state) => state.weatherData);
	const router = useRouter();
	const filteredAlerts = getAlerts(weatherData?.alerts.alert, weatherData?.location);
	const alertIconColor = getAlertSeverityDotColor(getMostSevereAlert(filteredAlerts)?.severity ?? 'Unknown');

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
			nativeContainerStyle={{ backgroundColor: modalBg }}
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
						<ModalHeader icon={<AlertIcon mostSevere={alertIconColor} />} title={t('alerts.modaltitle')} />
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

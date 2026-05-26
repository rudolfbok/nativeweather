import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { WeatherAlert } from 'app/types/weatherAlert';
import { clsx } from 'clsx';
import { Platform, View } from 'react-native';
import { AlertDetail } from './AlertDetail';
import { AlertItem } from './AlertItem';
import { useRouter } from 'solito/navigation';

interface AlertModalProps {
	onPress?: (alert: WeatherAlert) => void;
	filteredAlerts?: WeatherAlert[];
	selectedAlert?: WeatherAlert | null;
}

export const AlertModal = ({ onPress, filteredAlerts = [], selectedAlert = null }: AlertModalProps) => {
	const { t } = useTranslate('weather');
	const router = useRouter();

	return (
		<>
			<View>
				{selectedAlert === null && (
					<View className={clsx('gap-4')}>
						{filteredAlerts.map((alert, index) => (
							<AlertItem
								key={alert.identifier || index}
								onPress={
									Platform.OS === 'web'
										? () => onPress?.(alert)
										: () => router.push(`/modals/alerts/detail?alert=${index}`)
								}
								title={alert.event}
								area={alert.areas}
							/>
						))}
					</View>
				)}

				{selectedAlert && (
					<AlertDetail
						severity={selectedAlert.severity}
						area={selectedAlert.areas}
						expires={selectedAlert.expires}
						description={selectedAlert.desc}
						instructions={selectedAlert.instruction}
					/>
				)}
			</View>
			<StyledText type="bodysecondary" className={clsx('mt-4 text-center opacity-70')}>
				{t('alerts.disclaimer')}
			</StyledText>
		</>
	);
};

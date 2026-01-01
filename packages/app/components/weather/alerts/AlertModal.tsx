import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import clsx from 'clsx';
import { View } from 'react-native';
import { AlertDetail } from './AlertDetail';
import { AlertItem } from './AlertItem';
import { CircleAlert } from 'lucide-react-native';
import { useTranslate } from '@tolgee/react';
import { WeatherAlert } from 'app/types/weatherAlert';

interface AlertModalProps {
	visible: boolean;
	onClose: () => void;
	goBackOnPress: () => void;
	onPress: (alert: WeatherAlert) => void;
	filteredAlerts: WeatherAlert[];
	selectedAlert: WeatherAlert | null;
}

export const AlertModal = ({
	visible,
	onClose,
	onPress,
	goBackOnPress,
	filteredAlerts,
	selectedAlert,
}: AlertModalProps) => {
	const { t } = useTranslate('weather');
	return (
		<StyledModal
			visible={visible}
			icon={selectedAlert ? undefined : <CircleAlert color="#007AFF" />}
			header={selectedAlert === null ? t('alerts.modaltitle') : selectedAlert.event}
			goBackHeader={selectedAlert ? true : false}
			goBackOnPress={goBackOnPress}
			onClose={onClose}
		>
			<View className={clsx('mt-2')}>
				{selectedAlert === null && (
					<View className={clsx('gap-4')}>
						{filteredAlerts.map((alert, index) => (
							<AlertItem
								onPress={() => onPress(alert)}
								key={index}
								title={alert.event}
								severity={alert.severity}
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
			<StyledText type="bodysecondary" className={clsx('mt-4 text-center')}>
				{t('alerts.disclaimer')}
			</StyledText>
		</StyledModal>
	);
};

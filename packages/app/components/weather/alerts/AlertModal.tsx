import { RoundView } from 'app/components/common/ui/RoundView';
import { Separator } from 'app/components/common/ui/Separator';
import { WeatherAlert } from 'app/types/weatherAPI';
import { clsx } from 'clsx';
import { Platform, View } from 'react-native';
import { useRouter } from 'solito/navigation';
import { AlertDetail } from './AlertDetail';
import { AlertItem } from './AlertItem';

interface AlertModalProps {
	onPress?: (alert: WeatherAlert) => void;
	filteredAlerts?: WeatherAlert[];
	selectedAlert?: WeatherAlert | null;
}

export const AlertModal = ({ onPress, filteredAlerts = [], selectedAlert = null }: AlertModalProps) => {
	const router = useRouter();

	return (
		<>
			<View>
				{selectedAlert === null && (
					<RoundView>
						{filteredAlerts.map((alert, index) => (
							<View key={alert.identifier || index}>
								<AlertItem
									onPress={
										Platform.OS === 'web' || Platform.OS === 'macos'
											? () => onPress?.(alert)
											: () => router.push(`/modals/alerts/detail?alert=${index}`)
									}
									title={alert.event}
									area={alert.areas}
									severity={alert.severity}
								/>
								{index < filteredAlerts.length - 1 && <Separator className={clsx('mx-4')} />}
							</View>
						))}
					</RoundView>
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
		</>
	);
};

import { findAlert, useAlerts } from '@nativeweather/core';
import { AlertDetail } from '@nativeweather/ui';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useStackedModal } from '@/hooks/useStackedModal';
import { AppModalScreen } from '@/components/AppModalScreen';

export default function AlertModal() {
	const { alert: key } = useLocalSearchParams<{ alert: string }>();
	const { alerts } = useAlerts();
	const { stacked, onBack, onClose } = useStackedModal();
	const alert = findAlert(alerts, key);

	// The alert may have expired since the link was opened, or the weather isn't loaded yet.
	if (!alert) return <Redirect href="/" />;

	return (
		<AppModalScreen header={alert.event} stacked={stacked} onBack={onBack} onClose={onClose}>
			<AlertDetail alert={alert} />
		</AppModalScreen>
	);
}

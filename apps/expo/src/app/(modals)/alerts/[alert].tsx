import { findAlert, useAlerts } from '@/core';
import { AlertDetail, ModalScreen } from '@/ui';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function AlertModal() {
	const { alert: key } = useLocalSearchParams<{ alert: string }>();
	const { alerts } = useAlerts();
	const { stacked, onBack, onClose } = useStackedModal();
	const alert = findAlert(alerts, key);

	// The alert may have expired since the link was opened, or the weather isn't loaded yet.
	if (!alert) return <Redirect href="/" />;

	return (
		<ModalScreen header={alert.event} stacked={stacked} onBack={onBack} onClose={onClose}>
			<AlertDetail alert={alert} />
		</ModalScreen>
	);
}

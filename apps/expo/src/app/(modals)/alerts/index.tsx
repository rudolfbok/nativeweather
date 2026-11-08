import { getAlertKey, useAlerts } from '@/core';
import { AlertList, ModalScreen, SeverityDot } from '@/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, router } from 'expo-router';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function AlertsModal() {
	const { t } = useTranslate('weather');
	const { alerts, mostSevere } = useAlerts();
	const { onClose } = useStackedModal();

	// Weather only lives in memory for now, so a reload of this URL has nothing to show.
	if (!alerts.length) return <Redirect href="/" />;

	return (
		<ModalScreen
			header={t('alerts.modaltitle')}
			icon={<SeverityDot severity={mostSevere?.severity} />}
			onClose={onClose}
		>
			<AlertList
				alerts={alerts}
				onOpen={(alert) => router.push({ pathname: '/alerts/[alert]', params: { alert: getAlertKey(alert) } })}
			/>
		</ModalScreen>
	);
}

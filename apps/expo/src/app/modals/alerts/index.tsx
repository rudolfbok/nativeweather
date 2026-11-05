import { getAlertKey, useAlerts } from '@nativeweather/core';
import { AlertList, SeverityDot } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, router } from 'expo-router';
import { useStackedModal } from '@/hooks/useStackedModal';
import { AppModalScreen } from '@/components/AppModalScreen';

export default function AlertsModal() {
	const { t } = useTranslate('weather');
	const { alerts, mostSevere } = useAlerts();
	const { onClose } = useStackedModal();

	// Weather only lives in memory for now, so a reload of this URL has nothing to show.
	if (!alerts.length) return <Redirect href="/" />;

	return (
		<AppModalScreen
			header={t('alerts.modaltitle')}
			icon={<SeverityDot severity={mostSevere?.severity} />}
			onClose={onClose}
		>
			<AlertList
				alerts={alerts}
				onOpen={(alert) => router.push({ pathname: '/modals/alerts/[alert]', params: { alert: getAlertKey(alert) } })}
			/>
		</AppModalScreen>
	);
}

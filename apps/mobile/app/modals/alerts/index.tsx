import { ModalHeader } from 'app/components/common/ui/ModalHeader';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { AlertModal } from 'app/components/weather/alerts/AlertModal';
import { useWeather } from 'app/hooks/weather/useWeather';
import { getAlerts } from 'app/utils/helpers/getAlerts';
import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslate } from '@tolgee/react';

export default function AlertModalScreen() {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const filteredAlerts = getAlerts(weatherData?.alerts.alert, weatherData?.location);
	const navigation = useNavigation();

	// navigation.setOptions({
	// 	headerTitle: <ModalHeader icon={<AlertIcon color="#007AFF" />} title={t('alerts.modaltitle')} />
	// })

	return (
		<ModalScrollView>
			<AlertModal filteredAlerts={filteredAlerts} />
		</ModalScrollView>
	);
}

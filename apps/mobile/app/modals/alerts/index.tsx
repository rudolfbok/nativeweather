import { ModalHeader } from '@nativeweather/ui/components/common/modal/ModalHeader';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { AlertModal } from '@nativeweather/ui/components/alerts/AlertModal';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { getAlerts } from '@nativeweather/core/utils/alertFilters';
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

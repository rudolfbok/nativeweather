import { useWeather } from '@nativeweather/core';
import { AirQualityGrid, AirQualityIcon } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, router } from 'expo-router';
import { useStackedModal } from '@/hooks/useStackedModal';
import { AppModalScreen } from '@/components/AppModalScreen';

export default function AirQualityModal() {
	const { t } = useTranslate('weather');
	const hasData = useWeather((state) => Boolean(state.airQualityData));
	const { onClose } = useStackedModal();

	// Air quality only lives in memory for now, so a reload of this URL has nothing to show.
	if (!hasData) return <Redirect href="/" />;

	return (
		<AppModalScreen header={t('airquality.title')} icon={<AirQualityIcon />} onClose={onClose}>
			<AirQualityGrid
				onOpen={(pollutant) => router.push({ pathname: '/modals/airquality/[pollutant]', params: { pollutant } })}
			/>
		</AppModalScreen>
	);
}

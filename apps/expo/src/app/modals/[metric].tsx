import { useWeather } from '@nativeweather/core';
import { isMetricId, metricDefinitions, ModalScreen } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function MetricModal() {
	const { metric, day } = useLocalSearchParams<{ metric: string; day?: string }>();
	const { t } = useTranslate('weather');
	const { stacked, onBack, onClose } = useStackedModal();
	const days = useWeather((state) => state.weatherData?.forecast.forecastday);

	// Weather only lives in memory for now, so a reload of this URL has nothing to show.
	if (!days?.length || !isMetricId(metric)) return <Redirect href="/" />;

	const { Icon, titleKey, Modal } = metricDefinitions[metric];
	const dayIndex = Math.min(Math.max(0, Number(day) || 0), days.length - 1);

	return (
		<ModalScreen header={t(titleKey)} icon={<Icon />} stacked={stacked} onBack={onBack} onClose={onClose}>
			<Modal dayIndex={dayIndex} onSelectDay={(index) => router.setParams({ day: String(index) })} />
		</ModalScreen>
	);
}

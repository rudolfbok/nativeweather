import { useWeather } from '@nativeweather/core';
import { isMetricId, metricDefinitions, ModalScreen } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router';

const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

export default function MetricModal() {
	const { metric, day } = useLocalSearchParams<{ metric: string; day?: string }>();
	const { t } = useTranslate('weather');
	const navigation = useNavigation();
	const days = useWeather((state) => state.weatherData?.forecast.forecastday);

	// Weather only lives in memory for now, so a reload of this URL has nothing to show.
	if (!days?.length || !isMetricId(metric)) return <Redirect href="/" />;

	const { Icon, titleKey, Modal } = metricDefinitions[metric];
	const dayIndex = Math.min(Math.max(0, Number(day) || 0), days.length - 1);
	// Opened from the forecast modal: back returns to it, close dismisses both.
	const stacked = (navigation.getState()?.index ?? 0) > 0;

	return (
		<ModalScreen
			header={t(titleKey)}
			icon={<Icon />}
			stacked={stacked}
			onBack={stacked ? router.back : undefined}
			onClose={stacked ? () => navigation.getParent()?.goBack() : close}
		>
			<Modal dayIndex={dayIndex} onSelectDay={(index) => router.setParams({ day: String(index) })} />
		</ModalScreen>
	);
}

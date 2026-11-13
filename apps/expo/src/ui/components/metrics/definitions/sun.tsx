import { formatTime, hasSunEventPassed, useSunEventCountdown } from '@/core';
import { useTranslate } from '@tolgee/react';
import { Text } from '../../common/Text';
import { SunriseIcon } from '../../icons/main/SunriseIcon';
import { SunsetIcon } from '../../icons/main/SunsetIcon';
import { MetricModal } from '../MetricModal';
import type { MetricDefinition } from '../types';
import { useMetricContext } from '../useMetricContext';

type SunEvent = 'sunrise' | 'sunset';

const Countdown = (props: { data: string; tomorrowData?: string; timeZone: string }) => {
	const { t } = useTranslate('weather');
	const countdown = useSunEventCountdown(props);

	return (
		countdown && (
			<Text type="body" numberOfLines={1}>
				{t('remainingtime', countdown)}
			</Text>
		)
	);
};

const createSunEvent = (event: SunEvent, Icon: MetricDefinition['Icon'], detailKey: string): MetricDefinition => ({
	Icon,
	titleKey: `${event}.title`,
	card: ({ weather: { forecast, location }, language }) => {
		const [today, tomorrow] = forecast.forecastday;
		// Matches the countdown, which targets tomorrow's event once today's has passed.
		const next = tomorrow && hasSunEventPassed(today.astro[event], location.tzId) ? tomorrow : today;

		return {
			value: formatTime(next.astro[event], language),
			extra: <Countdown data={today.astro[event]} tomorrowData={tomorrow?.astro[event]} timeZone={location.tzId} />,
		};
	},
	Modal: () => {
		const context = useMetricContext();

		if (!context) return null;

		const { t } = context;

		return (
			<MetricModal
				sections={[
					{ title: t('modal.description'), text: t(`${event}.text`) },
					{ title: t(`${detailKey}.title`), text: t(`${detailKey}.text`) },
				]}
			/>
		);
	},
});

export const sunrise = createSunEvent('sunrise', SunriseIcon, 'sunrise.dawn');
export const sunset = createSunEvent('sunset', SunsetIcon, 'sunset.twilight');

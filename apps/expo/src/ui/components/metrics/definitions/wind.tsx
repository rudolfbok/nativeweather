import { getDirection, getRangeIndex, metricBounds } from '@/core';
import { Gauge, Wind } from 'lucide-react-native';
import { Fragment } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { Separator } from '../../common/Separator';
import { Text } from '../../common/Text';
import { WindIcon } from '../../icons/main/MetricIcons';
import { WindArrowIcon } from '../../icons/ui/WindArrowIcon';
import { WindDirectionIcon } from '../../icons/ui/WindDirectionIcon';
import { WeatherChart } from '../../weather/WeatherChart';
import { MetricModal } from '../MetricModal';
import type { MetricDefinition } from '../types';
import { useMetricContext } from '../useMetricContext';

const GaugeIcon = withUniwind(Gauge);
const GustIcon = withUniwind(Wind);

// Beaufort 0–12: metric and imperial ranges plus a scale colour (data, not theme tokens).
const beaufortScale = [
	['< 1km/h', '< 1mph', undefined],
	['1 - 5km/h', '1 - 2mph', '#0891B2'],
	['6 - 11km/h', '3 - 7mph', '#059669'],
	['12 - 19km/h', '8 - 12mph', '#16A34A'],
	['20 - 28km/h', '13 - 18mph', '#22C55E'],
	['29 - 38km/h', '19 - 24mph', '#65A30D'],
	['39 - 49km/h', '25 - 31mph', '#84CC16'],
	['50 - 61km/h', '32 - 38mph', '#A3A300'],
	['62 - 74km/h', '39 - 46mph', '#CA8A04'],
	['75 - 88km/h', '47 - 54mph', '#EA580C'],
	['89 - 102km/h', '55 - 63mph', '#DC2626'],
	['103 - 117km/h', '64 - 72mph', '#B91C1C'],
	['> 118km/h', '> 73mph', '#991B1B'],
] as const;

export const wind: MetricDefinition = {
	Icon: WindIcon,
	titleKey: 'wind.title',
	usesDate: true,
	card: ({ weather, t, isMetric }, dayIndex) => {
		const day = dayIndex === null ? null : weather.forecast.forecastday[dayIndex]?.day;
		const speed = Math.round(
			day ? (isMetric ? day.maxWindKph : day.maxWindMph) : isMetric ? weather.current.windKph : weather.current.windMph
		);
		const level = getRangeIndex(speed, isMetric ? metricBounds.windKph : metricBounds.windMph);

		return {
			value: `${speed}${isMetric ? 'km/h' : 'mph'}`,
			description: t(`description.windspeed.${level}`),
			// A forecast day has no single direction.
			extra: !day && (
				<View className="flex-row items-center gap-1">
					<Text type="body" className="min-w-0 shrink" numberOfLines={1}>
						{getDirection(weather.current.windDegree, 'short', t)}
					</Text>
					<WindArrowIcon degree={weather.current.windDegree} colorClassName="accent-label" />
				</View>
			),
		};
	},
	Modal: ({ dayIndex, onSelectDay }) => {
		const context = useMetricContext();

		if (!context) return null;

		const { weather, t, isMetric } = context;
		const { current } = weather;
		const unit = isMetric ? 'km/h' : 'mph';
		const currentRows = [
			{
				icon: <GaugeIcon colorClassName="accent-ui-foreground" />,
				label: t('wind.current.speed'),
				value: `${Math.round(isMetric ? current.windKph : current.windMph)}${unit}`,
			},
			{
				icon: <GustIcon colorClassName="accent-ui-foreground" />,
				label: t('wind.current.gust'),
				value: `${Math.round(isMetric ? current.gustKph : current.gustMph)}${unit}`,
			},
			{
				icon: <WindDirectionIcon />,
				label: t('wind.current.direction'),
				value: `${getDirection(current.windDegree, 'long', t)} / ${current.windDegree}°`,
			},
		];

		return (
			<MetricModal
				chart={
					<WeatherChart
						dayIndex={dayIndex}
						onSelectDay={onSelectDay}
						getValue={(hour) => (isMetric ? hour.windKph : hour.windMph)}
						seriesLabel={t('wind.title')}
						color="metric-wind"
						scale={{ step: 5 }}
						valueSuffix={unit}
					/>
				}
				sections={[
					dayIndex === 0 && {
						title: t('wind.current.title'),
						content: (
							<View className="gap-4">
								{currentRows.map(({ icon, label, value }, index) => (
									<Fragment key={label}>
										{index > 0 && <Separator />}
										<View className="flex-row items-center gap-4">
											<View className="rounded-lg bg-metric-wind p-1">{icon}</View>
											<Text type="sectiontitle" className="flex-1">
												{label}
											</Text>
											<Text type="body">{value}</Text>
										</View>
									</Fragment>
								))}
							</View>
						),
					},
					{ title: t('wind.beaufortscale'), text: t('wind.description') },
					{
						title: t('wind.values'),
						showIndex: true,
						values: beaufortScale.map(([metric, imperial, color], level) => ({
							name: t(`description.windspeed.${level}`),
							value: isMetric ? metric : imperial,
							color,
						})),
					},
				]}
			/>
		);
	},
};

import type { ChartScaleOptions, ForecastHour } from '@/core';
import { getChartScale, useWeather } from '@/core';
import { useTolgee, useTranslate } from '@tolgee/react';
import { useState } from 'react';
import { Pressable as NativePressable, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit/v2';
import { G, Rect, Text as SvgText } from 'react-native-svg';
import { clsx } from 'clsx';
import { useCSSVariable } from 'uniwind';
import { RoundView } from '../common/RoundView';
import { Text } from '../common/Text';
import { DaysToggle } from './daily/DaysToggle';

interface ChartToggle {
	/** The two units to switch between, e.g. ['%', 'mm']. */
	options: [string, string];
	selected: string;
	onChange: (option: string) => void;
	/** Replaces the "now" readout on days other than today. */
	dailySummary: { label: string; value: string };
}

interface WeatherChartProps {
	dayIndex: number;
	onSelectDay: (dayIndex: number) => void;
	getValue: (hour: ForecastHour) => number;
	seriesLabel: string;
	/** Theme colour name, e.g. "metric-uv". */
	color?: string;
	scale?: ChartScaleOptions;
	formatValue?: (value: number) => string;
	valueSuffix?: string;
	toggle?: ChartToggle;
}

const chartHeight = 250;

export const WeatherChart = ({
	dayIndex,
	onSelectDay,
	getValue,
	seriesLabel,
	color = 'chart-blue',
	scale,
	formatValue = (value) => `${Math.round(value)}`,
	valueSuffix = '',
	toggle,
}: WeatherChartProps) => {
	const { t } = useTranslate('weather');
	const language = useTolgee(['language']).getLanguage() ?? 'en-US';
	const weatherData = useWeather((state) => state.weatherData);
	const { width: windowWidth } = useWindowDimensions();
	const [containerWidth, setContainerWidth] = useState(0);
	const [series, surface, text, grid] = useCSSVariable([
		`--color-${color}`,
		'--color-card-background',
		'--color-label',
		'--color-separator',
	]) as string[];

	if (!weatherData) return null;

	const { tzId, localtimeEpoch } = weatherData.location;
	const days = weatherData.forecast.forecastday.slice(0, 7);
	const chartData = (days[dayIndex]?.hour ?? []).map((hour) => ({ time: hour.timeEpoch, value: getValue(hour) }));
	const chartWidth = Math.max(1, (containerWidth || windowWidth - 32) - 17);
	const currentPoint = chartData.reduce<(typeof chartData)[number] | undefined>(
		(closest, point) =>
			!closest || Math.abs(point.time - localtimeEpoch) < Math.abs(closest.time - localtimeEpoch) ? point : closest,
		undefined
	);
	const hourFormatter = new Intl.DateTimeFormat(language, { hour: 'numeric', hourCycle: 'h23', timeZone: tzId });
	const formatHour = (time: string | number | Date) =>
		hourFormatter.formatToParts(new Date(Number(time) * 1000)).find((part) => part.type === 'hour')?.value ?? '';
	const withSuffix = (value: number) => `${formatValue(value)}${valueSuffix}`;

	return (
		<View className="w-full" onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}>
			{days.filter((day) => day.hour.length).length > 1 && (
				<DaysToggle selectedIndex={dayIndex} onSelect={onSelectDay} />
			)}
			{chartData.length === 0 ? (
				<Text type="body">{t('chart.unavailable')}</Text>
			) : (
				<RoundView className="w-full gap-2 py-4 pl-2">
					<LineChart
						key={`${dayIndex}-${seriesLabel}`}
						data={chartData}
						xKey="time"
						yKey="value"
						series={[{ yKey: 'value', label: seriesLabel, color: series, strokeOpacity: 0 }]}
						area
						areaFill={{ fromColor: series, toColor: series, fromOpacity: 1, toOpacity: 1 }}
						width={chartWidth}
						height={chartHeight}
						theme={{
							background: surface,
							plotBackground: 'transparent',
							text,
							mutedText: text,
							axis: text,
							grid,
							series: [series],
							tooltip: { background: 'transparent', border: 'transparent', text, mutedText: text },
						}}
						curve="monotone"
						// The whole day fits on every platform; chart-kit's scroll mode draws an indicator it can't hide.
						scrollable={false}
						visiblePoints={chartData.length}
						showDots={false}
						showHorizontalGridLines
						yDomain={getChartScale(
							chartData.map((point) => point.value),
							scale
						)}
						formatXLabel={formatHour}
						formatYLabel={formatValue}
						labelStrategy="skip"
						labelMinGap={windowWidth < 768 ? 24 : chartWidth / 12}
						interaction={{ mode: 'scrub', selectionPersistence: 'whileActive' }}
						crosshair
						tooltip={{ shared: true, anchor: 'pointer', placement: 'above', width: 64 }}
						renderTooltip={({ x, y, width, height, xLabel, series: points }) => (
							<G pointerEvents="none">
								<Rect x={x} y={y + height - 48} width={width} height={48} rx={8} fill={surface} stroke={grid} />
								<SvgText x={x + width / 2} y={y + height - 29} fill={text} fontSize={12} textAnchor="middle">
									{xLabel}
								</SvgText>
								<SvgText
									x={x + width / 2}
									y={y + height - 10}
									fill={text}
									fontSize={14}
									fontWeight="600"
									textAnchor="middle"
								>
									{points[0]?.value == null ? '' : withSuffix(points[0].value)}
								</SvgText>
							</G>
						)}
					/>
					{toggle && (
						<View className="flex-1 flex-row items-center justify-between px-4">
							<View>
								<Text type="body" className="font-semibold">
									{dayIndex === 0 ? t('hourlyforecast.now') : toggle.dailySummary.label}
								</Text>
								<Text type="body">
									{dayIndex === 0 ? (currentPoint ? withSuffix(currentPoint.value) : '--') : toggle.dailySummary.value}
								</Text>
							</View>
							<View className="w-24 flex-row gap-1 rounded-full border border-hairline bg-secondary-system-background p-1">
								{toggle.options.map((option) => {
									const selected = option === toggle.selected;
									return (
										<NativePressable
											key={option}
											onPress={() => toggle.onChange(option)}
											accessibilityRole="button"
											accessibilityState={{ selected }}
											style={selected ? { backgroundColor: series } : undefined}
											className="flex-1 items-center rounded-full py-1.5 web:hover:bg-tertiary-system-background"
										>
											<Text type="caption" className={clsx('font-semibold', selected && 'text-ui-foreground')}>
												{option}
											</Text>
										</NativePressable>
									);
								})}
							</View>
						</View>
					)}
				</RoundView>
			)}
		</View>
	);
};

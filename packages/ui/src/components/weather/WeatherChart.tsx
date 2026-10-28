import { useTolgee, useTranslate } from '@tolgee/react';
import { RoundView } from '../common/styled/RoundView';
import { StyledText } from '../common/styled/StyledText';
import { useThemeColors } from '../../hooks/theme/useThemeColors';
import { getWeatherDate } from '../../hooks/weather/useChartDay';
import { DaysToggle } from './daily/DaysToggle';
import { getChartDomain } from '../../utils/getChartDomain';
import type { NormalizedData } from '@nativeweather/types/normalizedData';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Platform, Pressable, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit/v2';
import { G, Rect, Text } from 'react-native-svg';
import { border } from '../../constants/border';

interface WeatherChartProps {
	selectedDate: string;
	onSelectDay: (day: NormalizedData['forecast']['forecastday'][number]) => void;
	forecastDays: NormalizedData['forecast']['forecastday'];
	currentTimeEpoch: number;
	timeZone: string;
	getValue: (hour: NormalizedData['forecast']['forecastday'][number]['hour'][number]) => number;
	seriesLabel: string;
	maxValue?: number;
	minimumMaxValue?: number;
	domainStep?: number;
	formatValue?: (value: number) => string;
	valueSuffix?: string;
	color?: string;
	toggleLabel?: string;
	selectedMetric?: string;
	onToggle?: (metric: string) => void;
	dailySummary?: { label: string; value: string };
}

export const WeatherChart = ({
	forecastDays,
	selectedDate,
	onSelectDay,
	currentTimeEpoch,
	timeZone,
	getValue,
	seriesLabel,
	maxValue,
	minimumMaxValue,
	domainStep = 1,
	formatValue = (value) => `${Math.round(value)}`,
	valueSuffix = '',
	color = '#2793FF',
	toggleLabel,
	selectedMetric,
	onToggle,
	dailySummary,
}: WeatherChartProps) => {
	const tolgee = useTolgee();
	const { t } = useTranslate('weather');
	const { text } = useThemeColors();
	const surface = text === '#FFFFFF' ? '#1C1C1E' : '#FFFFFF';
	const fitsFullDay = Platform.OS === 'web' || Platform.OS === 'macos';
	const { width: windowWidth } = useWindowDimensions();
	const [containerWidth, setContainerWidth] = useState(0);
	const chartWidth = Math.max(1, (containerWidth || windowWidth - 32) - 32);
	const localDate = getWeatherDate(currentTimeEpoch, timeZone);
	const chartDate = selectedDate;
	const currentDayHours = forecastDays.find((day) => day.date === chartDate)?.hour ?? [];
	const chartData = currentDayHours.map((hour) => ({ time: hour.timeEpoch, value: getValue(hour) }));
	const currentPoint = chartData.reduce<{ time: number; value: number } | undefined>((closest, point) => {
		if (!closest || Math.abs(point.time - currentTimeEpoch) < Math.abs(closest.time - currentTimeEpoch)) {
			return point;
		}

		return closest;
	}, undefined);
	const values = chartData.map((point) => point.value);
	const dataMin = Math.min(...values);
	const dataMax = Math.max(...values);
	const padding = (dataMax - dataMin) * 0.1 || domainStep;
	const yMin = Math.max(0, Math.floor((dataMin - padding) / domainStep) * domainStep);
	const yMax =
		maxValue ?? Math.max(minimumMaxValue ?? domainStep, Math.ceil((dataMax + padding) / domainStep) * domainStep);
	const yDomain =
		maxValue === undefined ? getChartDomain(minimumMaxValue === undefined ? yMin : 0, yMax) : { min: 0, max: maxValue };
	const hourFormatter = new Intl.DateTimeFormat(tolgee.getLanguage(), { hour: 'numeric', hourCycle: 'h23', timeZone });
	const formatHour = (time: string | number | Date) =>
		hourFormatter.formatToParts(new Date(Number(time) * 1000)).find((part) => part.type === 'hour')?.value ?? '';

	return (
		<View className={clsx('w-full')} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width + 15)}>
			{forecastDays.slice(0, 7).filter((day) => day.hour.length).length > 1 && (
				<DaysToggle days={forecastDays} onSelectDay={onSelectDay} />
			)}
			{chartData.length === 0 ? (
				<StyledText type="body">{t('chart.unavailable')}</StyledText>
			) : (
				<RoundView className={clsx('relative w-full gap-2 py-4 pl-2')}>
					<LineChart
						key={`${selectedDate}-${selectedMetric ?? seriesLabel}`}
						data={chartData}
						xKey="time"
						yKey="value"
						series={[{ yKey: 'value', label: seriesLabel, color, strokeOpacity: 0 }]}
						area
						areaFill={{ fromColor: color, toColor: color, fromOpacity: 1, toOpacity: 1 }}
						width={chartWidth}
						height={250}
						theme={{
							background: surface,
							plotBackground: 'transparent',
							text,
							mutedText: text,
							axis: text,
							grid: `${text}33`,
							series: [color],
							tooltip: { background: 'transparent', border: 'transparent', text, mutedText: text },
						}}
						curve="monotone"
						scrollable={!fitsFullDay}
						visiblePoints={chartData.length}
						initialIndex="start"
						showDots={false}
						showHorizontalGridLines
						yDomain={yDomain}
						formatXLabel={formatHour}
						formatYLabel={formatValue}
						labelStrategy="skip"
						labelMinGap={windowWidth < 768 ? 24 : chartWidth / 12}
						interaction={{ mode: 'scrub', selectionPersistence: 'whileActive' }}
						crosshair
						tooltip={{ shared: true, anchor: 'pointer', placement: 'above', width: 64 }}
						renderTooltip={({ x, y, width, height, xLabel, series }) => (
							<G pointerEvents={Platform.OS === 'web' ? undefined : 'none'} className={clsx('web:pointer-events-none')}>
								<Rect x={x} y={y + height - 48} width={width} height={48} rx={8} fill={surface} stroke={`${text}33`} />
								<Text x={x + width / 2} y={y + height - 29} fill={text} fontSize={12} textAnchor="middle">
									{xLabel}
								</Text>
								<Text
									x={x + width / 2}
									y={y + height - 10}
									fill={text}
									fontSize={14}
									fontWeight="600"
									textAnchor="middle"
								>
									{series[0]?.value === null || series[0]?.value === undefined
										? ''
										: `${formatValue(series[0].value)}${valueSuffix}`}
								</Text>
							</G>
						)}
					/>
					{toggleLabel && selectedMetric && onToggle && (
						<View className="flex-1 flex-row items-center justify-between px-4">
							<View>
								<StyledText type="body" className={clsx('font-semibold')}>
									{chartDate === localDate ? t('hourlyforecast.now') : dailySummary?.label}
								</StyledText>
								<StyledText type="caption">
									{chartDate !== localDate
										? (dailySummary?.value ?? '--')
										: currentPoint
											? `${formatValue(currentPoint.value)}${valueSuffix}`
											: '--'}
								</StyledText>
							</View>
							<View
								className={clsx(
									'w-24 flex-row gap-1 rounded-full bg-secondarySystemBackground p-1 dark:bg-secondarySystemBackground_dark',
									border
								)}
							>
								<Pressable
									onPress={() => onToggle('%')}
									style={{ backgroundColor: selectedMetric === '%' ? color : undefined }}
									className={clsx(
										'flex-1 items-center rounded-full py-1.5 hover:bg-tertiarySystemBackground dark:hover:bg-tertiarySystemBackground_dark'
									)}
								>
									<StyledText type="caption" className={clsx('font-semibold', selectedMetric === '%' && 'text-white')}>
										%
									</StyledText>
								</Pressable>
								<Pressable
									onPress={() => onToggle(toggleLabel)}
									style={{ backgroundColor: selectedMetric === toggleLabel ? color : undefined }}
									className="flex-1 items-center rounded-full py-1.5 hover:bg-tertiarySystemBackground dark:hover:bg-tertiarySystemBackground_dark"
								>
									<StyledText
										type="caption"
										className={clsx('font-semibold', selectedMetric === toggleLabel && 'text-white')}
									>
										{toggleLabel}
									</StyledText>
								</Pressable>
							</View>
						</View>
					)}
				</RoundView>
			)}
		</View>
	);
};

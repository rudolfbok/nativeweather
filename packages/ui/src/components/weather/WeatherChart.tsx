import { useTolgee, useTranslate } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { useSelectedDay } from '@nativeweather/ui/hooks/weather/useSelectedDay';
import { NormalizedData } from '@nativeweather/types/normalizedData';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Platform, Pressable, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit/v2';
import { G, Rect, Text } from 'react-native-svg';
import { border } from '@nativeweather/ui/constants/border';

interface WeatherChartProps {
	forecastDays: NormalizedData['forecast']['forecastday'];
	currentTimeEpoch: number;
	timeZone: string;
	getValue: (hour: NormalizedData['forecast']['forecastday'][number]['hour'][number]) => number;
	seriesLabel: string;
	maxValue?: number;
	domainStep?: number;
	formatValue?: (value: number) => string;
	valueSuffix?: string;
	color?: string;
	toggleLabel?: string;
	selectedMetric?: string;
	onToggle?: (metric: string) => void;
}

export const WeatherChart = ({
	forecastDays,
	currentTimeEpoch,
	timeZone,
	getValue,
	seriesLabel,
	maxValue,
	domainStep = 1,
	formatValue = (value) => `${Math.round(value)}`,
	valueSuffix = '',
	color = '#2793FF',
	toggleLabel,
	selectedMetric,
	onToggle,
}: WeatherChartProps) => {
	const tolgee = useTolgee();
	const { t } = useTranslate('weather');
	const { text } = useThemeColors();
	const surface = text === '#FFFFFF' ? '#1C1C1E' : '#FFFFFF';
	const selectedDay = useSelectedDay((state) => state.selectedDay);
	const fitsFullDay = Platform.OS === 'web' || Platform.OS === 'macos';
	const { width: windowWidth } = useWindowDimensions();
	const [containerWidth, setContainerWidth] = useState(0);
	const chartWidth = Math.max(1, (containerWidth || windowWidth - 32) - 32);
	const localDateParts = new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone,
	}).formatToParts(new Date(currentTimeEpoch * 1000));
	const localDate = `${localDateParts.find((part) => part.type === 'year')?.value}-${localDateParts.find((part) => part.type === 'month')?.value}-${localDateParts.find((part) => part.type === 'day')?.value}`;
	const chartDate = selectedDay?.date ?? localDate;
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
	const yMax = maxValue ?? Math.max(domainStep, Math.ceil(dataMax / domainStep) * domainStep);
	const hourFormatter = new Intl.DateTimeFormat(tolgee.getLanguage(), { hour: 'numeric', hourCycle: 'h23', timeZone });
	const formatHour = (time: string | number | Date) =>
		hourFormatter.formatToParts(new Date(Number(time) * 1000)).find((part) => part.type === 'hour')?.value ?? '';

	if (chartData.length === 0) return null;

	return (
		<View className={clsx('w-full')} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width + 15)}>
			<RoundView className={clsx('relative w-full gap-2 py-4 pl-2')}>
				<LineChart
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
					yDomain={{ min: maxValue === undefined ? yMin : 0, max: yMax }}
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
								{t('hourlyforecast.now')}
							</StyledText>
							<StyledText type="caption">
								{currentPoint ? `${formatValue(currentPoint.value)}${valueSuffix}` : '--'}
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
								className={clsx('flex-1 items-center rounded-full py-1.5')}
							>
								<StyledText type="caption" className={clsx('font-semibold', selectedMetric === '%' && 'text-white')}>
									%
								</StyledText>
							</Pressable>
							<Pressable
								onPress={() => onToggle(toggleLabel)}
								style={{ backgroundColor: selectedMetric === toggleLabel ? color : undefined }}
								className="flex-1 items-center rounded-full py-1.5"
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
		</View>
	);
};

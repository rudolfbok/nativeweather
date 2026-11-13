import { formatTime } from '@/core';
import type { ComponentType } from 'react';
import { View } from 'react-native';
import { Text } from '../../common/Text';
import { MoonIcon } from '../../icons/main/MetricIcons';
import { FirstQuarter } from '../../icons/moonphases/FirstQuarter';
import { FullMoon } from '../../icons/moonphases/FullMoon';
import { LastQuarter } from '../../icons/moonphases/LastQuarter';
import { NewMoon } from '../../icons/moonphases/NewMoon';
import { WaningCrescent } from '../../icons/moonphases/WaningCrescent';
import { WaningGibbous } from '../../icons/moonphases/WaningGibbous';
import { WaxingCrescent } from '../../icons/moonphases/WaxingCrescent';
import { WaxingGibbous } from '../../icons/moonphases/WaxingGibbous';
import { useThreeColumns } from '../../layout/useThreeColumns';
import { MetricModal } from '../MetricModal';
import type { MetricDefinition } from '../types';
import { useMetricContext } from '../useMetricContext';

// Keyed by the API's phase name; the locale key is the name lowercased without spaces.
const phases: Record<string, ComponentType> = {
	'New Moon': NewMoon,
	'Waxing Crescent': WaxingCrescent,
	'First Quarter': FirstQuarter,
	'Waxing Gibbous': WaxingGibbous,
	'Full Moon': FullMoon,
	'Waning Gibbous': WaningGibbous,
	'Last Quarter': LastQuarter,
	'Waning Crescent': WaningCrescent,
};

const phaseKey = (phase: string) => phase.toLowerCase().replace(/\s/g, '');

export const moon: MetricDefinition = {
	Icon: MoonIcon,
	titleKey: 'moon.title',
	wide: true,
	card: ({ weather, t, language }) => {
		const { moonPhase, moonIllumination, isMoonUp, moonRise, moonSet } = weather.forecast.forecastday[0].astro;
		const PhaseIcon = phases[moonPhase];

		return {
			value: t(`moon.phase.${phaseKey(moonPhase)}`),
			squareDescription: `${t('moon.illumination')} ${moonIllumination}%`,
			extra: (
				<View className="flex-row items-center gap-4">
					{PhaseIcon && <PhaseIcon />}
					<View className="min-w-0 flex-1">
						<Text type="body" numberOfLines={1}>
							{t('moon.illumination')} {moonIllumination}%
						</Text>
						<Text type="body" numberOfLines={1}>
							{isMoonUp
								? `${t('moon.moonset')} ${formatTime(moonSet, language)}`
								: `${t('moon.moonrise')} ${formatTime(moonRise, language)}`}
						</Text>
					</View>
				</View>
			),
		};
	},
	Modal: () => {
		const context = useMetricContext();
		const threeColumns = useThreeColumns();

		if (!context) return null;

		const { t, weather, language } = context;
		const { moonPhase, moonIllumination, isMoonUp, moonRise, moonSet } = weather.forecast.forecastday[0].astro;
		const PhaseIcon = phases[moonPhase];

		return (
			<MetricModal
				sections={[
					// The square card in the third column has no room for these; the wide card already shows them.
					threeColumns && {
						title: t('moon.now'),
						content: (
							<View className="flex-row items-center gap-4">
								{PhaseIcon && <PhaseIcon />}
								<View>
									<Text type="sectiontitle">{t(`moon.phase.${phaseKey(moonPhase)}`)}</Text>
									<Text type="body">
										{t('moon.illumination')} {moonIllumination}%
									</Text>
									<Text type="body">
										{isMoonUp
											? `${t('moon.moonset')} ${formatTime(moonSet, language)}`
											: `${t('moon.moonrise')} ${formatTime(moonRise, language)}`}
									</Text>
								</View>
							</View>
						),
					},
					{ title: t('moon.cycle'), text: t('moon.description') },
					{
						title: t('moon.phase'),
						values: Object.entries(phases).map(([phase, PhaseIcon]) => ({
							name: t(`moon.phase.${phaseKey(phase)}`),
							description: t(`moon.text.${phaseKey(phase)}`),
							leading: <PhaseIcon />,
						})),
					},
				]}
			/>
		);
	},
};

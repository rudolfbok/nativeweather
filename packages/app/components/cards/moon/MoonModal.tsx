import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/ui/ContentRow';
import { ValuesList } from 'app/components/common/ui/ValuesList';
import { FirstQuarter } from 'app/components/icons/moonphases/FirstQuarter';
import { FullMoon } from 'app/components/icons/moonphases/FullMoon';
import { LastQuarter } from 'app/components/icons/moonphases/LastQuarter';
import { NewMoon } from 'app/components/icons/moonphases/NewMoon';
import { WaningCrescent } from 'app/components/icons/moonphases/WaningCrescent';
import { WaningGibbous } from 'app/components/icons/moonphases/WaningGibbous';
import { WaxingCrescent } from 'app/components/icons/moonphases/WaxingCrescent';
import { WaxingGibbous } from 'app/components/icons/moonphases/WaxingGibbous';
import { useWeather } from 'app/hooks/weather/useWeather';
import { useStorageString } from 'app/storage/useStorage';
import { formatTime } from 'app/utils/helpers/formatTime';
import { clsx } from 'clsx';
import { JSX } from 'react';
import { View } from 'react-native';

interface MoonModalProps {
	phase?: string;
	illumination?: number;
	isMoonUp?: 0 | 1;
	moonrise?: string;
	moonset?: string;
}

export const MoonModal = ({ phase, illumination, isMoonUp, moonrise, moonset }: MoonModalProps) => {
	const { weatherData } = useWeather();
	const { t } = useTranslate('weather');
	const [currentLanguage] = useStorageString('currentLang');

	if (!weatherData?.forecast?.forecastday?.[0]?.astro) return null;

	const moonPhaseItems = [
		{
			moonPhase: <NewMoon />,
			name: t('moon.phase.newmoon'),
			description: t('moon.text.newmoon'),
		},
		{
			moonPhase: <WaxingCrescent />,
			name: t('moon.phase.waxingcrescent'),
			description: t('moon.text.waxingcrescent'),
		},
		{
			moonPhase: <FirstQuarter />,
			name: t('moon.phase.firstquarter'),
			description: t('moon.text.firstquarter'),
		},
		{
			moonPhase: <WaxingGibbous />,
			name: t('moon.phase.waxinggibbous'),
			description: t('moon.text.waxinggibbous'),
		},
		{
			moonPhase: <FullMoon />,
			name: t('moon.phase.fullmoon'),
			description: t('moon.text.fullmoon'),
		},
		{
			moonPhase: <WaningGibbous />,
			name: t('moon.phase.waninggibbous'),
			description: t('moon.text.waninggibbous'),
		},
		{
			moonPhase: <LastQuarter />,
			name: t('moon.phase.lastquarter'),
			description: t('moon.text.lastquarter'),
		},
		{
			moonPhase: <WaningCrescent />,
			name: t('moon.phase.waningcrescent'),
			description: t('moon.text.waningcrescent'),
		},
	];

	const moonPhaseComponents: Record<string, JSX.Element> = {
		'New Moon': <NewMoon />,
		'Waxing Crescent': <WaxingCrescent />,
		'First Quarter': <FirstQuarter />,
		'Waxing Gibbous': <WaxingGibbous />,
		'Full Moon': <FullMoon />,
		'Waning Gibbous': <WaningGibbous />,
		'Last Quarter': <LastQuarter />,
		'Waning Crescent': <WaningCrescent />,
	};

	const getLocalePhase: Record<string, string> = {
		'New Moon': t('moon.phase.newmoon'),
		'Waxing Crescent': t('moon.phase.waxingcrescent'),
		'First Quarter': t('moon.phase.firstquarter'),
		'Waxing Gibbous': t('moon.phase.waxinggibbous'),
		'Full Moon': t('moon.phase.fullmoon'),
		'Waning Gibbous': t('moon.phase.waninggibbous'),
		'Last Quarter': t('moon.phase.lastquarter'),
		'Waning Crescent': t('moon.phase.waningcrescent'),
	};

	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('moon.now')} className={clsx('max-xl:hidden')}>
				<View className={clsx('flex-row items-center gap-4')}>
					{moonPhaseComponents[phase]}
					<View className={clsx('gap-2')}>
						<View>
							<StyledText type="body">
								{t('moon.illumination')} {illumination}%
							</StyledText>
							<StyledText type="body">
								{isMoonUp === 0
									? `${t('moon.moonset')} ${formatTime(moonset, currentLanguage)}`
									: `${t('moon.moonrise')} ${formatTime(moonrise, currentLanguage)}`}
							</StyledText>
						</View>
						<StyledText type="subtitle">
							{getLocalePhase[weatherData?.forecast.forecastday[0].astro.moonPhase]}
						</StyledText>
					</View>
				</View>
			</ContentRow>
			<ContentRow title={t('moon.cycle')}>
				<StyledText type="body">{t('moon.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('moon.phase')}>
				<ValuesList values={moonPhaseItems} showIndex={null} />
			</ContentRow>
		</View>
	);
};

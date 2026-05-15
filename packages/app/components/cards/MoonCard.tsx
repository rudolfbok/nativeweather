import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { formatTimeByLang } from 'app/utils/helpers/formatTimeByLang';
import { clsx } from 'clsx';
import { Moon } from 'lucide-react-native';
import { JSX, useState } from 'react';
import { Platform, View } from 'react-native';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../common/styled/StyledModal';
import { StyledText } from '../common/styled/StyledText';
import { FirstQuarter } from '../icons/moonphases/FirstQuarter';
import { FullMoon } from '../icons/moonphases/FullMoon';
import { LastQuarter } from '../icons/moonphases/LastQuarter';
import { NewMoon } from '../icons/moonphases/NewMoon';
import { WaningCrescent } from '../icons/moonphases/WaningCrescent';
import { WaningGibbous } from '../icons/moonphases/WaningGibbous';
import { WaxingCrescent } from '../icons/moonphases/WaxingCrescent';
import { WaxingGibbous } from '../icons/moonphases/WaxingGibbous';
import { DataCard } from './DataCard';
import { MoonModal } from './modals/MoonModal';

interface MoonCardProps {
	phase: string;
	illumination: number;
	isMoonUp: 0 | 1;
	moonrise: string;
	moonset: string;
}

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

export const MoonCard = ({ phase, illumination, isMoonUp, moonrise, moonset }: MoonCardProps) => {
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const [currentLanguage] = useStorageString('currentLang');
	const router = useRouter();

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
		<DataCard
			onPress={Platform.OS === 'ios' ? () => router.push('/modals/moon') : () => setShowModal(true)}
			icon={<Moon color="#753A87" />}
			title={t('moon.title')}
			data={getLocalePhase[phase]}
			className={clsx(
				'native:!aspect-auto native:!basis-[100%] web:!col-span-1 web:max-xl:!col-span-2 web:max-xl:!aspect-auto'
			)}
			style={{ width: '100%', height: '100%', aspectRatio: 2 }}
			extraContent={
				<View className={clsx('mt-6 flex-row items-center gap-4 xl:hidden')}>
					{moonPhaseComponents[phase]}
					<View>
						<StyledText type="body">
							{t('moon.illumination')} {illumination}%
						</StyledText>
						<StyledText type="body">
							{isMoonUp === 0
								? `${t('moon.moonset')} ${formatTimeByLang(moonset, currentLanguage)}`
								: `${t('moon.moonrise')} ${formatTimeByLang(moonrise, currentLanguage)}`}
						</StyledText>
					</View>
				</View>
			}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<Moon color="#753A87" />}
						header={t('moon.title')}
						onClose={() => setShowModal(false)}
					>
						<MoonModal
							phase={phase}
							illumination={illumination}
							isMoonUp={isMoonUp}
							moonrise={moonrise}
							moonset={moonset}
						/>
					</StyledModal>
				)
			}
		/>
	);
};

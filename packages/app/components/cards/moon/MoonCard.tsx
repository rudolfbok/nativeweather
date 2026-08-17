import { useTranslate } from '@tolgee/react';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useStorageString } from 'app/storage/useStorage';
import { formatTime } from 'app/utils/helpers/formatTime';
import { clsx } from 'clsx';
import { JSX, useState } from 'react';
import { Platform, View } from 'react-native';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../../common/styled/StyledModal';
import { StyledText } from '../../common/styled/StyledText';
import { FirstQuarter } from '../../icons/moonphases/FirstQuarter';
import { FullMoon } from '../../icons/moonphases/FullMoon';
import { LastQuarter } from '../../icons/moonphases/LastQuarter';
import { NewMoon } from '../../icons/moonphases/NewMoon';
import { WaningCrescent } from '../../icons/moonphases/WaningCrescent';
import { WaningGibbous } from '../../icons/moonphases/WaningGibbous';
import { WaxingCrescent } from '../../icons/moonphases/WaxingCrescent';
import { WaxingGibbous } from '../../icons/moonphases/WaxingGibbous';
import { DataCard } from '../DataCard';
import { MoonModal } from './MoonModal';
import { MoonIcon } from '../../icons/main/MoonIcon';

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
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToMoon = useModalNavigation({
		mobile: () => router.push('/modals/moon'),
		macos: () => setModalScreen('moon'),
		web: () => setShowModal(true),
	});

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
			onPress={navigateToMoon}
			icon={<MoonIcon />}
			title={t('moon.title')}
			data={getLocalePhase[phase]}
			className={clsx(
				'ios:!basis-[100%] web:!col-span-1 web:max-xl:!col-span-2 web:max-xl:!aspect-auto h-fit min-w-full'
			)}
			extraContent={
				<View className={clsx('flex-row items-center max-xl:mt-4 max-xl:gap-4')}>
					<View className="xl:hidden">{moonPhaseComponents[phase]}</View>
					<View>
						<StyledText type="body">
							{t('moon.illumination')} {illumination}%
						</StyledText>
						<StyledText type="body" className="xl:hidden">
							{isMoonUp === 0
								? `${t('moon.moonset')} ${formatTime(moonset, currentLanguage)}`
								: `${t('moon.moonrise')} ${formatTime(moonrise, currentLanguage)}`}
						</StyledText>
					</View>
				</View>
			}
			modal={
				Platform.OS !== 'macos' &&
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<MoonIcon />}
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

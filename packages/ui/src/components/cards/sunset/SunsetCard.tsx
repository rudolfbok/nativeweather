import { useTranslate } from '@tolgee/react';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { formatTime } from '@nativeweather/core/utils/formatting/formatTime';
import { useSunEventCountdown } from '@nativeweather/core/hooks/weather/useSunEventCountdown';
import { useState } from 'react';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { StyledModal } from '../../common/modal/StyledModal';
import { StyledText } from '../../common/styled/StyledText';
import { SunsetIcon } from '../../icons/main/SunsetIcon';
import { DataCard } from '../DataCard';
import { SunsetModal } from './SunsetModal';

export const SunsetCard = ({
	data,
	tomorrowData,
	timeZone = 'UTC',
}: {
	data: string;
	tomorrowData?: string;
	timeZone?: string;
}) => {
	const [currentLanguage] = useStorageString('currentLang');
	const { t } = useTranslate('weather');
	const countdown = useSunEventCountdown({ data, tomorrowData, timeZone });
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToSunset = useModalNavigation({
		mobile: () => router.push('/modals/sunset'),
		macos: () => setModalScreen('sunset'),
		web: () => setShowModal(true),
	});

	return (
		<DataCard
			onPress={navigateToSunset}
			icon={<SunsetIcon />}
			title={t('sunset.title')}
			data={formatTime(data, currentLanguage)}
			extraContent={
				countdown && (
					<StyledText type="body" numberOfLines={1} ellipsizeMode="tail">
						{t('remainingtime', countdown)}
					</StyledText>
				)
			}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<SunsetIcon />}
						header={t('sunset.title')}
						onClose={() => setShowModal(false)}
					>
						<SunsetModal />
					</StyledModal>
				)
			}
		/>
	);
};

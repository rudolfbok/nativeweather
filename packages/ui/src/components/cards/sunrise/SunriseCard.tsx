import { useTranslate } from '@tolgee/react';
import { useModalNavigation } from '../../../hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '../../../hooks/navigation/useNavigation.macos';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { formatTime } from '@nativeweather/core/utils/formatting/formatTime';
import { useSunEventCountdown } from '@nativeweather/core/hooks/weather/useSunEventCountdown';
import { useState } from 'react';
import { useRouter } from '../../../hooks/navigation/useRouter';
import { StyledModal } from '../../common/modal/StyledModal';
import { StyledText } from '../../common/styled/StyledText';
import { SunriseIcon } from '../../icons/main/SunriseIcon';
import { DataCard } from '../DataCard';
import { SunriseModal } from './SunriseModal';

export const SunriseCard = ({
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
	const navigateToSunrise = useModalNavigation({
		mobile: () => router.push('/modals/sunrise'),
		macos: () => setModalScreen('sunrise'),
		web: () => setShowModal(true),
	});

	return (
		<DataCard
			onPress={navigateToSunrise}
			icon={<SunriseIcon />}
			title={t('sunrise.title')}
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
						icon={<SunriseIcon />}
						header={t('sunrise.title')}
						onClose={() => setShowModal(false)}
					>
						<SunriseModal />
					</StyledModal>
				)
			}
		/>
	);
};

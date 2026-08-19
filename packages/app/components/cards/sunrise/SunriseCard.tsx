import { useTranslate } from '@tolgee/react';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useStorageString } from 'app/database/useStorage';
import { formatTime } from 'app/utils/formatting/formatTime';
import { useState } from 'react';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { StyledModal } from 'app/components/common/modal/StyledModal';
import { StyledText } from 'app/components/common/styled/StyledText';
import { SunriseIcon } from 'app/components/icons/main/SunriseIcon';
import { DataCard } from '../DataCard';
import { SunriseModal } from './SunriseModal';

export const SunriseCard = ({ data }: { data: string }) => {
	const [currentLanguage] = useStorageString('currentLang');
	const { t } = useTranslate('weather');
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
			extraContent={<StyledText type="body">{t('localtime')}</StyledText>}
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

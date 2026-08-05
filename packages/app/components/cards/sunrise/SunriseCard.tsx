import { useTranslate } from '@tolgee/react';
import { useModalNavigation } from 'app/hooks/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/useNavigation.macos';
import { useStorageString } from 'app/storage/useStorage';
import { formatTime } from 'app/utils/helpers/formatTime';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../../common/styled/StyledModal';
import { StyledText } from '../../common/styled/StyledText';
import { SunriseIcon } from '../../icons/main/SunriseIcon';
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
				Platform.OS !== 'macos' &&
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

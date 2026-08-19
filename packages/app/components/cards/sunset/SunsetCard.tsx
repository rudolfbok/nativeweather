import { useTranslate } from '@tolgee/react';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useStorageString } from 'app/storage/useStorage';
import { formatTime } from 'app/utils/helpers/formatTime';
import { useState } from 'react';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { StyledText } from 'app/components/common/styled/StyledText';
import { SunsetIcon } from 'app/components/icons/main/SunsetIcon';
import { DataCard } from '../DataCard';
import { SunsetModal } from './SunsetModal';

export const SunsetCard = ({ data }: { data: string }) => {
	const [currentLanguage] = useStorageString('currentLang');
	const { t } = useTranslate('weather');
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
			extraContent={<StyledText type="body">{t('localtime')}</StyledText>}
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

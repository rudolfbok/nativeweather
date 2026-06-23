import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorage';
import { formatTime } from 'app/utils/helpers/formatTime';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../../common/styled/StyledModal';
import { StyledText } from '../../common/styled/StyledText';
import { SunsetIcon } from '../../icons/main/SunsetIcon';
import { DataCard } from '../DataCard';
import { SunsetModal } from './SunsetModal';

export const SunsetCard = ({ data }: { data: string }) => {
	const [currentLanguage] = useStorageString('currentLang');
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	return (
		<DataCard
			onPress={Platform.OS === 'ios' ? () => router.push('/modals/sunset') : () => setShowModal(true)}
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

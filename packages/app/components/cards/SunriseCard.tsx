import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { formatTimeByLang } from 'app/utils/helpers/formatTimeByLang';
import { Sunrise } from 'lucide-react-native';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../common/styled/StyledModal';
import { StyledText } from '../common/styled/StyledText';
import { DataCard } from './DataCard';
import { SunriseModal } from './modals/SunriseModal';

export const SunriseCard = ({ data }: { data: string }) => {
	const [currentLanguage] = useStorageString('currentLang');
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	return (
		<DataCard
			onPress={Platform.OS === 'ios' ? () => router.push('/modals/sunrise') : () => setShowModal(true)}
			icon={<Sunrise color="#FFBF04" />}
			title={t('sunrise.title')}
			data={formatTimeByLang(data, currentLanguage)}
			extraContent={<StyledText type="body">{t('localtime')}</StyledText>}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<Sunrise color="#FFBF04" />}
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

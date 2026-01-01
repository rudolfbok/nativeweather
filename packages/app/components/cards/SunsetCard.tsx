import { useTranslate } from '@tolgee/react';
import { Sunset } from 'lucide-react-native';
import { useState } from 'react';
import { StyledText } from '../common/StyledText';
import { DataCard } from './DataCard';
import { SunsetModal } from './modals/SunsetModal';
import { formatTimeByLang } from 'app/utils/helpers/formatTimeByLang';
import { useStorageString } from 'app/storage/useStorageString';

export const SunsetCard = ({ data }: { data: string }) => {
	const [currentLanguage] = useStorageString('currentLang');
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);

	return (
		<DataCard
			onPress={() => setShowModal(true)}
			modal={showModal && <SunsetModal visible={showModal} onClose={() => setShowModal(false)} />}
			icon={<Sunset color="#F75B02" />}
			title={t('sunset.title')}
			data={formatTimeByLang(data, currentLanguage)}
			extraContent={<StyledText type="body">{t('localtime')}</StyledText>}
		/>
	);
};

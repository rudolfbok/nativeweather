import { useTranslate } from '@tolgee/react';
import { Sunrise } from 'lucide-react-native';
import { useState } from 'react';
import { StyledText } from '../common/StyledText';
import { DataCard } from './DataCard';
import { SunriseModal } from './modals/SunriseModal';
import { formatTimeByLang } from 'app/utils/helpers/formatTimeByLang';
import { useStorageString } from 'app/storage/useStorageString';

export const SunriseCard = ({ data }: { data: string }) => {
	const [currentLanguage] = useStorageString('currentLang');
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	return (
		<DataCard
			onPress={() => setShowModal(true)}
			modal={showModal && <SunriseModal visible={showModal} onClose={() => setShowModal(false)} />}
			icon={<Sunrise color="#FFBF04" />}
			title={t('sunrise.title')}
			data={formatTimeByLang(data, currentLanguage)}
			extraContent={<StyledText type="body">{t('localtime')}</StyledText>}
		/>
	);
};

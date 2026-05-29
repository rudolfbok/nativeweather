import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { formatTimeByLang } from 'app/utils/helpers/formatTimeByLang';
import { Sunset } from 'lucide-react-native';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../common/styled/StyledModal';
import { StyledText } from '../common/styled/StyledText';
import { DataCard } from './DataCard';
import { SunsetModal } from './modals/SunsetModal';
import clsx from 'clsx';

export const SunsetCard = ({ data }: { data: string }) => {
	const [currentLanguage] = useStorageString('currentLang');
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	return (
		<DataCard
			onPress={Platform.OS === 'ios' ? () => router.push('/modals/sunset') : () => setShowModal(true)}
			icon={<Sunset color="#F75B02" />}
			title={t('sunset.title')}
			data={formatTimeByLang(data, currentLanguage)}
			extraContent={
				<StyledText type="body" className={clsx('opacity-70')}>
					{t('localtime')}
				</StyledText>
			}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<Sunset color="#F75B02" />}
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

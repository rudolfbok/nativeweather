import { useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { Info } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'solito/navigation';
import { AboutBody } from './AboutBody';
import { SettingsItem } from './SettingsItem';

export const AboutButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<SettingsItem
				icon={<Info size={20} color="#FFFFFF" />}
				iconbg="bg-primaryblue"
				title={t('about.title')}
				variant="value"
				showModal={() => setShowModal(true)}
				onPress={() => router.push('/about')}
				border={true}
			/>
			{showModal && (
				<StyledModal visible={showModal} onClose={() => setShowModal(false)} header={t('about.title')}>
					<AboutBody />
				</StyledModal>
			)}
		</>
	);
};

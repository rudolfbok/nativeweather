import { useTranslate } from '@tolgee/react';
import { DatabaseZap, Info } from 'lucide-react-native';
import { useRouter } from 'solito/navigation';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';
import { useState } from 'react';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { AboutBody } from './AboutBody';

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
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
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

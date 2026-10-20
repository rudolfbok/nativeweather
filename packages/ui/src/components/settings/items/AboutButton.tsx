import { useTranslate } from '@tolgee/react';
import { StyledModal } from '../../common/modal/StyledModal';
import { Info } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from '../../../hooks/navigation/useRouter';

import { SettingsItem } from './SettingsItem';
import { AboutFeature } from '../../../features/about/screen';
import { useModalNavigation } from '../../../hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '../../../hooks/navigation/useNavigation.macos';

export const AboutButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const navigateToAbout = useModalNavigation({
		mobile: () => router.push('/about'),
		macos: () => setModalScreen('about'),
		web: () => setShowModal(true),
	});

	return (
		<>
			<SettingsItem
				icon={<Info size={20} color="#FFFFFF" />}
				iconbg="bg-[#727E95]"
				title={t('about.title')}
				variant="value"
				showModal={() => setShowModal(true)}
				onPress={navigateToAbout}
				border={true}
			/>
			{showModal && (
				<StyledModal visible={showModal} onClose={() => setShowModal(false)} header={t('about.title')}>
					<AboutFeature />
				</StyledModal>
			)}
		</>
	);
};

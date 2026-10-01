import { useTranslate } from '@tolgee/react';
import { StyledModal } from '@nativeweather/ui/components/common/modal/StyledModal';
import { Info } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';

import { SettingsItem } from './SettingsItem';
import { AboutFeature } from '@nativeweather/ui/features/about/screen';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';

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
				iconbg="bg-primaryblue"
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

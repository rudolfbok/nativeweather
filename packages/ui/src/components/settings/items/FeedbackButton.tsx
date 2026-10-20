import { useTranslate } from '@tolgee/react';
import { MessageCircle } from 'lucide-react-native';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { SettingsItem } from './SettingsItem';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';
import { StyledModal } from '../../common/modal/StyledModal';
import { FeedbackFeature } from '@nativeweather/ui/features/feedback/screen';
import { useState } from 'react';

export const FeedbackButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const { setModalScreen } = useNavigationScreen();
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);
	const navigateToFeedback = useModalNavigation({
		mobile: () => router.push('/modals/feedback'),
		macos: () => setModalScreen('feedback'),
		web: () => setShowFeedbackModal(true),
	});

	return (
		<>
			<SettingsItem
				icon={<MessageCircle color="white" size={20} />}
				iconbg="bg-[#FF453A]"
				title={t('feedback.title')}
				variant="link"
				onPress={navigateToFeedback}
			/>
			{showFeedbackModal && (
				<StyledModal
					visible={showFeedbackModal}
					header={t('feedback.title')}
					onClose={() => setShowFeedbackModal(false)}
				>
					<FeedbackFeature />
				</StyledModal>
			)}
		</>
	);
};

import { useTranslate } from '@tolgee/react';
import { useOpenDrawer } from 'app/hooks/navigation/useOpenDrawer';
import { MessageCircle } from 'lucide-react-native';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { SettingsItem } from './SettingsItem';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';

export const FeedbackButton = () => {
	const { t } = useTranslate('settings');
	const { setOpenDrawer } = useOpenDrawer();
	const router = useRouter();
	const { setModalScreen } = useNavigationScreen();
	const navigateToFeedback = useModalNavigation({
		mobile: () => {
			setOpenDrawer(false);
			router.push('/feedback');
		},
		macos: () => setModalScreen('feedback'),
		web: () => {
			setOpenDrawer(false);
			router.push('/feedback');
		},
	});

	return (
		<SettingsItem
			icon={<MessageCircle color="white" size={20} />}
			iconbg="bg-primaryblue"
			title={t('feedback.title')}
			variant="link"
			onPress={navigateToFeedback}
		/>
	);
};

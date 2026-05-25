import { useTranslate } from '@tolgee/react';
import { useOpenDrawer } from 'app/hooks/useOpenDrawer';
import { MessageCircle } from 'lucide-react-native';
import { useRouter } from 'solito/navigation';
import { SettingsItem } from './SettingsItem';

export const FeedbackButton = () => {
	const { t } = useTranslate('settings');
	const { setOpenDrawer } = useOpenDrawer();
	const router = useRouter();

	return (
		<SettingsItem
			icon={<MessageCircle color="white" size={20} />}
			iconbg="bg-primaryblue"
			title={t('feedback.title')}
			variant="link"
			onPress={() => {
				setOpenDrawer(false);
				router.push('/feedback');
			}}
		/>
	);
};

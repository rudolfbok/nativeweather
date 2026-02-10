import { useTranslate } from '@tolgee/react';
import { MessageCircle } from 'lucide-react-native';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';
import { useRouter } from 'solito/navigation';
import { useOpenDrawer } from 'app/hooks/useOpenDrawer';

export const SendFeedbackButton = () => {
	const { t } = useTranslate('settings');
	const { setOpenDrawer } = useOpenDrawer();
	const router = useRouter();

	return (
		<SettingsItem
			icon={<MessageCircle color="white" size={20} />}
			iconbg="bg-primaryblue"
			title={t('feedback.title')}
			variant="link"
			className={clsx('rounded-bl-3xl rounded-br-3xl')}
			onPress={() => {
				setOpenDrawer(false);
				router.push('/feedback');
			}}
		/>
	);
};

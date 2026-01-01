import { useTranslate } from '@tolgee/react';
import { MessageCircle } from 'lucide-react-native';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';

export const SendFeedbackButton = () => {
	const { t } = useTranslate('settings');

	return (
		<SettingsItem
			icon={<MessageCircle color="white" size={20} />}
			iconbg="bg-primaryblue"
			title={t('feedback.title')}
			variant="link"
			className={clsx('rounded-bl-3xl rounded-br-3xl')}
		/>
	);
};

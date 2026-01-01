import { useTranslate } from '@tolgee/react';
import { DatabaseZap } from 'lucide-react-native';
import { useRouter } from 'solito/navigation';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';

export const DataSourceButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();

	return (
		<SettingsItem
			icon={<DatabaseZap size={20} color="#FFFFFF" />}
			iconbg="bg-orange-600"
			title={t('datasource')}
			variant="link"
			onPress={() => router.push('/datasource')}
			className={clsx('rounded-tl-3xl rounded-tr-3xl')}
			border={true}
		/>
	);
};

import { useTranslate } from '@tolgee/react';
import { CompassIcon } from 'app/components/icons/settings/CompassIcon';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';
import { useRouter } from 'solito/navigation';
import { useOpenDrawer } from 'app/hooks/useOpenDrawer';

export const CompassButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const { setOpenDrawer } = useOpenDrawer();

	return (
		<SettingsItem
			icon={<CompassIcon />}
			iconbg="bg-[#FF0000]"
			title={`${t('compass.title')} ${t('compass.iosonly')}`}
			variant="link"
			className={clsx('rounded-3xl')}
			onPress={() => {
				router.push('/compass');
				setOpenDrawer(false);
			}}
		/>
	);
};

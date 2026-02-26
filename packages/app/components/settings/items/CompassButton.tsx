import { useTranslate } from '@tolgee/react';
import { CompassIcon } from 'app/components/icons/settings/CompassIcon';
import { useOpenDrawer } from 'app/hooks/useOpenDrawer';
import { useRouter } from 'solito/navigation';
import { SettingsItem } from './SettingsItem';

export const CompassButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const { setOpenDrawer } = useOpenDrawer();

	return (
		<SettingsItem
			icon={<CompassIcon />}
			iconbg="bg-[#FF0000]"
			title={t('compass.title')}
			variant="link"
			onPress={() => {
				router.push('/compass');
				setOpenDrawer(false);
			}}
		/>
	);
};

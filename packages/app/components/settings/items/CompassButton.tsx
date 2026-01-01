import { useTranslate } from '@tolgee/react';
import { CompassIcon } from '../../icons/settings/CompassIcon';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';

export const CompassButton = () => {
	const { t } = useTranslate('settings');

	return (
		<SettingsItem
			icon={<CompassIcon />}
			iconbg="bg-[#FF0000]"
			title={`${t('compass.title')} ${t('compass.iosonly')}`}
			variant="link"
			className={clsx('rounded-3xl')}
		/>
	);
};

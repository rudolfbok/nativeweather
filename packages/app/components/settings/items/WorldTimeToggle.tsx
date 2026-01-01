import { useTranslate } from '@tolgee/react';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { StyledSwitch } from '../../common/StyledSwitch';
import { ClockFadingIcon } from '../../icons/settings/ClockFadingIcon';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';

export const WorldTimeToggle = () => {
	const { t } = useTranslate('settings');
	const [showWorldTime, setShowWorldTime] = useStorageBoolean('showWorldTime');

	return (
		<SettingsItem
			icon={<ClockFadingIcon stroke="white" />}
			iconbg="bg-primaryblue"
			title={t('worldtime')}
			variant="toggle"
			toggle={<StyledSwitch value={showWorldTime} onValueChange={setShowWorldTime} />}
			className={clsx('rounded-bl-3xl rounded-br-3xl hover:!bg-transparent active:!bg-transparent')}
		/>
	);
};

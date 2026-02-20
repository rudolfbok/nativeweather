import { useTranslate } from '@tolgee/react';
import { StyledSwitch } from 'app/components/common/styled/StyledSwitch';
import { ClockFadingIcon } from 'app/components/icons/settings/ClockFadingIcon';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { clsx } from 'clsx';
import { SettingsItem } from './SettingsItem';

export const WorldTimeToggle = () => {
	const { t } = useTranslate('settings');
	const [showWorldTime, setShowWorldTime] = useStorageBoolean('showWorldTime');

	return (
		<SettingsItem
			icon={<ClockFadingIcon />}
			iconbg="bg-primaryblue"
			title={t('worldtime')}
			variant="toggle"
			toggle={<StyledSwitch value={showWorldTime} onValueChange={setShowWorldTime} />}
			className={clsx('rounded-bl-3xl rounded-br-3xl hover:!bg-transparent active:!bg-transparent')}
		/>
	);
};

import { useTranslate } from '@tolgee/react';
import { StyledSwitch } from '../../common/styled/StyledSwitch';
import { ClockFadingIcon } from '../../icons/settings/ClockFadingIcon';
import { useStorageBoolean } from '@nativeweather/core/database/useStorage';
import { SettingsItem } from './SettingsItem';

export const LocalTimeToggle = () => {
	const { t } = useTranslate('settings');
	const [showLocalTime, setShowLocalTime] = useStorageBoolean('showWorldTime');

	return (
		<SettingsItem
			icon={<ClockFadingIcon />}
			iconbg="bg-primaryblue"
			title={t('localtime')}
			variant="toggle"
			toggle={<StyledSwitch value={showLocalTime} onValueChange={setShowLocalTime} />}
		/>
	);
};

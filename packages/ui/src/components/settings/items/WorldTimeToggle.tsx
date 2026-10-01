import { useTranslate } from '@tolgee/react';
import { StyledSwitch } from '@nativeweather/ui/components/common/styled/StyledSwitch';
import { ClockFadingIcon } from '@nativeweather/ui/components/icons/settings/ClockFadingIcon';
import { useStorageBoolean } from '@nativeweather/core/database/useStorage';
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
		/>
	);
};

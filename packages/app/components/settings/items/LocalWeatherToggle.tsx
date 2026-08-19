import { useTranslate } from '@tolgee/react';
import { StyledSwitch } from 'app/components/common/styled/StyledSwitch';
import { useStorageBoolean } from 'app/database/useStorage';
import { MapPinHouse } from 'lucide-react-native';
import { SettingsItem } from './SettingsItem';

export const LocalWeatherToggle = () => {
	const { t } = useTranslate('settings');
	const [showLocalWeather, setShowLocalWeather] = useStorageBoolean('showLocalWeather');

	return (
		<SettingsItem
			icon={<MapPinHouse color="white" size={20} />}
			iconbg="bg-[#00C000]"
			title={t('localweather')}
			variant="toggle"
			toggle={<StyledSwitch value={showLocalWeather} onValueChange={setShowLocalWeather} />}
			border={true}
		/>
	);
};

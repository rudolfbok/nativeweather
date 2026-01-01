import { useTranslate } from '@tolgee/react';
import { StyledSwitch } from 'app/components/common/StyledSwitch';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { MapPinHouse } from 'lucide-react-native';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';

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
			className={clsx('rounded-tl-3xl rounded-tr-3xl hover:!bg-transparent active:!bg-transparent')}
			border={true}
		/>
	);
};

import { useTranslate } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { EUFLag } from '@nativeweather/ui/components/icons/settings/EUFlag';
import { USAFlag } from '@nativeweather/ui/components/icons/settings/USAFlag';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { SettingsItem } from '../items/SettingsItem';

export const AQISelect = () => {
	const { t } = useTranslate('settings');
	const [currentAQI, setCurrentAQI] = useStorageString('currentAQI');

	return (
		<RoundView>
			<SettingsItem
				onPress={() => setCurrentAQI('EU')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<EUFLag />}
				title={t('airquality.european')}
				variant="check"
				selected={currentAQI === 'EU'}
				border={true}
			/>
			<SettingsItem
				onPress={() => setCurrentAQI('US')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<USAFlag />}
				title={t('airquality.american')}
				variant="check"
				selected={currentAQI === 'US'}
			/>
		</RoundView>
	);
};

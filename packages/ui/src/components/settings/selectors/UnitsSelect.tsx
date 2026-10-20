import { useTranslate } from '@tolgee/react';
import { RoundView } from '../../common/styled/RoundView';
import { InchesIcon } from '../../icons/settings/InchesIcon';
import { MillimetresIcon } from '../../icons/settings/MillimetresIcon';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { SettingsItem } from '../items/SettingsItem';

export const UnitsSelect = () => {
	const { t } = useTranslate('settings');
	const [currentUnits, setCurrentUnits] = useStorageString('currentUnits');
	return (
		<RoundView>
			<SettingsItem
				icon={<MillimetresIcon />}
				iconbg="bg-primaryblue"
				title={`${t('units.metric')} - mm, km, kPa`}
				variant="check"
				onPress={() => setCurrentUnits('metric')}
				selected={currentUnits === 'metric'}
				border={true}
			/>
			<SettingsItem
				icon={<InchesIcon />}
				iconbg="bg-primaryblue"
				title={`${t('units.imperial')} - in, mil, inHg`}
				variant="check"
				onPress={() => setCurrentUnits('imperial')}
				selected={currentUnits === 'imperial'}
			/>
		</RoundView>
	);
};

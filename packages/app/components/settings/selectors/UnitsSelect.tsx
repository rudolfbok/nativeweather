import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { RoundView } from '../../common/RoundView';
import { InchesIcon } from '../../icons/settings/InchesIcon';
import { MillimetresIcon } from '../../icons/settings/MillimetresIcon';
import { SettingsItem } from '../items/SettingsItem';

export const UnitsSelect = () => {
	const [currentUnits, setCurrentUnits] = useStorageString('currentUnits');
	const { t } = useTranslate('settings');
	return (
		<RoundView className={clsx('mt-2')}>
			<SettingsItem
				icon={<MillimetresIcon />}
				iconbg="bg-primaryblue"
				title={`${t('units.metric')} - mm, km, kPa`}
				variant="check"
				onPress={() => setCurrentUnits('metric')}
				selected={currentUnits === 'metric'}
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
				border={true}
			/>
			<SettingsItem
				icon={<InchesIcon />}
				iconbg="bg-primaryblue"
				title={`${t('units.imperial')} - in, mil, inHg`}
				variant="check"
				onPress={() => setCurrentUnits('imperial')}
				selected={currentUnits === 'imperial'}
				className={clsx('rounded-bl-3xl rounded-br-3xl')}
			/>
		</RoundView>
	);
};

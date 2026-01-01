import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { RoundView } from '../../common/RoundView';
import { EUFLag } from '../../icons/settings/EUFlag';
import { USAFlag } from '../../icons/settings/USAFlag';
import { SettingsItem } from '../items/SettingsItem';

export const AQISelect = () => {
	const { t } = useTranslate('settings');
	const [currentAQI, setCurrentAQI] = useStorageString('currentAQI');

	return (
		<RoundView className={clsx('mt-2')}>
			<SettingsItem
				onPress={() => setCurrentAQI('EU')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<EUFLag />}
				title={t('airquality.european')}
				variant="check"
				selected={currentAQI === 'EU'}
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
				border={true}
			/>
			<SettingsItem
				onPress={() => setCurrentAQI('USA')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<USAFlag />}
				title={t('airquality.american')}
				variant="check"
				selected={currentAQI === 'USA'}
				className={clsx('rounded-bl-3xl rounded-br-3xl')}
			/>
		</RoundView>
	);
};

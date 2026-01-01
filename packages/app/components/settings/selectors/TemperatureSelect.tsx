import { CelsiusIcon } from 'app/components/icons/settings/CelsiusIcon';
import { FahrenheitIcon } from 'app/components/icons/settings/FahrenheitIcon';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { RoundView } from '../../common/RoundView';
import { SettingsItem } from '../items/SettingsItem';

export const TemperatureSelect = () => {
	const [currentTemperature, setCurrentTemperature] = useStorageString('currentTemp');
	return (
		<RoundView className={clsx('mt-2')}>
			<SettingsItem
				icon={<CelsiusIcon />}
				iconbg="bg-primaryblue"
				title="Celsius"
				variant="check"
				onPress={() => setCurrentTemperature('celsius')}
				selected={currentTemperature === 'celsius'}
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
				border={true}
			/>
			<SettingsItem
				icon={<FahrenheitIcon />}
				iconbg="bg-primaryblue"
				title="Fahrenheit"
				variant="check"
				onPress={() => setCurrentTemperature('fahrenheit')}
				selected={currentTemperature === 'fahrenheit'}
				className={clsx('rounded-bl-3xl rounded-br-3xl')}
			/>
		</RoundView>
	);
};

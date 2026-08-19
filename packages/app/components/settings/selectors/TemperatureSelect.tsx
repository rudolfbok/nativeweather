import { RoundView } from 'app/components/common/styled/RoundView';
import { CelsiusIcon } from 'app/components/icons/settings/CelsiusIcon';
import { FahrenheitIcon } from 'app/components/icons/settings/FahrenheitIcon';
import { useStorageString } from 'app/storage/useStorage';
import { SettingsItem } from '../items/SettingsItem';

export const TemperatureSelect = () => {
	const [currentTemperature, setCurrentTemperature] = useStorageString('currentTemp');
	return (
		<RoundView>
			<SettingsItem
				icon={<CelsiusIcon />}
				iconbg="bg-primaryblue"
				title="Celsius"
				variant="check"
				onPress={() => setCurrentTemperature('celsius')}
				selected={currentTemperature === 'celsius'}
				border={true}
			/>
			<SettingsItem
				icon={<FahrenheitIcon />}
				iconbg="bg-primaryblue"
				title="Fahrenheit"
				variant="check"
				onPress={() => setCurrentTemperature('fahrenheit')}
				selected={currentTemperature === 'fahrenheit'}
			/>
		</RoundView>
	);
};

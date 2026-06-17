import { RoundView } from 'app/components/common/ui/RoundView';
import { OpenMeteoIcon } from 'app/components/icons/settings/OpenMeteoIcon';
import { WeatherAPIIcon } from 'app/components/icons/settings/WeatherAPIIcon';
import { useStorageString } from 'app/storage/useStorage';
import { SettingsItem } from '../items/SettingsItem';

export const SourceSelect = () => {
	const [currentSource, setCurrentSource] = useStorageString('currentSource');

	return (
		<RoundView>
			<SettingsItem
				icon={<WeatherAPIIcon />}
				iconbg="bg-black/20 dark:bg-black/60"
				title="Weather API"
				variant="check"
				selected={currentSource === 'weatherapi'}
				onPress={() => setCurrentSource('weatherapi')}
				border={true}
			/>
			<SettingsItem
				icon={<OpenMeteoIcon />}
				iconbg="bg-black/20 dark:bg-black/60"
				title="OpenMeteo"
				variant="check"
				selected={currentSource === 'openmeteo'}
				onPress={() => setCurrentSource('openmeteo')}
			/>
		</RoundView>
	);
};

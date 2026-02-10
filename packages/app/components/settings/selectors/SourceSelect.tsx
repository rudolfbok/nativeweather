import { RoundView } from 'app/components/common/ui/RoundView';
import { OpenWeatherIcon } from 'app/components/icons/settings/OpenWeatherIcon';
import { WeatherAPIIcon } from 'app/components/icons/settings/WeatherAPIIcon';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { Paintbrush } from 'lucide-react-native';
import { SettingsItem } from '../items/SettingsItem';
import { OpenMeteoIcon } from 'app/components/icons/settings/OpenMeteoIcon';

export const SourceSelect = () => {
	const [currentSource, setCurrentSource] = useStorageString('currentSource');

	return (
		<RoundView className={clsx('mt-2')}>
			<SettingsItem
				icon={<WeatherAPIIcon />}
				iconbg="bg-black/20 dark:bg-black/60"
				title="Weather API"
				variant="check"
				selected={currentSource === 'weatherapi'}
				onPress={() => setCurrentSource('weatherapi')}
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
				border={true}
			/>
			<SettingsItem
				icon={<OpenWeatherIcon />}
				iconbg="bg-black/20 dark:bg-black/60"
				title="OpenWeather"
				variant="check"
				selected={currentSource === 'openweather'}
				onPress={() => setCurrentSource('openweather')}
				border={true}
			/>
			<SettingsItem
				icon={<OpenMeteoIcon />}
				iconbg="bg-black/20 dark:bg-black/60"
				title="OpenMeteo"
				variant="check"
				selected={currentSource === 'openmeteo'}
				onPress={() => setCurrentSource('openmeteo')}
				className={clsx('rounded-bl-3xl rounded-br-3xl')}
			/>
		</RoundView>
	);
};

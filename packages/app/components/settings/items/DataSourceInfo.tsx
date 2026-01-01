import { RoundView } from 'app/components/common/RoundView';
import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { Linking, Platform, Pressable, View } from 'react-native';
import { StyledText } from 'app/components/common/StyledText';
import { GoogleMapsPlatformLogo } from 'app/components/icons/logos/GoogleMapsPlatformLogo';
import { OpenMeteoLogo } from 'app/components/icons/logos/OpenMeteoLogo';
import { OpenWeatherLogo } from 'app/components/icons/logos/OpenWeatherLogo';
import { WeatherAPILogo } from 'app/components/icons/logos/WeatherAPILogo';

interface DataSourceItemProps {
	name: string;
	logo: ReactNode;
	description: string;
	url: string;
}

const dataSourceItemValues = [
	{
		name: 'Weather API',
		logo: <WeatherAPILogo />,
		description: 'Cutting edge weather service situated in Dubai',
		url: 'https://www.weatherapi.com/',
	},
	{
		name: 'OpenMeteo API',
		logo: <OpenMeteoLogo />,
		description: 'Open source API providing local air quality data',
		url: 'https://open-meteo.com/',
	},
	{
		name: 'OpenWeather API',
		logo: <OpenWeatherLogo />,
		description: 'From United Kingdom used by many European companies',
		url: 'https://openweathermap.org/',
	},
	{
		name: 'Google Maps Platform API',
		logo: <GoogleMapsPlatformLogo />,
		description: 'Modern platform by Google for developers',
		url: 'https://mapsplatform.google.com/',
	},
];

const DataSourceItem = ({ name, logo, description, url }: DataSourceItemProps) => {
	return (
		<RoundView className={'w-full p-4'}>
			<View className={clsx('items-center gap-2')}>
				{logo}
				<StyledText type="subtitle">{name}</StyledText>
				<View className={clsx('items-center')}>
					<StyledText type="body" className={clsx('mb-1 text-center')}>
						{description}
					</StyledText>
					<Pressable onPress={() => Linking.openURL(url)}>
						<StyledText type="link">{url}</StyledText>
					</Pressable>
				</View>
			</View>
		</RoundView>
	);
};

export const DataSourceInfo = () => {
	return (
		<View
			className={clsx(
				'mt-2 w-full gap-4',
				Platform.OS === 'web' ? 'grid grid-cols-1 place-self-center md:grid-cols-2 lg:w-2/3' : 'flex-col'
			)}
		>
			{dataSourceItemValues.map(({ name, logo, description, url }, index) => (
				<DataSourceItem key={index} name={name} logo={logo} description={description} url={url} />
			))}
		</View>
	);
};

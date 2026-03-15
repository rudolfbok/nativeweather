import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';
import { GoogleMapsPlatformLogo } from 'app/components/icons/logos/GoogleMapsPlatformLogo';
import { OpenMeteoLogo } from 'app/components/icons/logos/OpenMeteoLogo';
import { OpenWeatherLogo } from 'app/components/icons/logos/OpenWeatherLogo';
import { WeatherAPILogo } from 'app/components/icons/logos/WeatherAPILogo';
import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { Linking, Platform, Pressable, View } from 'react-native';

interface DataSourceItemProps {
	name: string;
	logo: ReactNode;
	description: string;
	url: string;
}

const DataSourceItem = ({ name, logo, description, url }: DataSourceItemProps) => {
	return (
		<RoundView
			className={'h-fit w-full items-center justify-center gap-2 p-4'}
			style={{ padding: 16, gap: 8, alignItems: 'center', justifyContent: 'center' }}
		>
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
		</RoundView>
	);
};

export const AboutBody = () => {
	const { t } = useTranslate('settings');

	const dataSourceItemValues = [
		{
			name: 'Weather API',
			logo: <WeatherAPILogo />,
			description: t('datasource.weatherapi'),
			url: 'https://www.weatherapi.com/',
		},
		{
			name: 'OpenMeteo API',
			logo: <OpenMeteoLogo />,
			description: t('datasource.openmeteo'),
			url: 'https://open-meteo.com/',
		},
		{
			name: 'OpenWeather API',
			logo: <OpenWeatherLogo />,
			description: t('datasource.openweather'),
			url: 'https://openweathermap.org/',
		},
		{
			name: 'Google Maps Platform API',
			logo: <GoogleMapsPlatformLogo />,
			description: t('datasource.googlemaps'),
			url: 'https://mapsplatform.google.com/',
		},
	];

	return (
		<View className={clsx('gap-2')}>
			<RoundView className={clsx('p-4')} style={{ padding: 16 }}>
				<StyledText type="body">{t('about.aboutapp')}</StyledText>
			</RoundView>
			<StyledText type="title">{t('datasource.title')}</StyledText>
			<View
				className={clsx(
					'w-full flex-1 gap-4',
					Platform.OS === 'web' ? 'grid grid-cols-1 place-self-center md:grid-cols-2' : 'flex-col'
				)}
			>
				{dataSourceItemValues.map(({ name, logo, description, url }, index) => (
					<DataSourceItem key={index} name={name} logo={logo} description={description} url={url} />
				))}
			</View>
		</View>
	);
};

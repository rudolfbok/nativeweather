import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/ui/RoundView';
import { OpenMeteoLogo } from 'app/components/icons/logos/OpenMeteoLogo';
import { OpenFreeMapLogo } from 'app/components/icons/logos/OpenFreeMapLogo';
import { WeatherAPILogo } from 'app/components/icons/logos/WeatherAPILogo';
import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { Separator } from 'app/components/common/ui/Separator';
import { ContentRow } from 'app/components/common/ui/ContentRow';

interface DataSourceItemProps {
	name: string;
	logo: ReactNode;
	description: string;
	url: string;
}

const DataSourceItem = ({ name, logo, description, url }: DataSourceItemProps) => {
	return (
		<View className={clsx('items-center gap-2')}>
			{logo}
			<View className={clsx('items-center')}>
				<StyledText type="subtitle">{name}</StyledText>
				<StyledText type="body" className={clsx('text-center')}>
					{description}
				</StyledText>
			</View>
			<Pressable onPress={() => Linking.openURL(url)}>
				<StyledText type="link">{url}</StyledText>
			</Pressable>
		</View>
	);
};

export const AboutFeature = () => {
	const { t } = useTranslate('settings');
	const { t: commonT } = useTranslate('common');

	const dataSourceItemValues = [
		{
			name: 'Weather API',
			logo: <WeatherAPILogo />,
			description: t('about.weatherapi'),
			url: 'https://www.weatherapi.com/',
		},
		{
			name: 'OpenMeteo API',
			logo: <OpenMeteoLogo />,
			description: t('about.openmeteo'),
			url: 'https://open-meteo.com/',
		},
		{
			name: 'OpenFreeMap',
			logo: <OpenFreeMapLogo />,
			description: t('about.openfreemap'),
			url: 'https://openfreemap.org/',
		},
	];

	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={commonT('modal.description')}>
				<StyledText type="body">{t('about.aboutapp')}</StyledText>
			</ContentRow>
			<ContentRow title={t('datasource.title')}>
				<View className="gap-4">
					{dataSourceItemValues.map(({ name, logo, description, url }, index) => (
						<View key={name} className="gap-4">
							<DataSourceItem name={name} logo={logo} description={description} url={url} />
							{index < dataSourceItemValues.length - 1 && <Separator />}
						</View>
					))}
				</View>
			</ContentRow>
		</View>
	);
};

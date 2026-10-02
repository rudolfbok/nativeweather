import { useTranslate } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { Separator } from '@nativeweather/ui/components/common/styled/Separator';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { OpenFreeMapLogo } from '@nativeweather/ui/components/icons/logos/OpenFreeMapLogo';
import { OpenMeteoLogo } from '@nativeweather/ui/components/icons/logos/OpenMeteoLogo';
import { WeatherAPILogo } from '@nativeweather/ui/components/icons/logos/WeatherAPILogo';
import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { LegalLinks } from '@nativeweather/ui/components/settings/LegalLinks';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Linking, View } from 'react-native';

interface DataSourceItemProps {
	name: string;
	logo: ReactNode;
	url: string;
}

const DataSourceItem = ({ name, logo, url }: DataSourceItemProps) => {
	const { text } = useThemeColors();

	return (
		<StyledPressable onPress={() => Linking.openURL(url)} className={clsx('flex-row items-center gap-4 px-4 py-3')}>
			<View className={clsx('w-16 scale-[0.45] items-center')}>{logo}</View>
			<View className={clsx('flex-1')}>
				<StyledText type="sectiontitle">{name}</StyledText>
			</View>
			<ChevronRight color={text} />
		</StyledPressable>
	);
};

export const AboutFeature = () => {
	const { t } = useTranslate('settings');

	const dataSourceItemValues = [
		{
			name: 'Weather API',
			logo: <WeatherAPILogo />,
			url: 'https://www.weatherapi.com/',
		},
		{
			name: 'OpenMeteo API',
			logo: <OpenMeteoLogo />,
			url: 'https://open-meteo.com/',
		},
		{
			name: 'OpenFreeMap',
			logo: <OpenFreeMapLogo />,
			url: 'https://openfreemap.org/',
		},
	];

	return (
		<View className={clsx('gap-2')}>
			<RoundView className="p-4">
				<StyledText type="body">{t('about.aboutapp')}</StyledText>
			</RoundView>
			<View className={clsx('gap-2')}>
				<StyledText type="sectiontitle">{t('datasource.title')}</StyledText>
				<RoundView>
					{dataSourceItemValues.map(({ name, logo, url }, index) => (
						<View key={name}>
							<DataSourceItem name={name} logo={logo} url={url} />
							{index < dataSourceItemValues.length - 1 && <Separator className="mx-4" />}
						</View>
					))}
				</RoundView>
			</View>
			<LegalLinks />
		</View>
	);
};

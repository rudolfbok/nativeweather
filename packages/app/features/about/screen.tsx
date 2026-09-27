import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/styled/RoundView';
import { Separator } from 'app/components/common/styled/Separator';
import { StyledText } from 'app/components/common/styled/StyledText';
import { OpenFreeMapLogo } from 'app/components/icons/logos/OpenFreeMapLogo';
import { OpenMeteoLogo } from 'app/components/icons/logos/OpenMeteoLogo';
import { WeatherAPILogo } from 'app/components/icons/logos/WeatherAPILogo';
import { LegalLinks } from 'app/components/settings/LegalLinks';
import { variants } from 'app/constants/pressableVariants';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Linking, Pressable, View } from 'react-native';

interface DataSourceItemProps {
	name: string;
	logo: ReactNode;
	url: string;
}

const DataSourceItem = ({ name, logo, url }: DataSourceItemProps) => {
	const { text } = useThemeColors();

	return (
		<Pressable
			onPress={() => Linking.openURL(url)}
			className={clsx(
				'ios:active:bg-tertiarySystemBackground ios:active:dark:bg-tertiarySystemBackground_dark flex-row items-center gap-2 px-4 py-3',
				variants
			)}
		>
			<View className={clsx('w-16 scale-75 items-center')}>{logo}</View>
			<View className={clsx('flex-1')}>
				<StyledText type="sectiontitle">{name}</StyledText>
			</View>
			<ChevronRight color={text} />
		</Pressable>
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

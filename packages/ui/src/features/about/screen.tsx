import { useTranslate } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { Separator } from '@nativeweather/ui/components/common/styled/Separator';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { OpenFreeMapLogo } from '@nativeweather/ui/components/icons/logos/OpenFreeMapLogo';
import { OpenMeteoLogo } from '@nativeweather/ui/components/icons/logos/OpenMeteoLogo';
import { WeatherAPILogo } from '@nativeweather/ui/components/icons/logos/WeatherAPILogo';
import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { ChevronRight, FileText, ShieldCheck } from 'lucide-react-native';
import { ReactNode, useState } from 'react';
import { Linking, View } from 'react-native';
import { SettingsItem } from '@nativeweather/ui/components/settings/items/SettingsItem';

interface DataSourceItemProps {
	name: string;
	logo: ReactNode;
	url: string;
}

const DataSourceItem = ({ name, logo, url }: DataSourceItemProps) => {
	const { text } = useThemeColors();

	return (
		<StyledPressable onPress={() => Linking.openURL(url)} className={clsx('flex-row items-center gap-2 p-4')}>
			<View className={clsx('w-12 items-center')}>{logo}</View>
			<View className={clsx('flex-1')}>
				<StyledText type="sectiontitle">{name}</StyledText>
			</View>
			<ChevronRight color={text} />
		</StyledPressable>
	);
};

export const AboutFeature = () => {
	const { t } = useTranslate('settings');
	const [year] = useState(() => new Date().getFullYear());

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
			<View className={clsx('gap-2')}>
				<StyledText type="sectiontitle">{t('legal.title')}</StyledText>
				<RoundView>
					<SettingsItem
						icon={<ShieldCheck color="white" size={20} />}
						iconbg="bg-[#80848B]"
						title={t('privacyPolicy')}
						variant="link"
						onPress={() => Linking.openURL('https://nativeweather.pages.dev/policy')}
						border
					/>
					<SettingsItem
						icon={<FileText color="white" size={20} />}
						iconbg="bg-[#80848B]"
						title={t('termsOfService')}
						variant="link"
						onPress={() => Linking.openURL('https://nativeweather.pages.dev/tos')}
					/>
				</RoundView>
			</View>
			<View className="mt-2 items-center">
				<StyledText type="caption">© {year} BitApps</StyledText>
			</View>
		</View>
	);
};

import { useTranslate } from '@tolgee/react';
import { ChevronRight, FileText, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Linking, Pressable as NativePressable, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { Pressable } from '../common/Pressable';
import { RoundView } from '../common/RoundView';
import { Separator } from '../common/Separator';
import { Text } from '../common/Text';
import { OpenFreeMapLogo } from '../icons/logos/OpenFreeMapLogo';
import { OpenMeteoLogo } from '../icons/logos/OpenMeteoLogo';
import { WeatherAPILogo } from '../icons/logos/WeatherAPILogo';
import { SettingsRow, TileIcon } from './SettingsRow';

const ChevronIcon = withUniwind(ChevronRight);

interface DataSource {
	name: string;
	/** Key in the `settings` namespace. */
	subtitleKey: string;
	logo: ReactNode;
	url: string;
}

const dataSources: DataSource[] = [
	{
		name: 'Weather API',
		subtitleKey: 'datasource.weatherapi',
		logo: <WeatherAPILogo />,
		url: 'https://www.weatherapi.com/',
	},
	{
		name: 'OpenMeteo API',
		subtitleKey: 'datasource.openmeteo',
		logo: <OpenMeteoLogo colorClassName="accent-label" />,
		url: 'https://open-meteo.com/',
	},
	{
		name: 'OpenFreeMap',
		subtitleKey: 'datasource.openfreemap',
		logo: <OpenFreeMapLogo />,
		url: 'https://openfreemap.org/',
	},
];

const open = (url: string) => () => void Linking.openURL(url);

export const AboutContent = () => {
	const { t } = useTranslate('settings');
	const [year] = useState(() => new Date().getFullYear());

	return (
		<View className="gap-4">
			<RoundView className="p-4">
				<Text type="body">{t('about.aboutapp')}</Text>
			</RoundView>
			<View className="gap-2">
				<Text type="sectiontitle">{t('datasource.title')}</Text>
				<RoundView>
					{dataSources.map(({ name, subtitleKey, logo, url }, index) => (
						<View key={name}>
							{index > 0 && <Separator className="mx-4" />}
							<Pressable onPress={open(url)} accessibilityRole="link" className="flex-row items-center gap-4 p-4">
								<View className="w-10 items-center">{logo}</View>
								<View className="min-w-0 flex-1 gap-1">
									<Text type="sectiontitle">{name}</Text>
									<Text type="caption" className="opacity-70">
										{t(subtitleKey)}
									</Text>
								</View>
								<ChevronIcon colorClassName="accent-secondary-label" size={22} />
							</Pressable>
						</View>
					))}
				</RoundView>
			</View>
			<View className="gap-2">
				<Text type="sectiontitle">{t('legal.title')}</Text>
				<RoundView>
					<SettingsRow
						icon={<TileIcon icon={ShieldCheck} />}
						tileClassName="bg-system-gray"
						title={t('privacyPolicy')}
						onPress={open('https://nativeweather.pages.dev/policy')}
						border
					/>
					<SettingsRow
						icon={<TileIcon icon={FileText} />}
						tileClassName="bg-system-gray"
						title={t('termsOfService')}
						onPress={open('https://nativeweather.pages.dev/tos')}
					/>
				</RoundView>
			</View>
			<View className="flex-row items-center justify-center gap-1">
				<Text type="caption">© {year}</Text>
				<NativePressable onPress={open('https://bitwebs.pages.dev')} accessibilityRole="link">
					<Text type="caption" className="web:hover:underline">
						bitwebs
					</Text>
				</NativePressable>
			</View>
		</View>
	);
};

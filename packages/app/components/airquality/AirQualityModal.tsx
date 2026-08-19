import { useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/modal/StyledModal';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ModalHeader } from 'app/components/common/modal/ModalHeader';
import { AirQualityIcon } from 'app/components/icons/main/AirQualityIcon';
import { OpenMeteoAQI } from 'app/types/openMeteo';
import {
	EUAQIIndicatorColor,
	NO2IndicatorColor,
	OzoneIndicatorColor,
	PM10IndicatorColor,
	PM25IndicatorColor,
	USAQIIndicatorColor,
} from 'app/utils/mappings/mapAQIDots';
import { clsx } from 'clsx';
import { JSX, ReactNode, useState } from 'react';
import { Linking, Platform, Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { AirQualityItem } from './AirQualityItem';
import { EUAQIDetail } from './EUAQIDetail';
import { NO2Detail } from './NO2Detail';
import { O3Detail } from './O3Detail';
import { PM10Detail } from './PM10Detail';
import { PM25Detail } from './PM25Detail';
import { USAQIDetail } from './USAQIDetail';

interface AirQualityModalProps {
	visible?: boolean;
	onClose?: () => void;
	airQualityData: OpenMeteoAQI;
}

const detailComponents: Record<string, JSX.Element> = {
	euaqi: <EUAQIDetail />,
	usaqi: <USAQIDetail />,
	pm25: <PM25Detail />,
	pm10: <PM10Detail />,
	o3: <O3Detail />,
	no2: <NO2Detail />,
};

const nameFormat: Record<string, string> = {
	euaqi: 'EU AQI',
	usaqi: 'US AQI',
	pm25: 'PM2.5',
	pm10: 'PM10',
	o3: 'O3',
	no2: 'NO2',
};

export const AirQualityModal = ({ visible, onClose, airQualityData }: AirQualityModalProps) => {
	const { t } = useTranslate('weather');
	const [showAirQualityMetric, setShowAirQualityMetric] = useState<string | null>(null);
	const router = useRouter();

	const airQualityItemsList = [
		{
			name: 'euaqi',
			description: t('airquality.item.euaqi'),
			data: airQualityData!.current.european_aqi,
			colorIndicator: EUAQIIndicatorColor(airQualityData!.current.european_aqi),
			units: '',
		},
		{
			name: 'usaqi',
			description: t('airquality.item.usaqi'),
			data: airQualityData!.current.us_aqi,
			colorIndicator: USAQIIndicatorColor(airQualityData!.current.us_aqi),
			units: '',
		},
		{
			name: 'pm25',
			description: t('airquality.item.pm25'),
			data: airQualityData!.current.pm2_5,
			colorIndicator: PM25IndicatorColor(airQualityData!.current.pm2_5),
			units: 'μg/m³',
		},
		{
			name: 'pm10',
			description: t('airquality.item.pm10'),
			data: airQualityData!.current.pm10,
			colorIndicator: PM10IndicatorColor(airQualityData!.current.pm10),
			units: 'μg/m³',
		},
		{
			name: 'o3',
			description: t('airquality.item.ozone'),
			data: airQualityData!.current.ozone,
			colorIndicator: OzoneIndicatorColor(airQualityData!.current.ozone),
			units: 'μg/m³',
		},
		{
			name: 'no2',
			description: t('airquality.item.no2'),
			data: airQualityData!.current.nitrogen_dioxide,
			colorIndicator: NO2IndicatorColor(airQualityData!.current.nitrogen_dioxide),
			units: 'μg/m³',
		},
	];

	const Wrapper = ({ children }: { children: ReactNode }) => {
		if (Platform.OS === 'ios') {
			return <>{children}</>;
		}

		if (Platform.OS === 'macos') {
			return (
				<View className="w-full flex-1 pt-4">
					<ModalHeader
						icon={showAirQualityMetric ? undefined : <AirQualityIcon />}
						header={
							showAirQualityMetric === null
								? t('airquality.title')
								: (airQualityItemsList.find((item) => item.name === showAirQualityMetric)?.description ?? '')
						}
						showBack={Boolean(showAirQualityMetric)}
						onBackPress={() => setShowAirQualityMetric(null)}
						onClose={() => onClose?.()}
					/>
					<ScrollView className="flex-1" contentContainerClassName="px-4 pb-4" showsVerticalScrollIndicator={false}>
						{children}
					</ScrollView>
				</View>
			);
		}

		return (
			<StyledModal
				visible={visible}
				airQualityModal={!showAirQualityMetric && true}
				goBackHeader={showAirQualityMetric ? true : false}
				goBackOnPress={() => setShowAirQualityMetric(null)}
				icon={showAirQualityMetric ? undefined : <AirQualityIcon />}
				header={
					showAirQualityMetric === null
						? t('airquality.title')
						: (airQualityItemsList.find((item) => item.name === showAirQualityMetric)?.description ?? '')
				}
				onClose={onClose}
			>
				{children}
			</StyledModal>
		);
	};

	return (
		<Wrapper>
			{showAirQualityMetric === null && (
				<View>
					<View
						className={clsx(
							'native:flex-row native:flex-wrap native:justify-center grid grid-cols-2 gap-4 sm:grid-cols-3'
						)}
					>
						{airQualityItemsList.map(({ name, description, data, colorIndicator, units }, index) => (
							<AirQualityItem
								key={index}
								onPress={
									Platform.OS === 'ios'
										? () => router.push(`/modals/airquality/${name}`)
										: () => setShowAirQualityMetric(name)
								}
								item={nameFormat[name]}
								description={description}
								colorIndicator={colorIndicator}
								data={data}
								units={units}
							/>
						))}
					</View>
					{/* <View className={clsx('mt-4 flex w-full flex-row items-center justify-center gap-1')}>
						<StyledText type="bodysecondary" className={clsx('opacity-70')}>
							{t('airquality.provider')}
						</StyledText>
						<Pressable onPress={() => Linking.openURL('https://open-meteo.com/')}>
							<StyledText type="link" className={clsx('!text-sm')}>
								OpenMeteoAPI
							</StyledText>
						</Pressable>
					</View> */}
				</View>
			)}
			{detailComponents[showAirQualityMetric ?? ''] ?? null}
		</Wrapper>
	);
};

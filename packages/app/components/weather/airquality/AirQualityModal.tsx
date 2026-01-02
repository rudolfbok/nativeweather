import { useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { AirQualityIcon } from 'app/components/icons/AirQualityIcon';
import { useWeather } from 'app/hooks/useWeather';
import {
	EUAQIIndicatorColor,
	NO2IndicatorColor,
	OzoneIndicatorColor,
	PM10IndicatorColor,
	PM25IndicatorColor,
	USAQIIndicatorColor,
} from 'app/utils/mappings/mapAirQualityIndicators';
import clsx from 'clsx';
import { JSX, useState } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { AirQualityItem } from './AirQualityItem';
import { EUAQIDetail } from './EUAQIDetail';
import { NO2Detail } from './NO2Detail';
import { O3Detail } from './O3Detail';
import { PM10Detail } from './PM10Detail';
import { PM25Detail } from './PM25Detail';
import { USAQIDetail } from './USAQIDetail';
import { AirQualityData } from 'app/types/airQualityData';

interface AirQualityModalProps {
	visible: boolean;
	onClose: () => void;
	airQualityData: AirQualityData;
}

export const AirQualityModal = ({ visible, onClose, airQualityData }: AirQualityModalProps) => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const [showAirQualityMetric, setShowAirQualityMetric] = useState<string | null>(null);

	const airQualityItemsList = [
		{
			name: 'EU AQI',
			description: t('airquality.item.euaqi'),
			data: airQualityData!.current.european_aqi,
			colorIndicator: EUAQIIndicatorColor(airQualityData!.current.european_aqi),
			units: '',
		},
		{
			name: 'US AQI',
			description: t('airquality.item.usaqi'),
			data: airQualityData!.current.us_aqi,
			colorIndicator: USAQIIndicatorColor(airQualityData!.current.us_aqi),
			units: '',
		},
		{
			name: 'PM2.5',
			description: t('airquality.item.pm25'),
			data: airQualityData!.current.pm2_5,
			colorIndicator: PM25IndicatorColor(airQualityData!.current.pm2_5),
			units: 'μg/m³',
		},
		{
			name: 'PM10',
			description: t('airquality.item.pm10'),
			data: airQualityData!.current.pm10,
			colorIndicator: PM10IndicatorColor(airQualityData!.current.pm10),
			units: 'μg/m³',
		},
		{
			name: 'O3',
			description: t('airquality.item.ozone'),
			data: airQualityData!.current.ozone,
			colorIndicator: OzoneIndicatorColor(airQualityData!.current.ozone),
			units: 'μg/m³',
		},
		{
			name: 'NO2',
			description: t('airquality.item.no2'),
			data: airQualityData!.current.nitrogen_dioxide,
			colorIndicator: NO2IndicatorColor(airQualityData!.current.nitrogen_dioxide),
			units: 'μg/m³',
		},
	];

	const detailComponents: Record<string, JSX.Element> = {
		'EU AQI': <EUAQIDetail />,
		'US AQI': <USAQIDetail />,
		'PM2.5': <PM25Detail />,
		PM10: <PM10Detail />,
		O3: <O3Detail />,
		NO2: <NO2Detail />,
	};

	return (
		<StyledModal
			visible={visible}
			goBackHeader={showAirQualityMetric ? true : false}
			goBackOnPress={() => setShowAirQualityMetric(null)}
			icon={showAirQualityMetric ? undefined : <AirQualityIcon />}
			header={
				showAirQualityMetric === null
					? `${t('airquality.title')} ${weatherData?.location.name}`
					: (airQualityItemsList.find((item) => item.name === showAirQualityMetric)?.description ?? '')
			}
			onClose={onClose}
		>
			{showAirQualityMetric === null && (
				<View>
					<View className={clsx('ios:flex-row ios:flex-wrap mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3')}>
						{airQualityItemsList.map(({ name, description, data, colorIndicator, units }, index) => (
							<AirQualityItem
								key={index}
								onPress={() => setShowAirQualityMetric(name)}
								item={name}
								description={description}
								colorIndicator={colorIndicator}
								data={data}
								units={units}
							/>
						))}
					</View>
					<View className={clsx('mt-4 flex w-full flex-row items-center justify-center')}>
						<StyledText type="bodysecondary">{t('airquality.provider')}</StyledText>
						<Pressable onPress={() => Linking.openURL('https://open-meteo.com/')}>
							<StyledText type="link" className={clsx('!text-sm')}>
								OpenMeteoAPI
							</StyledText>
						</Pressable>
					</View>
				</View>
			)}
			{detailComponents[showAirQualityMetric ?? ''] ?? null}
		</StyledModal>
	);
};

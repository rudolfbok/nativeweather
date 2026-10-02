import { useTranslate } from '@tolgee/react';
import { StyledModal } from '@nativeweather/ui/components/common/modal/StyledModal';
import { ModalHeader } from '@nativeweather/ui/components/common/modal/ModalHeader';
import { AirQualityIcon } from '@nativeweather/ui/components/icons/main/AirQualityIcon';
import { OpenMeteoAQI } from '@nativeweather/types/openMeteo';
import {
	EUAQIIndicatorColor as euaqiIndicatorColor,
	NO2IndicatorColor as no2IndicatorColor,
	OzoneIndicatorColor as ozoneIndicatorColor,
	PM10IndicatorColor as pm10IndicatorColor,
	PM25IndicatorColor as pm25IndicatorColor,
	USAQIIndicatorColor as usaqiIndicatorColor,
} from '@nativeweather/core/utils/mappings/airQuality';
import { clsx } from 'clsx';
import { JSX, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
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
	airQualityData: OpenMeteoAQI | null;
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

export const AirQualityModal = ({ visible = false, onClose, airQualityData }: AirQualityModalProps) => {
	const { t } = useTranslate('weather');
	const [showAirQualityMetric, setShowAirQualityMetric] = useState<string | null>(null);
	const router = useRouter();

	if (!airQualityData) return null;

	const airQualityItemsList = [
		{
			name: 'euaqi',
			description: t('airquality.item.euaqi'),
			data: airQualityData.current.european_aqi,
			colorIndicator: euaqiIndicatorColor(airQualityData.current.european_aqi),
			units: '',
		},
		{
			name: 'usaqi',
			description: t('airquality.item.usaqi'),
			data: airQualityData.current.us_aqi,
			colorIndicator: usaqiIndicatorColor(airQualityData.current.us_aqi),
			units: '',
		},
		{
			name: 'pm25',
			description: t('airquality.item.pm25'),
			data: airQualityData.current.pm2_5,
			colorIndicator: pm25IndicatorColor(airQualityData.current.pm2_5),
			units: 'μg/m³',
		},
		{
			name: 'pm10',
			description: t('airquality.item.pm10'),
			data: airQualityData.current.pm10,
			colorIndicator: pm10IndicatorColor(airQualityData.current.pm10),
			units: 'μg/m³',
		},
		{
			name: 'o3',
			description: t('airquality.item.ozone'),
			data: airQualityData.current.ozone,
			colorIndicator: ozoneIndicatorColor(airQualityData.current.ozone),
			units: 'μg/m³',
		},
		{
			name: 'no2',
			description: t('airquality.item.no2'),
			data: airQualityData.current.nitrogen_dioxide,
			colorIndicator: no2IndicatorColor(airQualityData.current.nitrogen_dioxide),
			units: 'μg/m³',
		},
	];

	const modalContent = (
		<>
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
				</View>
			)}
			{detailComponents[showAirQualityMetric ?? ''] ?? null}
		</>
	);
	const header =
		showAirQualityMetric === null
			? t('airquality.title')
			: (airQualityItemsList.find((item) => item.name === showAirQualityMetric)?.description ?? '');
	const icon = showAirQualityMetric ? undefined : <AirQualityIcon />;

	if (Platform.OS === 'ios') return modalContent;

	if (Platform.OS === 'macos') {
		return (
			<View className="w-full flex-1 pt-4">
				<ModalHeader
					icon={icon}
					header={header}
					showBack={Boolean(showAirQualityMetric)}
					onBackPress={() => setShowAirQualityMetric(null)}
					onClose={() => onClose?.()}
				/>
				<ScrollView className="flex-1" contentContainerClassName="px-4 pb-4" showsVerticalScrollIndicator={false}>
					{modalContent}
				</ScrollView>
			</View>
		);
	}

	return (
		<StyledModal
			visible={visible}
			airQualityModal={!showAirQualityMetric}
			goBackHeader={Boolean(showAirQualityMetric)}
			goBackOnPress={() => setShowAirQualityMetric(null)}
			icon={icon}
			header={header}
			onClose={() => onClose?.()}
		>
			{modalContent}
		</StyledModal>
	);
};

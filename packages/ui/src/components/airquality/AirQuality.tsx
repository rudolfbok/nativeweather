import { useTranslate } from '@tolgee/react';
import EUAQIScale from '@nativeweather/ui/assets/euaqiscale.png';
import USAQIScale from '@nativeweather/ui/assets/usaqiscale.png';
import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { CardHeader } from '@nativeweather/ui/components/common/layout/CardHeader';
import { AirQualityIcon } from '@nativeweather/ui/components/icons/main/AirQualityIcon';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { SolitoImage } from 'solito/image';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { AirQualityModal } from './AirQualityModal';
import { border } from '@nativeweather/core/constants/border';

export const AirQuality = ({ className }: { className?: string }) => {
	const airQualityData = useWeather((state) => state.airQualityData);
	const { t } = useTranslate('weather');
	const [currentAQI] = useStorageString('currentAQI');
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToAirQuality = useModalNavigation({
		mobile: () => router.push('/modals/airquality'),
		macos: () => setModalScreen('airquality'),
		web: () => setShowModal((showModal) => !showModal),
	});

	const aq = airQualityData?.current;

	const euAQIranges = [
		{ min: 0, max: 20, band: t('airquality.euaqi.value.0') },
		{ min: 20, max: 40, band: t('airquality.euaqi.value.1') },
		{ min: 40, max: 60, band: t('airquality.euaqi.value.2') },
		{ min: 60, max: 80, band: t('airquality.euaqi.value.3') },
		{ min: 80, max: 100, band: t('airquality.euaqi.value.4') },
		{ min: 100, max: Infinity, band: t('airquality.euaqi.value.5') },
	];

	const euBanding = aq ? (euAQIranges.find((range) => aq.european_aqi < range.max)?.band ?? '') : '';

	const usAQIranges = [
		{ min: 0, max: 50, band: t('airquality.usaqi.value.0') },
		{ min: 50, max: 100, band: t('airquality.usaqi.value.1') },
		{ min: 100, max: 150, band: t('airquality.usaqi.value.2') },
		{ min: 150, max: 200, band: t('airquality.usaqi.value.3') },
		{ min: 200, max: 300, band: t('airquality.usaqi.value.4') },
		{ min: 300, max: Infinity, band: t('airquality.usaqi.value.5') },
	];

	const usBanding = aq ? (usAQIranges.find((range) => aq.us_aqi < range.max)?.band ?? '') : '';

	return (
		<>
			<StyledPressable
				onPress={navigateToAirQuality}
				className={clsx('col-span-3 gap-2 gap-4 overflow-hidden rounded-3xl p-4', border, className)}
			>
				<CardHeader icon={<AirQualityIcon />} header={t('airquality.title')} />
				<View className={clsx('native:my-2 w-full')}>
					<Text
						className={clsx('text-label dark:text-label_dark absolute -top-[13px] z-10 text-xl font-bold')}
						style={{
							left: aq ? `${Math.min(currentAQI === 'EU' ? aq.european_aqi : (aq.us_aqi / 300) * 100, 100)}%` : '0%',
							zIndex: 20,
						}}
					>
						|
					</Text>
					<View className={clsx('h-[3px] w-full')}>
						<SolitoImage
							alt="Air quality scale"
							src={currentAQI === 'EU' ? EUAQIScale : USAQIScale}
							fill
							style={{ objectFit: 'fill' }}
							contentFit="fill"
						/>
					</View>
				</View>
				<View className={clsx('flex-row items-center justify-between')}>
					<StyledText type="sectiontitle">
						{aq
							? `${currentAQI === 'EU' ? aq.european_aqi : aq.us_aqi} - ${currentAQI === 'EU' ? euBanding : usBanding}`
							: 'Loading...'}
					</StyledText>
					<StyledText type="body">{currentAQI === 'EU' ? 'EUAQI' : 'USAQI'}</StyledText>
				</View>
			</StyledPressable>
			{showModal && (
				<AirQualityModal visible={showModal} airQualityData={airQualityData} onClose={() => setShowModal(false)} />
			)}
		</>
	);
};

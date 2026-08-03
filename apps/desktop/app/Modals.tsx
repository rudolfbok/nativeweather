import { useTolgee, useTranslate } from '@tolgee/react';
import { CloudsModal } from 'app/components/cards/clouds/CloudsModal';
import { HumidityModal } from 'app/components/cards/humidity/HumidityModal';
import { MoonModal } from 'app/components/cards/moon/MoonModal';
import { PressureModal } from 'app/components/cards/pressure/PressureModal';
import { RainModal } from 'app/components/cards/rain/RainModal';
import { RangeModal } from 'app/components/cards/range/RangeModal';
import { SnowModal } from 'app/components/cards/snow/SnowModal';
import { SunriseModal } from 'app/components/cards/sunrise/SunriseModal';
import { SunsetModal } from 'app/components/cards/sunset/SunsetModal';
import { UVModal } from 'app/components/cards/uv/UVModal';
import { WindModal } from 'app/components/cards/wind/WindModal';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { AlertIcon } from 'app/components/icons/main/AlertIcon';
import { CloudsIcon } from 'app/components/icons/main/CloudsIcon';
import { HumidityIcon } from 'app/components/icons/main/HumidityIcon';
import { MoonIcon } from 'app/components/icons/main/MoonIcon';
import { PressureIcon } from 'app/components/icons/main/PressureIcon';
import { RainIcon } from 'app/components/icons/main/RainIcon';
import { RangeIcon } from 'app/components/icons/main/RangeIcon';
import { SnowIcon } from 'app/components/icons/main/SnowIcon';
import { SunriseIcon } from 'app/components/icons/main/SunriseIcon';
import { SunsetIcon } from 'app/components/icons/main/SunsetIcon';
import { UVIcon } from 'app/components/icons/main/UVIcon';
import { AirQualityModal } from 'app/components/weather/airquality/AirQualityModal';
import { AlertModal } from 'app/components/weather/alerts/AlertModal';
import { DailyForecastMain } from 'app/components/weather/daily/DailyForecastMain';
import { DaysToggle } from 'app/components/weather/daily/DaysToggle';
import { ModalScreen, useNavigationScreen } from 'app/hooks/useNavigation.macos';
import { useSelectedDay } from 'app/hooks/useSelectedDay';
import { useWeather } from 'app/hooks/useWeather';
import { WeatherAlert } from 'app/types/weatherAPI';
import { getAlerts } from 'app/utils/helpers/getAlerts';
import { getAlertSeverityDotColor } from 'app/utils/mappings/mapAlertSeverity';
import { Wind } from 'lucide-react-native';
import { ReactNode, useState } from 'react';

export const Modals = () => {
	const { t } = useTranslate('weather');
	const tolgee = useTolgee();
	const { modalScreen, setModalScreen } = useNavigationScreen();
	const { weatherData, airQualityData } = useWeather();
	const { selectedDay, setSelectedDay } = useSelectedDay();
	const [selectedAlert, setSelectedAlert] = useState<WeatherAlert | null>(null);
	const filteredAlerts = getAlerts(weatherData?.alerts.alert, weatherData?.location);
	const severityValues: Record<string, number> = { Unknown: 0, Minor: 1, Moderate: 2, Severe: 3, Extreme: 4 };
	const mostSevereAlert = filteredAlerts.reduce<WeatherAlert | null>((mostSevere, alert) => {
		if (!mostSevere || severityValues[alert.severity] > severityValues[mostSevere.severity]) {
			return alert;
		}

		return mostSevere;
	}, null);
	const closeModal = () => setModalScreen(null);

	if (modalScreen === 'airquality') {
		return airQualityData ? (
			<AirQualityModal visible={true} airQualityData={airQualityData} onClose={closeModal} />
		) : null;
	}

	if (modalScreen === 'alerts') {
		return (
			<StyledModal
				visible={true}
				icon={
					selectedAlert || !mostSevereAlert ? undefined : (
						<AlertIcon mostSevere={getAlertSeverityDotColor(mostSevereAlert.severity)} />
					)
				}
				header={selectedAlert ? selectedAlert.event : t('alerts.modaltitle')}
				goBackHeader={Boolean(selectedAlert)}
				goBackOnPress={() => setSelectedAlert(null)}
				onClose={() => {
					closeModal();
					setSelectedAlert(null);
				}}
			>
				<AlertModal onPress={setSelectedAlert} filteredAlerts={filteredAlerts} selectedAlert={selectedAlert} />
			</StyledModal>
		);
	}

	if (modalScreen === 'forecast') {
		if (!selectedDay) {
			return null;
		}

		return (
			<StyledModal
				visible={true}
				header={new Date(selectedDay.date).toLocaleString(tolgee.getLanguage(), { weekday: 'long' })}
				subHeader={new Date(selectedDay.date).toLocaleDateString(tolgee.getLanguage(), {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				})}
				onClose={() => {
					closeModal();
					setSelectedDay(null);
				}}
				daysToggle={<DaysToggle days={weatherData.forecast.forecastday} onSelectDay={setSelectedDay} />}
			>
				<DailyForecastMain day={selectedDay} />
			</StyledModal>
		);
	}

	const modals: Record<
		Exclude<ModalScreen, 'airquality' | 'alerts' | 'forecast' | null>,
		{ icon: ReactNode; header: string; content: ReactNode }
	> = {
		clouds: { icon: <CloudsIcon />, header: t('cloudcover.title'), content: <CloudsModal /> },
		humidity: { icon: <HumidityIcon />, header: t('humidity.title'), content: <HumidityModal /> },
		moon: { icon: <MoonIcon />, header: t('moon.title'), content: <MoonModal /> },
		pressure: { icon: <PressureIcon />, header: t('pressure.title'), content: <PressureModal /> },
		rain: { icon: <RainIcon />, header: t('rain.title'), content: <RainModal /> },
		range: { icon: <RangeIcon />, header: t('range.title'), content: <RangeModal /> },
		snow: { icon: <SnowIcon />, header: t('snow.title'), content: <SnowModal /> },
		sunrise: { icon: <SunriseIcon />, header: t('sunrise.title'), content: <SunriseModal /> },
		sunset: { icon: <SunsetIcon />, header: t('sunset.title'), content: <SunsetModal /> },
		uv: { icon: <UVIcon />, header: 'UV Index', content: <UVModal /> },
		wind: { icon: <Wind color="gray" />, header: t('wind.title'), content: <WindModal /> },
	};
	const modal = modalScreen ? modals[modalScreen] : null;

	if (!modal) {
		return null;
	}

	return (
		<StyledModal visible={true} icon={modal.icon} header={modal.header} onClose={() => setModalScreen(null)}>
			{modal.content}
		</StyledModal>
	);
};

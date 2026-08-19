import { useTolgee, useTranslate } from '@tolgee/react';
import {
	CloudsModal,
	HumidityModal,
	MoonModal,
	PressureModal,
	RainModal,
	RangeModal,
	SnowModal,
	SunriseModal,
	SunsetModal,
	UVModal,
	WindModal,
} from 'app/components/cards';
import {
	AlertIcon,
	CloudsIcon,
	HumidityIcon,
	MoonIcon,
	PressureIcon,
	RainIcon,
	RangeIcon,
	SnowIcon,
	SunriseIcon,
	SunsetIcon,
	UVIcon,
	WindIcon,
} from 'app/components/icons/main';
import { ModalHeader } from 'app/components/common/modal/ModalHeader';
import { AirQualityModal } from 'app/components/airquality/AirQualityModal';
import { AlertModal } from 'app/components/alerts/AlertModal';
import { DailyForecastMain } from 'app/components/weather/daily/DailyForecastMain';
import { DaysToggle } from 'app/components/weather/daily/DaysToggle';
import { ModalScreen, useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useSelectedDay } from 'app/hooks/weather/useSelectedDay';
import { useWeather } from 'app/hooks/weather/useWeather';
import { WeatherAlert } from 'app/types/weatherAPI';
import { getAlerts } from 'app/utils/alertFilters';
import { getAlertSeverityDotColor } from 'app/utils/mappings/alertSeverity';
import { ReactNode, useState } from 'react';
import { GestureResponderEvent, ScrollView, View } from 'react-native';

const ModalContent = ({
	children,
	daysToggle,
	goBackHeader,
	goBackOnPress,
	...headerProps
}: {
	children: ReactNode;
	icon?: ReactNode;
	header: string;
	subHeader?: ReactNode;
	daysToggle?: ReactNode;
	onClose: (event: GestureResponderEvent) => void;
	goBackHeader?: boolean;
	goBackOnPress?: (event: GestureResponderEvent) => void;
}) => (
	<View className="w-full flex-1 pt-4 xl:px-24 2xl:px-56">
		<ModalHeader {...headerProps} daysToggle={daysToggle} showBack={goBackHeader} onBackPress={goBackOnPress} />
		<ScrollView className="flex-1" contentContainerClassName="px-4 pb-4" showsVerticalScrollIndicator={true}>
			{children}
		</ScrollView>
	</View>
);

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
		return airQualityData ? <AirQualityModal airQualityData={airQualityData} onClose={closeModal} /> : null;
	}

	if (modalScreen === 'alerts') {
		return (
			<ModalContent
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
			</ModalContent>
		);
	}

	if (modalScreen === 'forecast') {
		if (!selectedDay) {
			return null;
		}

		return (
			<ModalContent
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
			</ModalContent>
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
		wind: { icon: <WindIcon />, header: t('wind.title'), content: <WindModal /> },
	};
	const modal = modalScreen ? modals[modalScreen] : null;

	if (!modal) {
		return null;
	}

	return (
		<ModalContent icon={modal.icon} header={modal.header} onClose={() => setModalScreen(null)}>
			{modal.content}
		</ModalContent>
	);
};

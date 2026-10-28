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
} from '@nativeweather/ui/components/cards';
import {
	AlertIcon,
	CloudsIcon,
	HumidityIcon,
	MapIcon,
	MoonIcon,
	PressureIcon,
	RainIcon,
	RangeIcon,
	SnowIcon,
	SunriseIcon,
	SunsetIcon,
	UVIcon,
	WindIcon,
} from '@nativeweather/ui/components/icons/main';
import { ModalHeader } from '@nativeweather/ui/components/common/modal/ModalHeader';
import { AirQualityModal } from '@nativeweather/ui/components/airquality/AirQualityModal';
import { AlertModal } from '@nativeweather/ui/components/alerts/AlertModal';
import { AQISelect } from '@nativeweather/ui/components/settings/selectors/AQISelect';
import { LanguageSelect } from '@nativeweather/ui/components/settings/selectors/LanguageSelect';
import { TemperatureSelect } from '@nativeweather/ui/components/settings/selectors/TemperatureSelect';
import { ThemeSelect } from '@nativeweather/ui/components/settings/selectors/ThemeSelect';
import { UnitsSelect } from '@nativeweather/ui/components/settings/selectors/UnitsSelect';
import { MapLibreView } from '@nativeweather/ui/components/maps/views/MapLibreView';
import { AboutFeature } from '@nativeweather/ui/features/about/screen';
import { FeedbackFeature } from '@nativeweather/ui/features/feedback/screen';
import { DailyForecastMain } from '@nativeweather/ui/components/weather/daily/DailyForecastMain';
import { DaysToggle } from '@nativeweather/ui/components/weather/daily/DaysToggle';
import {
	ModalScreen,
	SettingsModalScreen,
	useNavigationScreen,
} from '@nativeweather/ui/hooks/navigation/useNavigation.macos';
import { useSelectedDay } from '@nativeweather/ui/hooks/weather/useSelectedDay';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import type { WeatherAlert } from '@nativeweather/types/weatherAPI';
import { getAlerts } from '@nativeweather/core/utils/alertFilters';
import { getAlertSeverityDotColor } from '@nativeweather/core/utils/mappings/alertSeverity';
import { clsx } from 'clsx';
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
	<View className="w-full flex-1 pt-4">
		<ModalHeader {...headerProps} daysToggle={daysToggle} showBack={goBackHeader} onBackPress={goBackOnPress} />
		<ScrollView
			className={clsx('flex-1')}
			contentContainerClassName={clsx('px-4 pb-4')}
			alwaysBounceVertical={false}
			showsVerticalScrollIndicator={true}
		>
			{children}
		</ScrollView>
	</View>
);

export const Modals = () => {
	const { t } = useTranslate('weather');
	const { t: settingsT } = useTranslate('settings');
	const tolgee = useTolgee();
	const { modalScreen, modalDate, setModalScreen } = useNavigationScreen();
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
			>
				<DaysToggle days={weatherData.forecast.forecastday} onSelectDay={setSelectedDay} />
				<DailyForecastMain day={selectedDay} />
			</ModalContent>
		);
	}

	if (modalScreen === 'maps') {
		return (
			<View className="w-full flex-1 py-4">
				<ModalHeader icon={<MapIcon />} header={t('maps.title')} onClose={closeModal} />
				<View className="flex-grow px-4">
					<MapLibreView showCompass={true} />
				</View>
			</View>
		);
	}

	const settingsModals: Record<SettingsModalScreen, { header: string; content: ReactNode }> = {
		theme: { header: settingsT('theme.title'), content: <ThemeSelect /> },
		language: { header: settingsT('language.title'), content: <LanguageSelect /> },
		temperature: { header: settingsT('temperature'), content: <TemperatureSelect /> },
		units: { header: settingsT('units.title'), content: <UnitsSelect /> },
		'settings-aqi': { header: settingsT('airquality.titlefull'), content: <AQISelect /> },
		about: { header: settingsT('about.title'), content: <AboutFeature /> },
		feedback: { header: settingsT('feedback.title'), content: <FeedbackFeature /> },
	};
	const settingsModal = modalScreen ? settingsModals[modalScreen as SettingsModalScreen] : null;

	if (settingsModal) {
		return (
			<ModalContent header={settingsModal.header} onClose={closeModal}>
				{settingsModal.content}
			</ModalContent>
		);
	}

	const modals: Record<
		Exclude<ModalScreen, SettingsModalScreen | 'airquality' | 'alerts' | 'forecast' | 'maps' | null>,
		{ icon: ReactNode; header: string; content: ReactNode }
	> = {
		clouds: { icon: <CloudsIcon />, header: t('cloudcover.title'), content: <CloudsModal /> },
		humidity: {
			icon: <HumidityIcon />,
			header: t('humidity.title'),
			content: <HumidityModal initialDate={modalDate} />,
		},
		moon: { icon: <MoonIcon />, header: t('moon.title'), content: <MoonModal /> },
		pressure: {
			icon: <PressureIcon />,
			header: t('pressure.title'),
			content: <PressureModal initialDate={modalDate} />,
		},
		rain: { icon: <RainIcon />, header: t('rain.title'), content: <RainModal initialDate={modalDate} /> },
		range: { icon: <RangeIcon />, header: t('range.title'), content: <RangeModal /> },
		snow: { icon: <SnowIcon />, header: t('snow.title'), content: <SnowModal initialDate={modalDate} /> },
		sunrise: { icon: <SunriseIcon />, header: t('sunrise.title'), content: <SunriseModal /> },
		sunset: { icon: <SunsetIcon />, header: t('sunset.title'), content: <SunsetModal /> },
		uv: { icon: <UVIcon />, header: 'UV Index', content: <UVModal initialDate={modalDate} /> },
		wind: { icon: <WindIcon />, header: t('wind.title'), content: <WindModal initialDate={modalDate} /> },
	};
	const modal = modalScreen ? modals[modalScreen as keyof typeof modals] : null;

	if (!modal) {
		return null;
	}

	return (
		<ModalContent
			icon={modal.icon}
			header={modal.header}
			goBackHeader={Boolean(modalDate)}
			goBackOnPress={() => setModalScreen('forecast')}
			onClose={() => setModalScreen(null)}
		>
			{modal.content}
		</ModalContent>
	);
};

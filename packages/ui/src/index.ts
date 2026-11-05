// Primitives
export { Button } from './components/common/Button';
export type { ButtonProps } from './components/common/Button';
export { Pressable } from './components/common/Pressable';
export type { PressableProps } from './components/common/Pressable';
export { Separator } from './components/common/Separator';
export { Switch } from './components/common/Switch';
export { Text } from './components/common/Text';
export type { TextProps, TextType } from './components/common/Text';

// Layout
export { CardHeader } from './components/common/CardHeader';
export { ContentRow } from './components/common/ContentRow';
export { RoundView } from './components/common/RoundView';
export { ScreenWrapper } from './components/common/ScreenWrapper';

// Loading
export { CardSkeleton } from './components/common/CardSkeleton';
export { Skeleton } from './components/common/Skeleton';

// Modals
export { ModalHeader } from './components/common/ModalHeader';
export type { ModalHeaderProps } from './components/common/ModalHeader';
export { ModalScreen } from './components/common/ModalScreen';
export { ValuesList } from './components/common/ValuesList';
export type { ValueItem } from './components/common/ValuesList';

// Toasts
export type { ToastData, ToastType } from './components/common/NotificationToast';
export { Toaster, showToast } from './components/common/Toaster';

// Metric cards and modals
export { MetricCards } from './components/metrics/MetricCards';
export { isMetricId, metricDefinitions } from './components/metrics/registry';
export type { MetricId } from './components/metrics/registry';

// Alerts
export { AlertDetail } from './components/alerts/AlertDetail';
export { AlertList } from './components/alerts/AlertList';
export { AlertsCard } from './components/alerts/AlertsCard';
export { SeverityDot } from './components/alerts/SeverityDot';

// Air quality
export { AirQualityCard } from './components/airquality/AirQualityCard';
export { AirQualityGrid } from './components/airquality/AirQualityGrid';
export { PollutantDetail } from './components/airquality/PollutantDetail';
export { isPollutant, pollutants } from './components/airquality/pollutants';

// Weather
export { DailyForecast } from './components/weather/daily/DailyForecast';
export { DayForecast } from './components/weather/daily/DayForecast';
export { DaysToggle } from './components/weather/daily/DaysToggle';
export { HourlyCarousel } from './components/weather/hourly/HourlyCarousel';
export { HourlyForecast } from './components/weather/hourly/HourlyForecast';
export { HourlyItem } from './components/weather/hourly/HourlyItem';
export { MainWeather } from './components/weather/MainWeather';
export { SmartSummary } from './components/weather/SmartSummary';
export { WeatherChart } from './components/weather/WeatherChart';

// Weather artwork
export { WeatherIcon } from './utils/mappings/weatherIcons';
export { WeatherLandscape } from './utils/mappings/landscapes';

// Metric icons (fixed-colour badges)
export { AirQualityIcon } from './components/icons/main/AirQualityIcon';
export { CalendarIcon } from './components/icons/main/CalendarIcon';
export { ClockIcon } from './components/icons/main/ClockIcon';
export { HumidityIcon } from './components/icons/main/HumidityIcon';
export { MapIcon } from './components/icons/main/MapIcon';
export { PressureIcon } from './components/icons/main/PressureIcon';
export { RangeIcon } from './components/icons/main/RangeIcon';
export { SmartSummaryIcon } from './components/icons/main/SmartSummaryIcon';
export { SunriseIcon } from './components/icons/main/SunriseIcon';
export { SunsetIcon } from './components/icons/main/SunsetIcon';

// UI icons (EditIcon and WindArrowIcon take colorClassName, e.g. "accent-label")
export { ArrowDownIcon } from './components/icons/ui/ArrowDownIcon';
export { ArrowUpIcon } from './components/icons/ui/ArrowUpIcon';
export { DotIndicator } from './components/icons/ui/DotIndicator';
export { EditIcon } from './components/icons/ui/EditIcon';
export { WindArrowIcon } from './components/icons/ui/WindArrowIcon';
export { WindDirectionIcon } from './components/icons/ui/WindDirectionIcon';

// Moon phases
export { FirstQuarter } from './components/icons/moonphases/FirstQuarter';
export { FullMoon } from './components/icons/moonphases/FullMoon';
export { LastQuarter } from './components/icons/moonphases/LastQuarter';
export { NewMoon } from './components/icons/moonphases/NewMoon';
export { WaningCrescent } from './components/icons/moonphases/WaningCrescent';
export { WaningGibbous } from './components/icons/moonphases/WaningGibbous';
export { WaxingCrescent } from './components/icons/moonphases/WaxingCrescent';
export { WaxingGibbous } from './components/icons/moonphases/WaxingGibbous';

// Colour mappings
export { getLandscapeColor } from './utils/mappings/landscapeColors';
export { levelBgClass, levelTextClass } from './utils/mappings/levelClasses';

// Primitives
export { Button } from './components/common/Button';
export { Text } from './components/common/Text';

// Layout
export { DesktopShell } from './components/layout/DesktopShell';
export { DesktopSidebar, useStartupCitySettled } from './components/layout/DesktopSidebar';
export { WebShell } from './components/layout/WebShell';
export { ScreenWrapper } from './components/common/ScreenWrapper';
export { StatusView } from './components/common/StatusView';

// Modals
export { ModalScreen } from './components/common/ModalScreen';

// Toasts
export { Toaster, showToast } from './components/common/Toaster';

// Metric cards and modals
export { isMetricId, metricDefinitions } from './components/metrics/registry';

// Settings
export { AboutContent } from './components/settings/AboutContent';
export { FeedbackForm } from './components/settings/FeedbackForm';
export { OptionList } from './components/settings/OptionList';
export { getSettingOption, isSettingOptionKey } from './components/settings/options';
export type { SettingOptionKey } from './components/settings/options';
export { SettingsList } from './components/settings/SettingsList';
export { shareWeather } from './utils/shareWeather';

// Home and search
export { CityList } from './components/search/CityList';
export { FavoriteCities } from './components/home/FavoriteCities';
export { FavoriteStar } from './components/home/FavoriteStar';
export { HeaderSearch } from './components/search/HeaderSearch';
export { CityHeaderButtons } from './components/weather/CityHeaderButtons';
export { HeroSkeleton, WeatherHero } from './components/weather/WeatherHero';
export { ShareButton } from './components/home/ShareButton';
export { LocalWeather } from './components/home/LocalWeather';
export { SearchField } from './components/search/SearchField';
export { SuggestedCities } from './components/search/SuggestedCities';
export { NativeWeatherLogo } from './components/icons/logos/NativeWeatherLogo';


// Alerts
export { AlertDetail } from './components/alerts/AlertDetail';
export { AlertList } from './components/alerts/AlertList';
export { SeverityDot } from './components/alerts/SeverityDot';

// Air quality
export { AirQualityGrid } from './components/airquality/AirQualityGrid';
export { PollutantDetail } from './components/airquality/PollutantDetail';
export { isPollutant, pollutants } from './components/airquality/pollutants';

// Weather
export { DayForecast } from './components/weather/daily/DayForecast';
export { DaysToggle } from './components/weather/daily/DaysToggle';

// Metric icons (fixed-colour badges)
export { AirQualityIcon } from './components/icons/main/AirQualityIcon';
export { MapIcon } from './components/icons/main/MapIcon';

// Colour mappings
export { getLandscapeColor } from './utils/mappings/landscapeColors';

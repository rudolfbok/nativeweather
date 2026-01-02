"use client";

import {
  HumidityCard,
  MoonCard,
  PressureCard,
  RainCard,
  SnowCard,
  SunriseCard,
  SunsetCard,
  UVIndexCard,
  VisibilityCard,
  WindCard,
} from "app/components/cards";
import { LoadingIndicator } from "app/components/common/LoadingIndicator";
import { AirQuality } from "app/components/weather/airquality/AirQuality";
import { AlertWeather } from "app/components/weather/alerts/AlertWeather";
import { DailyForecast } from "app/components/weather/daily/DailyForecast";
import { MainWeather } from "app/components/weather/MainWeather";
import { SmartSummary } from "app/components/weather/SmartSummary";
import { useFavoriteCities } from "app/hooks/useFavoriteCities";
import { useWeather } from "app/hooks/useWeather";
import { isCityInFavorites } from "app/storage/crudMMKVService";
import { WeatherAlert } from "app/types/weatherAlert";
import { cityFromWeather } from "app/utils/helpers/cityFromWeather";
import { useWeatherConditions } from "app/utils/mappings/mapConditions";
import { clsx } from "clsx";
import { Star } from "lucide-react-native";
import { useEffect } from "react";
import { Platform, Pressable, View } from "react-native";
import { CloudsCard } from "../cards/CloudsCard";
import { MapsView } from "./maps/MapsView.web";
import { HourlyForecast } from "./hourly/HourlyForecast";

export const HeroWeather = () => {
  const { weatherData } = useWeather();
  const { handleFavoriteToggle, isFavorite, setIsFavorite } =
    useFavoriteCities();
  const getWeatherByCode = useWeatherConditions();

  useEffect(() => {
    if (!weatherData) return;

    const city = cityFromWeather(weatherData);
    setIsFavorite(isCityInFavorites(city));
  }, [weatherData]);

  const getHour24FromEpoch = (epochTime: number, timezone: string) => {
    const date = new Date(epochTime * 1000);
    return parseInt(
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        hour12: false,
        timeZone: timezone,
      }).format(date),
      10
    );
  };

  const tzId = weatherData.location.tz_id || "UTC";

  const now = new Date();
  const currentHour24 = parseInt(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: tzId,
    }).format(now),
    10
  );

  if (!weatherData) {
    return <LoadingIndicator text="Weather is loading" />;
  }

  const currentIndex = weatherData.forecast.forecastday[0].hour.findIndex(
    (hour) => getHour24FromEpoch(hour.time_epoch, tzId) === currentHour24
  );

  const currentRainChance =
    weatherData.forecast.forecastday[0].hour[currentIndex].chance_of_rain;
  const currentSnowChance =
    weatherData.forecast.forecastday[0].hour[currentIndex].chance_of_snow;
  const currentSnowPrecipCm =
    weatherData.forecast.forecastday[0].hour[currentIndex].snow_cm;
  const currentSnowPrecipIn = (currentSnowPrecipCm * 0.393701).toFixed(2);

  const filteredAlerts: WeatherAlert[] = weatherData.alerts.alert.filter(
    (alert, index, self) =>
      index === self.findIndex((a) => a.msgtype === "Alert")
  );

  const alertsLength = filteredAlerts.length ?? 0;

  const DataCardGrid = () => {
    return (
      <>
        {currentSnowChance > currentRainChance ? (
          <SnowCard
            snowChance={currentSnowChance}
            snowPrecipCm={currentSnowPrecipCm}
            snowPrecipIn={Number(currentSnowPrecipIn)}
          />
        ) : (
          <RainCard
            rainChance={currentRainChance}
            rainPrecipMm={weatherData.current.precip_mm}
            rainPrecipIn={weatherData.current.precip_in}
          />
        )}
        <WindCard
          windKm={Math.round(weatherData.current.wind_kph)}
          windMil={Math.round(weatherData.current.wind_mph)}
          gustKm={Math.round(weatherData.current.gust_kph)}
          gustMil={Math.round(weatherData.current.gust_mph)}
          dir={weatherData.current.wind_dir}
          degree={weatherData.current.wind_degree}
          details={true}
          currentWind={true}
        />
        <UVIndexCard data={weatherData.current.uv} />
        <VisibilityCard
          visKm={weatherData.current.vis_km}
          visMiles={weatherData.current.vis_miles}
        />
        <HumidityCard
          data={weatherData.current.humidity}
          dewPoint={true}
          dewPointC={weatherData.current.dewpoint_c}
          dewPointF={weatherData.current.dewpoint_f}
        />
        <PressureCard
          pressureMb={weatherData.current.pressure_mb}
          pressureIn={weatherData.current.pressure_in}
        />
        <SunriseCard
          data={weatherData.forecast.forecastday[0]?.astro.sunrise}
        />
        <SunsetCard data={weatherData.forecast.forecastday[0]?.astro.sunset} />
        <CloudsCard data={weatherData.current.cloud} />
        <MoonCard
          phase={weatherData.forecast.forecastday[0].astro.moon_phase}
          illumination={
            weatherData.forecast.forecastday[0].astro.moon_illumination
          }
          isMoonUp={weatherData.forecast.forecastday[0].astro.is_moon_up}
          moonrise={weatherData.forecast.forecastday[0].astro.moonrise ?? ""}
          moonset={weatherData.forecast.forecastday[0].astro.moonset ?? ""}
        />
      </>
    );
  };

  return (
    <View className={clsx("ios:px-4 pb-4")}>
      <View
        className={clsx(
          "grid select-none grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        )}
      >
        <View className={clsx("flex-col gap-4")}>
          <View>
            <View>
              <MainWeather
                name={weatherData.location.name}
                country={weatherData.location.country}
                currentTempC={weatherData.current.temp_c}
                currentTempF={weatherData.current.temp_f}
                feelsLikeC={weatherData.current.feelslike_c}
                feelsLikeF={weatherData.current.feelslike_f}
                maxTempC={weatherData.forecast.forecastday[0]?.day.maxtemp_c}
                maxTempF={weatherData.forecast.forecastday[0]?.day.maxtemp_f}
                minTempC={weatherData.forecast.forecastday[0]?.day.mintemp_c}
                minTempF={weatherData.forecast.forecastday[0]?.day.mintemp_f}
                isDay={weatherData.current.is_day}
                code={weatherData.current.condition.code}
                feelslike={true}
                condition={getWeatherByCode(
                  weatherData.current.condition.code,
                  weatherData.current.is_day
                )}
                conditionbg={false}
                textcolor="!text-white"
                arrowcolor="white"
                displayTime={true}
                strokeWidth={0}
              />
              <Pressable
                onPress={() =>
                  handleFavoriteToggle(cityFromWeather(weatherData))
                }
                className={clsx("ios:hidden absolute bottom-0 right-0 lg:p-2")}
              >
                <Star
                  color="#FE9804"
                  fill={isFavorite ? "#FE9804" : "transparent"}
                  size={30}
                />
              </Pressable>
              <AlertWeather
                filteredAlerts={filteredAlerts}
                alertsLength={alertsLength}
                desktop="max-lg:hidden"
                mobile="hidden"
              />
            </View>
          </View>
          <AlertWeather
            filteredAlerts={filteredAlerts}
            alertsLength={alertsLength}
            desktop="hidden"
            mobile="lg:hidden"
          />

          <SmartSummary
            minTempC={weatherData.forecast.forecastday[0].day.mintemp_c}
            maxTempC={weatherData.forecast.forecastday[0].day.maxtemp_c}
            minTempF={weatherData.forecast.forecastday[0].day.mintemp_f}
            maxTempF={weatherData.forecast.forecastday[0].day.maxtemp_f}
            rainPrecipMm={
              weatherData.forecast.forecastday[0].day.totalprecip_mm
            }
            rainPrecipIn={
              weatherData.forecast.forecastday[0].day.totalprecip_in
            }
            snowPrecipCm={weatherData.forecast.forecastday[0].day.totalsnow_cm}
            snowPrecipIn={Number(
              (
                weatherData.forecast.forecastday[0].day.totalsnow_cm * 0.393701
              ).toFixed(2)
            )}
            cloudCover={weatherData.current.cloud}
          />
          <HourlyForecast />
          <AirQuality className={clsx("xl:hidden")} />
        </View>
        <View className={clsx("gap-4")}>
          <DailyForecast />
          {Platform.OS === "web" && <MapsView />}
        </View>
        <View
          className={clsx(
            "web:grid web:h-fit web:grid-cols-2 web:md:hidden web:xl:grid web:xl:grid-cols-3 flex flex-row flex-wrap justify-between gap-4"
          )}
        >
          <AirQuality className={clsx("max-xl:hidden")} />
          <DataCardGrid />
        </View>
      </View>
      <View
        className={clsx(
          "ios:hidden web:hidden mt-4 h-fit grid-cols-4 gap-4 md:grid xl:hidden"
        )}
      >
        <DataCardGrid />
      </View>
    </View>
  );
};

import { useTranslate } from "@tolgee/react";
import { fetchAirQuality } from "app/api/fetchAirQuality";
import EUAQIScale from "app/assets/euaqiscale.png";
import USAQIScale from "app/assets/usaqiscale.png";
import { CardHeader } from "app/components/common/CardHeader";
import { StyledPressable } from "app/components/common/StyledPressable";
import { StyledText } from "app/components/common/StyledText";
import { AirQualityIcon } from "app/components/icons/AirQualityIcon";
import { useWeather } from "app/hooks/useWeather";
import { useStorageString } from "app/storage/useStorageString";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SolitoImage } from "solito/image";
import { AirQualityModal } from "./AirQualityModal";
import { AirQualityData } from "app/types/airQualityData";

export const AirQuality = ({ className }: { className?: string }) => {
  const { weatherData } = useWeather();
  const { t } = useTranslate("weather");
  const [currentAQI] = useStorageString("currentAQI");
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );
  const [showAirQualityModal, setShowAirQualityModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aqdata = await fetchAirQuality(
          weatherData.location.lat,
          weatherData.location.lon
        );
        setAirQualityData(aqdata);
        console.log("Fetched AQI data", "city:");
      } catch (error) {
        console.error("Error fetching air quality data:", error);
      }
    };

    fetchData();
  }, [weatherData]);

  if (!airQualityData) {
    return null;
  }

  const euAQIranges = [
    { min: 0, max: 20, band: t("airquality.euaqi.value.0") },
    { min: 20, max: 40, band: t("airquality.euaqi.value.1") },
    { min: 40, max: 60, band: t("airquality.euaqi.value.2") },
    { min: 60, max: 80, band: t("airquality.euaqi.value.3") },
    { min: 80, max: 100, band: t("airquality.euaqi.value.4") },
    { min: 100, max: Infinity, band: t("airquality.euaqi.value.5") },
  ];

  const euBanding =
    euAQIranges.find(
      (range) => airQualityData!.current.european_aqi < range.max
    )?.band ?? "";

  const usAQIranges = [
    { min: 0, max: 50, band: t("airquality.usaqi.value.0") },
    { min: 50, max: 100, band: t("airquality.usaqi.value.1") },
    { min: 100, max: 150, band: t("airquality.usaqi.value.2") },
    { min: 150, max: 200, band: t("airquality.usaqi.value.3") },
    { min: 200, max: 300, band: t("airquality.usaqi.value.4") },
    { min: 300, max: Infinity, band: t("airquality.usaqi.value.5") },
  ];

  const usBanding =
    usAQIranges.find((range) => airQualityData!.current.us_aqi < range.max)
      ?.band ?? "";

  return (
    <>
      <StyledPressable
        onPress={() => setShowAirQualityModal((prev) => !prev)}
        className={clsx("col-span-3 flex gap-4 rounded-3xl p-4", className)}
      >
        <CardHeader icon={<AirQualityIcon />} header={t("airquality.title")} />
        <View className={clsx("ios:my-2 w-full")}>
          <Text
            className={clsx(
              "text-label dark:text-label_dark absolute -top-[13px] z-10 text-xl font-bold"
            )}
            style={{
              left: `${Math.min(currentAQI === "EU" ? airQualityData.current.european_aqi : (airQualityData.current.us_aqi / 300) * 100, 100)}%`,
              zIndex: 20,
            }}
          >
            |
          </Text>
          <View className={clsx("h-[3px] w-full")}>
            <SolitoImage
              alt="Air quality scale"
              src={currentAQI === "EU" ? EUAQIScale : USAQIScale}
              fill
              style={{ objectFit: "fill" }}
              contentFit="fill"
            />
          </View>
        </View>
        <View className={clsx("flex-row items-center justify-between")}>
          <StyledText type="subtitle">
            {currentAQI === "EU"
              ? airQualityData.current.european_aqi
              : airQualityData.current.us_aqi}{" "}
            - {currentAQI === "EU" ? euBanding : usBanding}
          </StyledText>
          <StyledText type="body">
            {currentAQI === "EU" ? "EUAQI" : "USAQI"}
          </StyledText>
        </View>
      </StyledPressable>
      {showAirQualityModal && (
        <AirQualityModal
          visible={showAirQualityModal}
          airQualityData={airQualityData}
          onClose={() => setShowAirQualityModal(false)}
        />
      )}
    </>
  );
};

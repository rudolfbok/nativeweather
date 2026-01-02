import { RoundView } from "app/components/common/RoundView";
import { StyledText } from "app/components/common/StyledText";
import { AQIButton } from "app/components/settings/items/AQIButton";
import { CompassButton } from "app/components/settings/items/CompassButton";
import { DataSourceButton } from "app/components/settings/items/DataSourceButton";
import { LanguageButton } from "app/components/settings/items/LanguageButton";
import { LocalWeatherToggle } from "app/components/settings/items/LocalWeatherToggle";
import { SendFeedbackButton } from "app/components/settings/items/SendFeedbackButton";
import { TemperatureButton } from "app/components/settings/items/TemperatureButton";
import { ThemeButton } from "app/components/settings/items/ThemeButton";
import { UnitsButton } from "app/components/settings/items/UnitsButton";
import { WorldTimeToggle } from "app/components/settings/items/WorldTimeToggle";
import { clsx } from "clsx";
import { View } from "react-native";

export function SettingsScreen({ title }: { title: string }) {
  return (
    <View className={clsx("px-4 pb-4")}>
      <StyledText type="screentitle" className={clsx("mb-3")}>
        {title}
      </StyledText>
      <View className={clsx("gap-4")}>
        <RoundView>
          <ThemeButton />
          <LanguageButton />
        </RoundView>
        <RoundView>
          <TemperatureButton />
          <UnitsButton />
          <AQIButton />
        </RoundView>
        <RoundView>
          <LocalWeatherToggle />
          <WorldTimeToggle />
        </RoundView>
        <RoundView>
          <CompassButton />
        </RoundView>
        <RoundView>
          <DataSourceButton />
          <SendFeedbackButton />
        </RoundView>
        <View className={clsx("flex items-center")}>
          <StyledText type="bodysecondary">NativeWeather</StyledText>
          <StyledText type="bodysecondary">Version: 1.0.0</StyledText>
          <StyledText type="bodysecondary">© 2026</StyledText>
        </View>
      </View>
    </View>
  );
}

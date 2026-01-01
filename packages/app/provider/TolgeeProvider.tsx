"use client";

import { Tolgee, TolgeeProvider as TolgeeReactProvider } from "@tolgee/react";
import { StyledText } from "app/components/common/StyledText";
import CommonCS from "app/locales/common/cs-CZ.json";
import CommonEN from "app/locales/common/en-US.json";
import SettingsCS from "app/locales/settings/cs-CZ.json";
import SettingsEN from "app/locales/settings/en-US.json";
import WeatherCS from "app/locales/weather/cs-CZ.json";
import WeatherEN from "app/locales/weather/en-US.json";
import { useStorageString } from "app/storage/useStorageString";
import { ReactNode, useEffect, useMemo, useState } from "react";

export const TolgeeProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [currentLang] = useStorageString("currentLang");

  useEffect(() => {
    setMounted(true);
  }, []);

  const tolgee = useMemo(() => {
    if (!mounted) return null;

    return Tolgee().init({
      language: currentLang || "en-US",
      availableLanguages: ["en-US", "cs-CZ"],
      staticData: {
        "en-US:common": CommonEN,
        "cs-CZ:common": CommonCS,
        "en-US:weather": WeatherEN,
        "cs-CZ:weather": WeatherCS,
        "en-US:settings": SettingsEN,
        "cs-CZ:settings": SettingsCS,
      },
    });
  }, [mounted, currentLang]);

  if (!mounted || !tolgee) {
    return null; // nebo splash
  }

  return <TolgeeReactProvider tolgee={tolgee}>{children}</TolgeeReactProvider>;
};

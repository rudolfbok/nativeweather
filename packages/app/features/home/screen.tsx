import { Header } from "app/components/common/Header";
import { FavoriteCities } from "app/components/weather/favorites/FavoriteCities";
import { LocalWeather } from "app/components/weather/local/LocalWeather";
import { useFavoriteCities } from "app/hooks/useFavoriteCities";
import { useStorageBoolean } from "app/storage/useStorageBoolean";
import { clsx } from "clsx";
import { useState } from "react";
import { Platform, RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [showLocalWeather] = useStorageBoolean("showLocalWeather");
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const favoriteCitiesHook = useFavoriteCities();

  return (
    <View className={clsx("flex-1")}>
      {Platform.OS === "ios" && <Header />}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // contentContainerStyle={{ paddingBottom: 16 }}
        contentContainerClassName={clsx("px-4 pb-4")}
        refreshControl={
          <RefreshControl
            tintColor="blue"
            refreshing={refreshing}
            onRefresh={() =>
              favoriteCitiesHook.refreshFavoriteCities({
                displayToast: true,
                setRefreshing,
              })
            }
            progressViewOffset={insets.top + 100}
            style={{ zIndex: 100 }}
          />
        }
      >
        <View className={clsx("gap-4")}>
          {showLocalWeather && <LocalWeather />}
          <FavoriteCities hook={favoriteCitiesHook} />
        </View>
      </ScrollView>
    </View>
  );
}

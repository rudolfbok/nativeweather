import { Button } from "@nativeweather/ui";
import { useSyncExternalStore } from "react";
import { Platform, Text, View } from "react-native";
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({ id: "nativeweather-web-smoke" });
const counterKey = "migration.smoke.counter";

export default function HomeScreen() {
  const counter = useSyncExternalStore(
    (onChange) => {
      const listener = storage.addOnValueChangedListener((key) => {
        if (key === counterKey) onChange();
      });
      return () => listener.remove();
    },
    () => storage.getNumber(counterKey) ?? 0,
    // Static rendering must not read browser LocalStorage.
    () => 0,
  );

  function increment() {
    const next = (storage.getNumber(counterKey) ?? 0) + 1;
    storage.set(counterKey, next);
  }

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-system-background px-6">
      <Text className="text-xl font-semibold text-label">
        MMKV persistence experiment
      </Text>
      <Text className="text-base text-label">Platform: {Platform.OS}</Text>
      <Text className="text-base text-label">
        Counter: {counter}
      </Text>
      <Button onPress={increment}>
        Increment
      </Button>
      {Platform.OS === "web" && (
        <Text className="text-center text-base text-label">
          Inspect Chrome DevTools → Application → Local Storage for this origin.
          If LocalStorage is unavailable, MMKV falls back to non-persistent memory.
        </Text>
      )}
    </View>
  );
}

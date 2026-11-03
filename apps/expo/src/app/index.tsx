import { Button } from "@nativeweather/ui";
import { Switch, Text, View } from "react-native";
import { Uniwind, useUniwind } from "uniwind";

export default function HomeScreen() {
  const { theme } = useUniwind();
  const isDark = theme === "dark";

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-system-background px-6">
      <View className="w-full max-w-sm flex-row items-center justify-between rounded-xl bg-secondary-system-background p-4">
        <Text className="text-base font-medium text-label">Dark mode</Text>
        <Switch
          accessibilityLabel="Dark mode"
          value={isDark}
          onValueChange={(enabled) =>
            Uniwind.setTheme(enabled ? "dark" : "light")
          }
        />
      </View>
      <Button>Go backwards</Button>
    </View>
  );
}

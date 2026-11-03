import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { Button } from "@nativeweather/ui";

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 flex-row items-center justify-center">
      <SafeAreaView
        className="flex-1 items-center gap-4 px-6"
        style={{
          maxWidth: MaxContentWidth,
          paddingBottom: BottomTabInset + Spacing.three,
        }}
      >
        <Button onPress={() => undefined} className="bg-emerald-600">
          Continue
        </Button>
      </SafeAreaView>
    </ThemedView>
  );
}

import { ActivityIndicator, View } from 'react-native';
import Animated, { type SharedValue, useAnimatedStyle } from 'react-native-reanimated';

const Spoke = ({ index, progress }: { index: number; progress: SharedValue<number> }) => {
	const style = useAnimatedStyle(() => ({
		opacity: Math.min(Math.max(progress.value * 12 - index, 0), 1),
	}));

	return (
		<Animated.View className="absolute inset-0" style={[{ transform: [{ rotate: `${index * 30}deg` }] }, style]}>
			<View className="absolute left-[16.5px] top-0 h-[9px] w-[3px] rounded-full bg-white" />
		</Animated.View>
	);
};

export const WeatherPullIndicator = ({
	progress,
	refreshing,
}: {
	progress: SharedValue<number>;
	refreshing: SharedValue<number>;
}) => {
	const spokesStyle = useAnimatedStyle(() => ({ opacity: 1 - refreshing.value }));
	const spinnerStyle = useAnimatedStyle(() => ({ opacity: refreshing.value }));

	return (
		<View className="h-9 w-9" accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants">
			<Animated.View className="absolute inset-0" style={spokesStyle}>
				{Array.from({ length: 12 }, (_, index) => (
					<Spoke key={index} index={index} progress={progress} />
				))}
			</Animated.View>
			<Animated.View className="absolute inset-0 items-center justify-center" style={spinnerStyle}>
				<ActivityIndicator animating={true} size="large" color="#FFFFFF" />
			</Animated.View>
		</View>
	);
};

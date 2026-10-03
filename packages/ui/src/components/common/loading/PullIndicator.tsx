import { clsx } from 'clsx';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	cancelAnimation,
	Easing,
	type SharedValue,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';

const Spoke = ({
	index,
	progress,
	refreshing,
	alwaysWhite,
}: {
	index: number;
	progress: SharedValue<number>;
	refreshing: SharedValue<number>;
	alwaysWhite?: boolean;
}) => {
	const style = useAnimatedStyle(() => ({
		opacity:
			Math.min(Math.max(progress.value * 12 - index, 0), 1) * (1 - refreshing.value) +
			(1 - index / 16) * refreshing.value,
	}));

	return (
		<Animated.View className="absolute inset-0" style={[{ transform: [{ rotate: `${index * 30}deg` }] }, style]}>
			<View
				className={clsx(
					'absolute left-[16.5px] top-0 h-[9px] w-[3px] rounded-full bg-black dark:bg-white',
					alwaysWhite && '!bg-white'
				)}
			/>
		</Animated.View>
	);
};

export const PullIndicator = ({
	progress,
	refreshing,
	alwaysWhite = false,
}: {
	progress: SharedValue<number>;
	refreshing: SharedValue<number>;
	alwaysWhite?: boolean;
}) => {
	const rotation = useSharedValue(0);

	useAnimatedReaction(
		() => refreshing.value > 0,
		(spinning, previouslySpinning) => {
			if (previouslySpinning === null || spinning === previouslySpinning) return;
			if (spinning) {
				rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1);
			} else {
				cancelAnimation(rotation);
				rotation.value = 0;
			}
		}
	);

	useEffect(() => () => cancelAnimation(rotation), [rotation]);

	const spokesStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));

	return (
		<View className="h-9 w-9" accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants">
			<Animated.View className="absolute inset-0" style={spokesStyle}>
				{Array.from({ length: 12 }, (_, index) => (
					<Spoke key={index} index={index} progress={progress} refreshing={refreshing} alwaysWhite={alwaysWhite} />
				))}
			</Animated.View>
		</View>
	);
};

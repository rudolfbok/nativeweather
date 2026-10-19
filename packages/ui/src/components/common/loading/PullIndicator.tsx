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

// Keep layout classes on plain Views so NativeWind preserves Reanimated style handles.
const spokeRotations = [
	'rotate-0',
	'rotate-[30deg]',
	'rotate-[60deg]',
	'rotate-90',
	'rotate-[120deg]',
	'rotate-[150deg]',
	'rotate-180',
	'rotate-[210deg]',
	'rotate-[240deg]',
	'rotate-[270deg]',
	'rotate-[300deg]',
	'rotate-[330deg]',
];

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
		<View className={clsx('absolute inset-0', spokeRotations[index])}>
			<Animated.View cssInterop={false} style={style}>
				<View className={clsx('h-9 w-9')}>
					<View
						className={clsx(
							'absolute left-[16.5px] top-0 h-[9px] w-[3px] rounded-full bg-black dark:bg-white',
							alwaysWhite && '!bg-white'
						)}
					/>
				</View>
			</Animated.View>
		</View>
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
		<View
			className={clsx('h-9 w-9')}
			accessibilityElementsHidden={true}
			importantForAccessibility="no-hide-descendants"
		>
			<Animated.View cssInterop={false} style={spokesStyle}>
				<View className={clsx('h-9 w-9')}>
					{Array.from({ length: 12 }, (_, index) => (
						<Spoke key={index} index={index} progress={progress} refreshing={refreshing} alwaysWhite={alwaysWhite} />
					))}
				</View>
			</Animated.View>
		</View>
	);
};

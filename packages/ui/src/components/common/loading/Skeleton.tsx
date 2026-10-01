import { clsx } from 'clsx';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface SkeletonProps {
	className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
	const opacity = useSharedValue(1);

	useEffect(() => {
		opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
	}, [opacity]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return <Animated.View style={animatedStyle} className={clsx(className)} />;
};

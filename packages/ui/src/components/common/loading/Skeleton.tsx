import { clsx } from 'clsx';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';

export const Skeleton = ({ className }: { className?: string }) => {
	const opacity = useSharedValue(1);

	useEffect(() => {
		opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
	}, [opacity]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<Animated.View style={animatedStyle}>
			<View className={clsx('w-full rounded-3xl bg-white/50 dark:bg-[#0F0F11]', className)} />
		</Animated.View>
	);
};

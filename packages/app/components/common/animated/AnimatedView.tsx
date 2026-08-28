'use client';

import { ReactNode, useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface AnimatedViewProps {
	children: ReactNode;
	duration?: number;
	visible?: boolean;
	className?: string;
}

export const AnimatedView = ({ children, duration = 200, visible = true, className }: AnimatedViewProps) => {
	const opacity = useSharedValue(0);

	useEffect(() => {
		opacity.value = withTiming(visible ? 1 : 0, { duration });
	}, [duration, opacity, visible]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<Animated.View style={animatedStyle} className={className}>
			{children}
		</Animated.View>
	);
};

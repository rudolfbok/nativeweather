'use client';

import { ReactNode, useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface AnimatedViewProps {
	children: ReactNode;
	transition?: { duration?: number };
	className?: string;
}

export const AnimatedView = ({ children, transition, className }: AnimatedViewProps) => {
	const opacity = useSharedValue(0);

	// mount animation
	useEffect(() => {
		opacity.value = withTiming(1, { duration: transition?.duration ?? 200 });
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<Animated.View style={animatedStyle} className={className}>
			{children}
		</Animated.View>
	);
};

'use client';

import { ReactNode, useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface AnimatedViewProps {
	children: ReactNode;
	duration: number;
	className?: string;
}

export const AnimatedView = ({ children, duration, className }: AnimatedViewProps) => {
	const opacity = useSharedValue(0);

	useEffect(() => {
		opacity.value = withTiming(1, { duration: duration });
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value
	}));

	return (
		<Animated.View style={animatedStyle} className={className}>
			{children}
		</Animated.View>
	);
};

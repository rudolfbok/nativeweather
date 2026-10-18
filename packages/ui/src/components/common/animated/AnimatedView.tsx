'use client';

import { ReactNode, useEffect } from 'react';
import { cssInterop } from 'nativewind';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const StyledAnimatedView = cssInterop(Animated.View, { className: 'style' });

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
		<StyledAnimatedView style={animatedStyle} className={className}>
			{children}
		</StyledAnimatedView>
	);
};

import { ReactNode, useState } from 'react';
import { Pressable, View, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';
import { StyledText } from './StyledText';

interface AccordionProps {
	title: string;
	children: ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
	const [expanded, setExpanded] = useState(false);
	const [measured, setMeasured] = useState(false);

	const contentHeight = useSharedValue(0);
	const animatedHeight = useSharedValue(0);
	const rotate = useSharedValue(0);

	const handleMeasure = (e: LayoutChangeEvent) => {
		if (!measured) {
			const height = e.nativeEvent.layout.height;
			contentHeight.value = height;
			setMeasured(true);
		}
	};

	const toggle = () => {
		const next = !expanded;
		setExpanded(next);

		animatedHeight.value = withTiming(next ? contentHeight.value : 0, { duration: 250 });

		rotate.value = withTiming(next ? 90 : 0, { duration: 250 });
	};

	const contentStyle = useAnimatedStyle(() => ({
		height: animatedHeight.value,
		overflow: 'hidden',
	}));

	const chevronStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotate.value}deg` }],
	}));

	return (
		<View>
			<Pressable onPress={toggle} className="flex-row items-center justify-between py-2">
				<StyledText type="subtitle">{title}</StyledText>
				<Animated.View style={chevronStyle}>
					<ChevronRight size={26} color="#007AFF" />
				</Animated.View>
			</Pressable>

			<Animated.View style={contentStyle}>
				<View onLayout={handleMeasure}>{children}</View>
			</Animated.View>
		</View>
	);
};

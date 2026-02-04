import { ChevronRight } from 'lucide-react-native';
import { ReactNode, useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StyledText } from './StyledText';
import { RoundView } from './RoundView';
import { clsx } from 'clsx';

interface AccordionProps {
	title: string;
	children: ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
	const [expanded, setExpanded] = useState(false);

	const toggle = () => {
		setExpanded((prev) => !prev);
	};

	const chevronStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: withTiming(expanded ? '90deg' : '0deg', { duration: 250 }) }]
	}));

	return (
		<Animated.View layout={LinearTransition} className="overflow-hidden">
			<Pressable onPress={toggle} className="flex-row items-center justify-between py-2">
				<StyledText type="subtitle">{title}</StyledText>
				<Animated.View style={chevronStyle}>
					<ChevronRight size={26} color="#007AFF" />
				</Animated.View>
			</Pressable>
			{expanded && (
				<Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
					<RoundView className={clsx('p-4')}>{children}</RoundView>
				</Animated.View>
			)}
		</Animated.View>
	);
};

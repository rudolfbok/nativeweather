import { ChevronIcon } from 'app/components/icons/ui/ChevronIcon';
import { ReactNode, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StyledText } from '../styled/StyledText';
import { RoundView } from '../ui/RoundView';
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
		transform: [{ rotate: withTiming(expanded ? '90deg' : '0deg', { duration: 250 }) }],
	}));

	return (
		<Animated.View layout={LinearTransition} className={clsx('overflow-hidden')}>
			<Pressable onPress={toggle} className={clsx('flex-row items-center justify-between py-2')}>
				<StyledText type="subtitle">{title}</StyledText>
				<Animated.View style={chevronStyle}>
					<ChevronIcon />
				</Animated.View>
			</Pressable>
			{expanded && (
				<Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
					<View
						className={clsx(
							'bg-systemBackground dark:bg-secondarySystemBackground_dark flex overflow-hidden rounded-3xl p-4'
						)}
					>
						{children}
					</View>
				</Animated.View>
			)}
		</Animated.View>
	);
};

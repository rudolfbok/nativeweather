import { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { clsx } from 'clsx';

export const Skeleton = ({ className }: { className?: string }) => {
	const [opacity] = useState(() => new Animated.Value(1));

	useEffect(() => {
		const timing = (toValue: number) => Animated.timing(opacity, { toValue, duration: 1000, useNativeDriver: true });
		const pulse = Animated.loop(Animated.sequence([timing(0.5), timing(1)]));
		pulse.start();
		return () => pulse.stop();
	}, [opacity]);

	return (
		<Animated.View style={{ opacity }}>
			<View className={clsx('w-full rounded-3xl bg-skeleton', className)} />
		</Animated.View>
	);
};

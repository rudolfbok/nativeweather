import { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { NotificationToast } from './NotificationToast';
import type { ToastData } from './NotificationToast';

const visibleMs = 4000;
const fadeMs = 200;

let showListener: ((toast: ToastData) => void) | undefined;

export const showToast = (toast: ToastData) => showListener?.(toast);

export const Toaster = () => {
	const [toast, setToast] = useState<(ToastData & { id: number }) | null>(null);
	const [progress] = useState(() => new Animated.Value(0));

	useEffect(() => {
		let id = 0;
		showListener = (next) => setToast({ ...next, id: ++id });
		return () => (showListener = undefined);
	}, []);

	useEffect(() => {
		if (!toast) return;
		const animate = (toValue: number) =>
			Animated.timing(progress, { toValue, duration: fadeMs, useNativeDriver: true });

		animate(1).start();
		const timeout = setTimeout(
			() => animate(0).start(({ finished }) => finished && setToast((current) => (current === toast ? null : current))),
			visibleMs
		);
		return () => clearTimeout(timeout);
	}, [toast, progress]);

	if (!toast) return null;

	return (
		<View
			pointerEvents="box-none"
			className="absolute inset-x-4 bottom-22.5 items-center web:bottom-4 web:md:left-auto web:md:items-end"
		>
			<Animated.View
				className="w-full web:md:w-auto"
				style={{
					opacity: progress,
					transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
				}}
			>
				<NotificationToast message={toast.message} type={toast.type} />
			</Animated.View>
		</View>
	);
};

import { useTranslate } from '@tolgee/react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from '../common/Button';
import { Text } from '../common/Text';

type OrientationApi = typeof DeviceOrientationEvent & {
	requestPermission?: () => Promise<'granted' | 'denied'>;
};
type OrientationEvent = DeviceOrientationEvent & { webkitCompassHeading?: number };

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
const cardinals = ['N', 'E', 'S', 'W'] as const;
const ticks = Array.from({ length: 24 }, (_, index) => index * 15);

const getOrientationApi = () =>
	typeof window !== 'undefined' && 'DeviceOrientationEvent' in window
		? (window.DeviceOrientationEvent as OrientationApi)
		: null;

// Desktop Chrome and Safari expose the orientation API too, but a laptop has no magnetometer, so the entry point is
// limited to phones and tablets. iPadOS 13+ reports itself as a Mac, hence the touch check.
const isMobileDevice = () => {
	const { userAgent, maxTouchPoints } = navigator;
	return /iPhone|iPad|iPod|Android/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1);
};

/** Whether this browser is on a device that can report a heading; the entry point is hidden elsewhere. */
export const isCompassSupported = () =>
	typeof navigator !== 'undefined' && isMobileDevice() && getOrientationApi() !== null;

// Safari reports a true compass heading; elsewhere `alpha` is counter-clockwise from north.
const getHeading = ({ webkitCompassHeading, alpha }: OrientationEvent) => {
	const value = typeof webkitCompassHeading === 'number' ? webkitCompassHeading : alpha === null ? null : 360 - alpha;
	return value === null || !Number.isFinite(value) ? null : (value + 360) % 360;
};

export const Compass = () => {
	const { t } = useTranslate('weather');
	const api = getOrientationApi();
	// Safari only grants orientation access from a user gesture, so it always starts out ungranted.
	const [granted, setGranted] = useState(api !== null && typeof api.requestPermission !== 'function');
	const [heading, setHeading] = useState<number | null>(null);

	useEffect(() => {
		if (!granted) return;
		const onOrientation = (event: Event) => setHeading((previous) => getHeading(event as OrientationEvent) ?? previous);
		window.addEventListener('deviceorientation', onOrientation);
		return () => window.removeEventListener('deviceorientation', onOrientation);
	}, [granted]);

	const requestPermission = async () => {
		try {
			setGranted((await api?.requestPermission?.()) === 'granted');
		} catch {
			setGranted(false);
		}
	};

	if (!granted) {
		return (
			<View className="gap-4">
				<Text type="body">{t('compass.text')}</Text>
				{api && <Button onPress={() => void requestPermission()}>{t('compass.button.location')}</Button>}
			</View>
		);
	}

	const direction = heading === null ? null : directions[Math.round(heading / 45) % 8];

	return (
		<View className="items-center gap-8 py-8">
			<View className="size-72 items-center">
				<View className="absolute -top-3 z-10 h-6 w-0.5 bg-system-red" />
				<View
					className="size-72 rounded-full border-2 border-label"
					style={{ transform: [{ rotate: `${-(heading ?? 0)}deg` }] }}
				>
					{ticks.map((angle) => (
						<View key={angle} className="absolute inset-0" style={{ transform: [{ rotate: `${angle}deg` }] }}>
							<View className="mx-auto h-2 w-0.5 bg-label opacity-60" />
						</View>
					))}
					{cardinals.map((name, index) => (
						<View key={name} className="absolute inset-0" style={{ transform: [{ rotate: `${index * 90}deg` }] }}>
							<Text type="title" className={name === 'N' ? 'mt-4 text-center text-system-red' : 'mt-4 text-center'}>
								{t(`wind.label.short.${name}`)}
							</Text>
						</View>
					))}
				</View>
			</View>
			<View className="items-center">
				<Text type="data" className="font-bold text-system-red">
					{heading === null ? '–' : `${Math.round(heading)}°`}
				</Text>
				{direction && <Text type="body">{t(`wind.label.long.${direction}`)}</Text>}
			</View>
		</View>
	);
};

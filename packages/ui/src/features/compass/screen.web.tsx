'use client';

import { useStorageBoolean } from '@nativeweather/core/database/useStorage';
import { StyledButton } from '@nativeweather/ui/components/common/styled/StyledButton';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
	requestPermission?: () => Promise<'granted' | 'denied'>;
};

const getOrientationPermissionApi = () => {
	if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) return null;

	return window.DeviceOrientationEvent as DeviceOrientationEventWithPermission;
};

const normalizeHeading = (value: number) => (value + 360) % 360;

export const CompassFeature = () => {
	const { t } = useTranslate('weather');
	const [compassRotation, setCompassRotation] = useState(0);
	const [heading, setHeading] = useState<number | null>(null);
	const [permissionGranted, setPermissionGranted] = useStorageBoolean('compassPermission');
	const [requestingPermission, setRequestingPermission] = useState(false);

	const requestPermission = async () => {
		if (requestingPermission) return;

		const orientationApi = getOrientationPermissionApi();
		if (!orientationApi) {
			setPermissionGranted(false);
			return;
		}

		setRequestingPermission(true);
		try {
			const permission = await orientationApi.requestPermission?.();
			if (permission === 'denied') {
				setPermissionGranted(false);
				return;
			}

			setPermissionGranted(true);
		} catch (error) {
			setPermissionGranted(false);
			console.error('Error requesting device orientation permission:', error);
		} finally {
			setRequestingPermission(false);
		}
	};

	useEffect(() => {
		const orientationApi = getOrientationPermissionApi();
		if (!orientationApi) {
			setPermissionGranted(false);
			return;
		}

		// Safari requires this permission to be requested from a user gesture. A
		// persisted value cannot be trusted after the user changes browser settings.
		if (typeof orientationApi.requestPermission === 'function') {
			setPermissionGranted(false);
		} else {
			setPermissionGranted(true);
		}
	}, [setPermissionGranted]);

	useEffect(() => {
		if (permissionGranted !== true) return;

		const handleOrientation = (event: DeviceOrientationEvent & { webkitCompassHeading?: number }) => {
			const webkitHeading = event.webkitCompassHeading;
			const nextHeading =
				typeof webkitHeading === 'number' && Number.isFinite(webkitHeading)
					? webkitHeading
					: typeof event.alpha === 'number' && Number.isFinite(event.alpha)
						? 360 - event.alpha
						: null;

			if (nextHeading === null) return;

			const normalizedHeading = normalizeHeading(nextHeading);
			setHeading(normalizedHeading);
			setCompassRotation(-normalizedHeading);
		};

		window.addEventListener('deviceorientation', handleOrientation);
		return () => {
			window.removeEventListener('deviceorientation', handleOrientation);
		};
	}, [permissionGranted]);

	const getDirectionLabel = (angle: number | null) => {
		if (angle === null) return 'NaN';

		if ((angle >= 340 && angle <= 360) || (angle >= 0 && angle <= 20)) return t('wind.label.long.N');
		if (angle > 20 && angle < 70) return t('wind.label.long.NE');
		if (angle >= 70 && angle <= 110) return t('wind.label.long.E');
		if (angle > 110 && angle < 160) return t('wind.label.long.SE');
		if (angle >= 160 && angle <= 200) return t('wind.label.long.S');
		if (angle > 200 && angle < 250) return t('wind.label.long.SW');
		if (angle >= 250 && angle <= 290) return t('wind.label.long.W');
		if (angle > 290 && angle < 340) return t('wind.label.long.NW');
		return t('wind.label.long.N');
	};

	return (
		<div className={clsx('flex h-[60vh] flex-col')}>
			{permissionGranted ? (
				<div className={clsx('flex flex-1 flex-col items-center justify-center space-y-8')}>
					<div className={clsx('relative')}>
						<div
							className={clsx('relative rounded-full border-2 border-black p-10 font-bold dark:border-white')}
							style={{
								transform: `rotate(${compassRotation}deg)`,
							}}
						>
							{Array.from({ length: 24 }).map((_, i) => (
								<div
									key={i}
									className={clsx(
										'absolute left-[100px] top-[119px] h-0.5 w-[41px] border border-dotted border-black dark:border-white'
									)}
									style={{
										transform: `rotate(${i * 15}deg) translateX(100px)`,
									}}
								/>
							))}

							<span
								className={clsx(
									'bg-background absolute left-1/2 top-[2px] -translate-x-1/2 text-lg dark:bg-black dark:text-white'
								)}
								style={{
									transform: `translateX(-50%) rotate(${-compassRotation}deg)`,
								}}
							>
								0
							</span>
							<span
								className={clsx(
									'bg-background absolute bottom-[3px] left-1/2 -translate-x-1/2 text-lg dark:bg-black dark:text-white'
								)}
								style={{
									transform: `translateX(-50%) rotate(${-compassRotation}deg)`,
								}}
							>
								180
							</span>
							<span
								className={clsx(
									'bg-background absolute left-[3px] top-1/2 -translate-y-1/2 text-lg dark:bg-black dark:text-white'
								)}
								style={{
									transform: `translateY(-50%) rotate(${-compassRotation}deg)`,
								}}
							>
								270
							</span>
							<span
								className={clsx(
									'bg-background absolute right-[10px] top-1/2 -translate-y-1/2 text-lg dark:bg-black dark:text-white'
								)}
								style={{
									transform: `translateY(-50%) rotate(${-compassRotation}deg)`,
								}}
							>
								90
							</span>
							<div className={clsx('relative h-[160px] w-[160px]')}>
								<div
									className={clsx('absolute left-1/2 h-20 w-0.5 origin-bottom -translate-x-1/2 bg-red-600')}
									style={{
										transform: `rotate(${heading ?? 0}deg)`,
									}}
								/>
								<div
									className={clsx(
										'absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600'
									)}
								/>
								<div
									className={clsx(
										'absolute inset-0 h-full w-full rounded-full border border-black bg-zinc-500/10 font-serif text-xl font-bold text-black dark:border-white'
									)}
								>
									<span
										className={clsx('absolute left-1/2 top-0 -translate-x-1/2 dark:text-white')}
										style={{
											transform: `translateX(-50%) rotate(${-compassRotation}deg)`,
										}}
									>
										{t('wind.label.short.N')}
									</span>
									<span
										className={clsx('absolute left-[5px] top-1/2 -translate-y-1/2 dark:text-white')}
										style={{
											transform: `translateY(-50%) rotate(${-compassRotation}deg)`,
										}}
									>
										{t('wind.label.short.W')}
									</span>
									<span
										className={clsx('absolute right-[5px] top-1/2 -translate-y-1/2 dark:text-white')}
										style={{
											transform: `translateY(-50%) rotate(${-compassRotation}deg)`,
										}}
									>
										{t('wind.label.short.E')}
									</span>
									<span
										className={clsx('absolute bottom-0 left-1/2 -translate-x-1/2 dark:text-white')}
										style={{
											transform: `translateX(-50%) rotate(${-compassRotation}deg)`,
										}}
									>
										{t('wind.label.short.S')}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className={clsx('flex flex-col text-center text-lg')}>
						<span className={clsx('font-bold !text-red-600')}>{heading !== null ? Math.round(heading) : 0}°</span>
						<span className={clsx('dark:text-white')}>{getDirectionLabel(heading)}</span>
					</div>
				</div>
			) : (
				<View className={clsx('flex items-center gap-4')}>
					<View className="gap-2 md:w-1/2 lg:w-[40%]">
						<StyledText type="screentitle">{t('compass.title')}</StyledText>
						<StyledText type="body">{t('compass.text')}</StyledText>
						<StyledButton onPress={requestPermission} text={t('compass.button.location')} />
					</View>
				</View>
			)}
		</div>
	);
};

'use client';

/// Compass

import { useTranslate } from '@tolgee/react';
import React, { useEffect, useState } from 'react';

export default function Compass() {
	const { t } = useTranslate('weather');
	const [direction, setDirection] = useState(null);
	const [permissionGranted, setPermissionGranted] = useState(false);

	const requestPermission = async () => {
		const DeviceOrientationEventWithPermission = DeviceOrientationEvent;

		if (typeof DeviceOrientationEventWithPermission.requestPermission === 'function') {
			try {
				const permission = await DeviceOrientationEventWithPermission.requestPermission();
				if (permission === 'granted') {
					setPermissionGranted(true);
				} else {
					console.error('Permission denied for device orientation.');
				}
			} catch (error) {
				console.error('Error requesting permission:', error);
			}
		} else {
			setPermissionGranted(true);
		}
	};

	useEffect(() => {
		if (!permissionGranted) return;

		const handleOrientation = (event: any) => {
			if (event.webkitCompassHeading !== null) {
				setDirection(event.webkitCompassHeading);
			}
		};
		window.addEventListener('deviceorientation', handleOrientation);
		return () => {
			window.removeEventListener('deviceorientation', handleOrientation);
		};
	}, [permissionGranted]);

	const getDirectionLabel = (angle: number) => {
		if ((angle >= 340 && angle <= 360) || (angle >= 0 && angle <= 20)) return t('north');
		if (angle > 20 && angle < 70) return t('northeast');
		if (angle >= 70 && angle <= 110) return t('east');
		if (angle > 110 && angle < 160) return t('southeast');
		if (angle >= 160 && angle <= 200) return t('south');
		if (angle > 200 && angle < 250) return t('southwest');
		if (angle >= 250 && angle <= 290) return t('west');
		if (angle > 290 && angle < 340) return t('northwest');
		return t('north');
	};

	return (
		<div className="flex h-[70vh] flex-col items-center justify-center gap-10">
			{permissionGranted ? (
				<div className="flex flex-col items-center justify-center space-y-8">
					<div className="dark:border-white' relative rounded-full border-2 border-black p-10 font-bold">
						{Array.from({ length: 24 }).map((_, i) => (
							<div
								key={i}
								className="absolute left-[100px] top-[119px] h-0.5 w-[41px] border border-dotted border-black dark:border-white"
								style={{
									transform: `rotate(${i * 15}deg) translateX(100px)`
								}}
							/>
						))}
						<span className="bg-background absolute left-1/2 top-[2px] -translate-x-1/2 text-lg">0</span>
						<span className="bg-background absolute bottom-[3px] left-1/2 -translate-x-1/2 text-lg">180</span>
						<span className="bg-background absolute left-[3px] top-1/2 -translate-y-1/2 text-lg">270</span>
						<span className="bg-background absolute right-[10px] top-1/2 -translate-y-1/2 text-lg">90</span>
						<div className="relative h-[160px] w-[160px]">
							<div className="absolute left-[81px] top-[-12px] -translate-x-1/2">
								<img src="/compassarrow.svg" alt="North arrow" />
							</div>
							<div
								className="absolute left-1/2 h-20 w-0.5 origin-bottom -translate-x-1/2 bg-red-600"
								style={{
									transform: `rotate(${direction ?? 0}deg)`
								}}
							/>
							<div className="absolute left-[81px] top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600" />
							<div className="absolute inset-0 h-full w-full rounded-full border border-black bg-zinc-500/10 font-serif text-xl font-bold text-black dark:border-white">
								<span className="absolute left-1/2 top-0  -translate-x-1/2">{t('northlabel')}</span>
								<span className="absolute left-[5px] top-1/2  -translate-y-1/2">{t('westlabel')}</span>
								<span className="absolute right-[5px] top-1/2  -translate-y-1/2">{t('eastlabel')}</span>
								<span className="absolute bottom-0 left-1/2  -translate-x-1/2">{t('southlabel')}</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col text-center text-lg">
						<span className="font-bold !text-red-600">{Math.round(direction)}°</span>
						<span>{getDirectionLabel(Math.round(direction)) || t('directionerror')}</span>
					</div>
				</div>
			) : (
				<div className="mt-4 h-full space-y-4 text-center">
					<span className="text-xl font-bold">{t('compass')}</span>
					<p className="font-semibold">{t('compassinfo')}</p>
					<p>{t('compasstext')}</p>
					<button onClick={requestPermission} className="cursor-pointer rounded-2xl bg-zinc-500/10 p-2 px-4">
						{t('compasspermission')}
					</button>
				</div>
			)}
		</div>
	);
}

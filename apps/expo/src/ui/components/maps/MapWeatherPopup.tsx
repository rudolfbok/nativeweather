import type { MapWeatherPoint } from '@/core';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { ActivityIndicator, Pressable as NativePressable, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { Pressable } from '../common/Pressable';
import { Text } from '../common/Text';

const CloseIcon = withUniwind(X);

type Size = { width: number; height: number };
type Point = { x: number; y: number };

const OFFSET = 12;

const clampPopup = (anchor: Point, mapSize: Size, popupSize: Size) => ({
	x: Math.min(Math.max(anchor.x + OFFSET, OFFSET), Math.max(OFFSET, mapSize.width - popupSize.width - OFFSET)),
	y:
		anchor.y >= popupSize.height + OFFSET * 2
			? anchor.y - popupSize.height - OFFSET
			: Math.min(anchor.y + OFFSET, Math.max(OFFSET, mapSize.height - popupSize.height - OFFSET)),
});

export const MapWeatherPopup = ({
	weatherPoint,
	anchor,
	mapSize,
	title,
	errorLabel,
	onClose,
}: {
	weatherPoint: MapWeatherPoint;
	anchor: Point;
	mapSize: Size;
	title: string;
	errorLabel: string;
	onClose: () => void;
}) => {
	const [popupSize, setPopupSize] = useState<Size>({ width: 220, height: 96 });
	const point = clampPopup(anchor, mapSize, popupSize);
	const { status, value, detail, location } = weatherPoint;

	return (
		<NativePressable
			onLayout={(event: LayoutChangeEvent) => setPopupSize(event.nativeEvent.layout)}
			className={`absolute z-10 rounded-3xl bg-system-background p-3 ${status === 'loading' ? 'w-12' : ''}`}
			style={{ left: point.x, top: point.y, maxWidth: Math.min(288, mapSize.width - OFFSET * 2) }}
		>
			<View className="flex-row items-start justify-between gap-3">
				<View className="min-w-0 shrink">
					{status === 'loading' && <ActivityIndicator className="self-center" size="small" />}
					{status === 'error' && (
						<Text type="caption" className="mt-1 font-semibold">
							{errorLabel}
						</Text>
					)}
					{status === 'ready' && (
						<>
							<Text type="caption" className="opacity-70">
								{title}
							</Text>
							<Text type="title" className="font-bold">
								{value}
							</Text>
							{!!detail && (
								<Text type="caption" className="opacity-70">
									{detail}
								</Text>
							)}
							{!!location && (
								<Text type="caption" className="opacity-70">
									{location}
								</Text>
							)}
						</>
					)}
				</View>
				{status !== 'loading' && (
					<Pressable onPress={onClose} accessibilityLabel="Close" className="h-fit rounded-full p-1">
						<CloseIcon colorClassName="accent-label" size={20} />
					</Pressable>
				)}
			</View>
		</NativePressable>
	);
};

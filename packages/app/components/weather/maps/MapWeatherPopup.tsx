import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { CloseIcon } from 'app/components/icons/ui/CloseIcon';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import type { MapWeatherPoint } from 'app/hooks/maps/useMapWeatherPoint';
import { clsx } from 'clsx';
import { useState } from 'react';
import { ActivityIndicator, LayoutChangeEvent, View } from 'react-native';

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
	const { text } = useThemeColors();
	const [popupSize, setPopupSize] = useState<Size>({ width: 220, height: 96 });
	const point = clampPopup(anchor, mapSize, popupSize);
	const handleLayout = (event: LayoutChangeEvent) => setPopupSize(event.nativeEvent.layout);

	return (
		<View
			onLayout={handleLayout}
			className={clsx(
				'bg-systemBackground absolute z-10 rounded-3xl border border-black/10 p-3 shadow-md',
				weatherPoint.status === 'loading' && 'w-12',
				'dark:bg-secondarySystemBackground_dark dark:border-white/10 dark:shadow-white/10'
			)}
			style={{ left: point.x, top: point.y, maxWidth: Math.min(288, mapSize.width - OFFSET * 2) }}
		>
			<View className="flex-row items-start justify-between gap-3">
				<View className="min-w-0 shrink">
					{weatherPoint.status !== 'loading' && (
						<StyledText type="bodysecondary" className="opacity-70">
							{title}
						</StyledText>
					)}
					{weatherPoint.status === 'loading' && <ActivityIndicator className="self-center" size="small" color="#007AFF" />}
					{weatherPoint.status === 'error' && (
						<StyledText type="bodysecondary" className="mt-1 font-semibold">
							{errorLabel}
						</StyledText>
					)}
					{weatherPoint.status === 'ready' && (
						<View>
							<StyledText type="title" className="font-bold">
								{weatherPoint.value}
							</StyledText>
							{!!weatherPoint.detail && (
								<StyledText type="bodysecondary" className="opacity-70">
									{weatherPoint.detail}
								</StyledText>
							)}
							{!!weatherPoint.location && (
								<StyledText type="bodysecondary" className="opacity-70">
									{weatherPoint.location}
								</StyledText>
							)}
						</View>
					)}
				</View>
				{weatherPoint.status !== 'loading' && (
					<StyledPressable
						onPress={onClose}
						className="h-fit rounded-full p-1"
					>
						<CloseIcon color={text} size={20} />
					</StyledPressable>
				)}
			</View>
		</View>
	);
};

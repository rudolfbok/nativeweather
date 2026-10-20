import type { NativeInstance } from '../../../utils/nativeInstance';
import { useTranslate } from '@tolgee/react';
import { CardHeader } from '../../common/layout/CardHeader';
import { RoundView } from '../../common/styled/RoundView';
import { ClockIcon } from '../../icons/main/ClockIcon';
import { useThemeColors } from '../../../hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react-native';
import { useRef, useState } from 'react';
import type { JSX, ReactNode } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface HourlyCarouselProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => JSX.Element;
}

const itemStep = 72;

const CarouselButton = ({
	label,
	disabled,
	icon,
	onPress,
}: {
	label: string;
	disabled: boolean;
	icon: ReactNode;
	onPress: () => void;
}) => (
	<Pressable
		accessibilityLabel={label}
		accessibilityRole="button"
		accessibilityState={{ disabled }}
		disabled={disabled}
		onPress={onPress}
		className={clsx('h-8 w-8 cursor-pointer items-center justify-center rounded-full', disabled && 'opacity-20')}
	>
		{icon}
	</Pressable>
);

export const HourlyCarousel = <T,>({ data, renderItem }: HourlyCarouselProps<T>) => {
	const { t } = useTranslate('weather');
	const { text } = useThemeColors();
	const scrollRef = useRef<NativeInstance<typeof ScrollView>>(null);
	const scrollX = useRef(0);
	const viewportWidth = useRef(0);
	const contentWidth = useRef(0);
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(false);
	const showArrows =
		Platform.OS === 'macos' ||
		(Platform.OS === 'web' && typeof navigator !== 'undefined' && (navigator.maxTouchPoints ?? 0) === 0);

	const updateControls = (x = scrollX.current, correctScroll = false) => {
		const maxScrollX = Math.max(0, contentWidth.current - viewportWidth.current);
		const nextX = Math.min(Math.max(0, x), maxScrollX);

		scrollX.current = nextX;
		if (correctScroll && nextX !== x) scrollRef.current?.scrollTo({ x: nextX, animated: false });
		setCanPrev(nextX > 1);
		setCanNext(nextX < maxScrollX - 1);
	};

	const scrollBy = (direction: -1 | 1) => {
		const maxScrollX = Math.max(0, contentWidth.current - viewportWidth.current);
		const nextX = Math.min(maxScrollX, Math.max(0, scrollX.current + direction * itemStep));

		scrollX.current = nextX;
		updateControls(nextX);
		scrollRef.current?.scrollTo({ x: nextX, animated: true });
	};

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		updateControls(event.nativeEvent.contentOffset.x);
	};

	const handleLayout = (event: LayoutChangeEvent) => {
		viewportWidth.current = event.nativeEvent.layout.width;
		updateControls(scrollX.current, true);
	};

	return (
		<RoundView className={clsx('py-4')}>
			<View className={clsx('mb-4 flex-row items-center justify-between px-4')}>
				<CardHeader icon={<ClockIcon />} header={t('hourlyforecast.title')} className={clsx('min-w-0 flex-1')} />
				{showArrows && (canPrev || canNext) && (
					<View className={clsx('w-[70px] flex-row justify-end gap-1')}>
						<CarouselButton
							label={t('carousel.previous')}
							disabled={!canPrev}
							icon={<ChevronLeftCircle size={28} color={text} />}
							onPress={() => scrollBy(-1)}
						/>
						<CarouselButton
							label={t('carousel.next')}
							disabled={!canNext}
							icon={<ChevronRightCircle size={28} color={text} />}
							onPress={() => scrollBy(1)}
						/>
					</View>
				)}
			</View>
			<ScrollView
				ref={scrollRef}
				horizontal
				accessibilityLabel={t('hourlyforecast.title')}
				tabIndex={Platform.OS === 'web' ? 0 : undefined}
				onContentSizeChange={(width) => {
					contentWidth.current = width;
					updateControls(scrollX.current, true);
				}}
				onLayout={handleLayout}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				contentContainerClassName={clsx('gap-4 pl-[10px] pr-4')}
			>
				{data.map((item, index) => renderItem(item, index))}
			</ScrollView>
		</RoundView>
	);
};

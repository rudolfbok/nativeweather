import { useTranslate } from '@tolgee/react';
import { ChevronLeftCircle, ChevronRightCircle } from '@/ui/components/icons/lucide';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollViewInstance } from 'react-native';
import { Pressable as NativePressable, ScrollView, View } from 'react-native';
import { clsx } from 'clsx';
import { withUniwind } from 'uniwind';
import { CardHeader } from '../../common/CardHeader';
import { RoundView } from '../../common/RoundView';
import { ClockIcon } from '../../icons/main/ClockIcon';

const PreviousIcon = withUniwind(ChevronLeftCircle);
const NextIcon = withUniwind(ChevronRightCircle);

const itemStep = 72;

interface HourlyCarouselProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => ReactNode;
}

const ArrowButton = ({
	label,
	disabled,
	onPress,
	children,
}: {
	label: string;
	disabled: boolean;
	onPress: () => void;
	children: ReactNode;
}) => (
	<NativePressable
		accessibilityLabel={label}
		accessibilityRole="button"
		accessibilityState={{ disabled }}
		disabled={disabled}
		onPress={onPress}
		className={clsx(
			'h-8 w-8 cursor-pointer items-center justify-center rounded-full',
			disabled && 'cursor-default opacity-20'
		)}
	>
		{children}
	</NativePressable>
);

export const HourlyCarousel = <T,>({ data, renderItem }: HourlyCarouselProps<T>) => {
	const { t } = useTranslate('weather');
	const scrollRef = useRef<ScrollViewInstance>(null);
	const scrollX = useRef(0);
	const viewportWidth = useRef(0);
	const contentWidth = useRef(0);
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(false);

	const maxScrollX = () => Math.max(0, contentWidth.current - viewportWidth.current);

	const updateControls = (x = scrollX.current, correctScroll = false) => {
		const nextX = Math.min(Math.max(0, x), maxScrollX());
		scrollX.current = nextX;
		if (correctScroll && nextX !== x) scrollRef.current?.scrollTo({ x: nextX, animated: false });
		setCanPrev(nextX > 1);
		setCanNext(nextX < maxScrollX() - 1);
	};

	const scrollBy = (direction: -1 | 1) => {
		const nextX = Math.min(maxScrollX(), Math.max(0, scrollX.current + direction * itemStep));
		scrollX.current = nextX;
		// onScroll updates the buttons once the animation actually reaches the edge.
		scrollRef.current?.scrollTo({ x: nextX, animated: true });
	};

	return (
		<RoundView className="py-4">
			<View className="mb-4 flex-row items-center justify-between px-4">
				<CardHeader icon={<ClockIcon />} header={t('hourlyforecast.title')} className="min-w-0 flex-1" />
				{/* Arrows only for mouse users; touch scrolls the row directly. */}
				{(canPrev || canNext) && (
					<View className="hidden flex-row gap-2 web:pointer-fine:flex">
						<ArrowButton label={t('carousel.previous')} disabled={!canPrev} onPress={() => scrollBy(-1)}>
							<PreviousIcon colorClassName="accent-label" size={28} />
						</ArrowButton>
						<ArrowButton label={t('carousel.next')} disabled={!canNext} onPress={() => scrollBy(1)}>
							<NextIcon colorClassName="accent-label" size={28} />
						</ArrowButton>
					</View>
				)}
			</View>
			<ScrollView
				ref={scrollRef}
				horizontal
				accessibilityLabel={t('hourlyforecast.title')}
				onContentSizeChange={(width) => {
					contentWidth.current = width;
					updateControls(scrollX.current, true);
				}}
				onLayout={(event: LayoutChangeEvent) => {
					viewportWidth.current = event.nativeEvent.layout.width;
					updateControls(scrollX.current, true);
				}}
				onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => updateControls(event.nativeEvent.contentOffset.x)}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				contentContainerClassName="gap-4 px-3"
			>
				{data.map(renderItem)}
			</ScrollView>
		</RoundView>
	);
};

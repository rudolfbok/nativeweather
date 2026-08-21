import { useTranslate } from '@tolgee/react';
import { CardHeader } from 'app/components/common/layout/CardHeader';
import { RoundView } from 'app/components/common/styled/RoundView';
import { ClockIcon } from 'app/components/icons/main/ClockIcon';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react-native';
import { JSX, ReactNode, useRef, useState } from 'react';
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, View } from 'react-native';

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
		className={clsx('h-8 w-8 items-center justify-center rounded-full', disabled && 'opacity-20')}
		style={{ cursor: 'pointer' }}
	>
		{icon}
	</Pressable>
);

export const HourlyCarousel = <T,>({ data, renderItem }: HourlyCarouselProps<T>) => {
	const { t } = useTranslate('weather');
	const { text } = useThemeColors();
	const scrollRef = useRef<ScrollView>(null);
	const scrollX = useRef(0);
	const viewportWidth = useRef(0);
	const contentWidth = useRef(0);
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(false);
	const [hasOverflow, setHasOverflow] = useState(false);

	const updateControls = (x = scrollX.current) => {
		const maxScrollX = Math.max(0, contentWidth.current - viewportWidth.current);
		const nextX = Math.min(Math.max(0, x), maxScrollX);

		scrollX.current = nextX;
		setHasOverflow(maxScrollX > 1);
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
		updateControls();
	};

	return (
		<RoundView className="py-4" liquidGlass={true}>
			<View className="mb-4 flex-row items-center justify-between px-4">
				<CardHeader icon={<ClockIcon />} header={t('hourlyforecast.title')} />
				{hasOverflow && (
					<View className="flex-row gap-1">
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
				onContentSizeChange={(width) => {
					contentWidth.current = width;
					updateControls();
				}}
				onLayout={handleLayout}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: 10, paddingRight: 16, gap: 16 }}
			>
				{data.map((item, index) => renderItem(item, index))}
			</ScrollView>
		</RoundView>
	);
};

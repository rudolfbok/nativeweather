import { useTranslate } from '@tolgee/react';
import { CardHeader } from 'app/components/common/CardHeader';
import { RoundView } from 'app/components/common/RoundView';
import { ClockIcon } from 'app/components/icons/ClockIcon';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { clsx } from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react-native';
import { JSX, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

interface HourlyCarouselProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => JSX.Element;
}

export const HourlyCarousel = <T,>({ data, renderItem }: HourlyCarouselProps<T>) => {
	const { t } = useTranslate('weather');

	const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(false);

	const updateButtons = useCallback(() => {
		if (!emblaApi) return;
		setCanPrev(emblaApi.canScrollPrev());
		setCanNext(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		updateButtons();
		emblaApi.on('select', updateButtons);
		emblaApi.on('reInit', updateButtons);
	}, [emblaApi, updateButtons]);

	const switchColors = useSwitchColors('black', 'white');

	const isTouchDevice = navigator.maxTouchPoints > 0;

	const arrowBase = clsx(
		isTouchDevice && 'group-hover:opacity-0',
		'pointer-events-none opacity-0 transition-opacity',
		'group-hover:pointer-events-auto group-hover:opacity-100',
		'focus-visible:pointer-events-auto focus-visible:opacity-100',
		'disabled:focus-visible:opacity-30'
	);

	const LeftArrow = () => (
		<button
			type="button"
			onClick={() => emblaApi?.scrollPrev()}
			disabled={!canPrev}
			aria-label={t('carousel.previous')}
			aria-disabled={!canPrev}
			className={clsx(arrowBase, !canPrev && 'group-hover:opacity-20')}
		>
			<ChevronLeftCircle size={28} color={switchColors} />
		</button>
	);

	const RightArrow = () => (
		<button
			type="button"
			onClick={() => emblaApi?.scrollNext()}
			disabled={!canNext}
			aria-label={t('carousel.next')}
			aria-disabled={!canNext}
			className={clsx(arrowBase, !canNext && 'group-hover:opacity-20')}
		>
			<ChevronRightCircle size={28} color={switchColors} />
		</button>
	);

	return (
		<RoundView className={clsx('group w-full py-4')}>
			<View className={clsx('mb-4 flex-row items-center justify-between px-4')}>
				<CardHeader icon={<ClockIcon />} header={t('hourlyforecast.title')} />
				<View className={clsx('h-full w-[70px] flex-row gap-2')}>
					<LeftArrow />
					<RightArrow />
				</View>
			</View>
			<div className={clsx('relative flex flex-row px-1')}>
				<div
					ref={emblaRef}
					role="region"
					aria-roledescription="carousel"
					aria-label={t('hourlyforecast.title')}
					className={clsx('w-full cursor-grab overflow-hidden active:cursor-grabbing')}
				>
					<div className={clsx('flex flex-row gap-2')}>{data.map((item, index) => renderItem(item, index))}</div>
				</div>
			</div>
		</RoundView>
	);
};

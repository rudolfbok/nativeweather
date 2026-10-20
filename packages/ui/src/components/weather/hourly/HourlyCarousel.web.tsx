import { useTranslate } from '@tolgee/react';
import { CardHeader } from '../../common/layout/CardHeader';
import { RoundView } from '../../common/styled/RoundView';
import { ClockIcon } from '../../icons/main/ClockIcon';
import { useThemeColors } from '../../../hooks/theme/useThemeColors';
import { clsx } from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react-native';
import { JSX, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

interface HourlyCarouselProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => JSX.Element;
}

const arrowBase = clsx(
	'pointer-events-none opacity-100',
	'group-hover:pointer-events-auto',
	'focus-visible:pointer-events-auto focus-visible:opacity-100'
);

// const isTouchDevice = navigator.maxTouchPoints > 0;

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
		const frame = requestAnimationFrame(updateButtons);
		emblaApi.on('select', updateButtons);
		emblaApi.on('reInit', updateButtons);
		return () => {
			cancelAnimationFrame(frame);
			emblaApi.off('select', updateButtons);
			emblaApi.off('reInit', updateButtons);
		};
	}, [emblaApi, updateButtons]);

	const { text } = useThemeColors();

	return (
		<RoundView className={clsx('group w-full py-4')}>
			<View className={clsx('mb-4 min-w-0 flex-row items-center justify-between px-4')}>
				<CardHeader icon={<ClockIcon />} header={t('hourlyforecast.title')} className="min-w-0 flex-1" />
				<View className={clsx('h-full w-[70px] flex-shrink-0 flex-row gap-2')}>
					<button
						type="button"
						onClick={() => emblaApi?.scrollPrev()}
						disabled={!canPrev}
						aria-label={t('carousel.previous')}
						aria-disabled={!canPrev}
						className={clsx(arrowBase, !canPrev && 'opacity-20')}
					>
						<ChevronLeftCircle size={28} color={text} />
					</button>
					<button
						type="button"
						onClick={() => emblaApi?.scrollNext()}
						disabled={!canNext}
						aria-label={t('carousel.next')}
						aria-disabled={!canNext}
						className={clsx(arrowBase, !canNext && 'opacity-20')}
					>
						<ChevronRightCircle size={28} color={text} />
					</button>
				</View>
			</View>
			<div className={clsx('relative flex min-w-0 flex-row')}>
				<div
					ref={emblaRef}
					role="region"
					aria-roledescription="carousel"
					aria-label={t('hourlyforecast.title')}
					className={clsx('w-full cursor-grab overflow-hidden px-2 active:cursor-grabbing')}
				>
					<div className={clsx('flex flex-row gap-2')}>{data.map((item, index) => renderItem(item, index))}</div>
				</div>
			</div>
		</RoundView>
	);
};

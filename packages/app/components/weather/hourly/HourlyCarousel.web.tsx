import { useTranslate } from '@tolgee/react';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { ChevronLeft } from 'lucide-react-native';
import useEmblaCarousel from 'embla-carousel-react';
import { JSX, useCallback, useEffect, useState } from 'react';
import { CardHeader } from 'app/components/common/CardHeader';
import { RoundView } from 'app/components/common/RoundView';
import { ClockIcon } from 'app/components/icons/ClockIcon';
import { RightCarouselArrow } from 'app/components/icons/RightCarouselArrow';
import { clsx } from 'clsx';

interface CarouselProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => JSX.Element;
}

export const HourlyCarousel = <T,>({ data, renderItem }: CarouselProps<T>) => {
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

	const arrowBase =
		'opacity-0 transition-opacity pointer-events-none ' +
		'group-hover:opacity-100 group-hover:pointer-events-auto ' +
		'focus-visible:opacity-100 focus-visible:pointer-events-auto';

	const LeftArrow = () => (
		<button
			type="button"
			onClick={() => emblaApi?.scrollPrev()}
			disabled={!canPrev}
			aria-label={t('carousel.previous')}
			aria-disabled={!canPrev}
			className={clsx(arrowBase, 'disabled:opacity-30')}
		>
			<ChevronLeft size={20} color={switchColors} />
		</button>
	);

	const RightArrow = () => (
		<button
			type="button"
			onClick={() => emblaApi?.scrollNext()}
			disabled={!canNext}
			aria-label={t('carousel.next')}
			aria-disabled={!canNext}
			className={clsx(arrowBase, 'disabled:opacity-30')}
		>
			<RightCarouselArrow />
		</button>
	);

	return (
		<RoundView className={clsx('w-full py-4')}>
			<CardHeader icon={<ClockIcon />} header={t('hourlyforecast.title')} className={clsx('mb-4 px-4')} />

			<div className={clsx('group flex flex-row px-1')}>
				<LeftArrow />

				<div
					ref={emblaRef}
					role="region"
					aria-roledescription="carousel"
					aria-label={t('hourlyforecast.title')}
					className={clsx('w-full cursor-grab overflow-hidden active:cursor-grabbing')}
				>
					<div className={clsx('flex flex-row gap-2')}>{data.map((item, index) => renderItem(item, index))}</div>
				</div>

				<RightArrow />
			</div>
		</RoundView>
	);
};

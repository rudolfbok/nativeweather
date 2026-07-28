import { useTranslate } from '@tolgee/react';
import { CardHeader } from 'app/components/common/ui/CardHeader';
import { RoundView } from 'app/components/common/ui/RoundView';
import { ClockIcon } from 'app/components/icons/main/ClockIcon';
import { JSX, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';

interface HourlyCarouselProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => JSX.Element;
}

export const HourlyCarousel = <T,>({ data, renderItem }: HourlyCarouselProps<T>) => {
	const { t } = useTranslate('weather');
	const scrollRef = useRef<ScrollView>(null);

	useEffect(() => {
		scrollRef.current?.scrollTo({ x: 0, animated: false });
	}, [data]);

	return (
		<RoundView className="py-4">
			<CardHeader icon={<ClockIcon />} header={t('hourlyforecast.title')} className="mb-4 px-4" />
			<ScrollView
				ref={scrollRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 24, columnGap: 16 }}
			>
				{data.map((item, index) => renderItem(item, index))}
			</ScrollView>
		</RoundView>
	);
};

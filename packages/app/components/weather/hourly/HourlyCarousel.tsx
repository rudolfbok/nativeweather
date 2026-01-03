import { useTranslate } from '@tolgee/react';
import { ScrollView } from 'react-native';
import { CardHeader } from 'app/components/common/CardHeader';
import { RoundView } from 'app/components/common/RoundView';
import { ClockIcon } from 'app/components/icons/ClockIcon';
import { clsx } from 'clsx';
import { JSX } from 'react';

interface CarouselProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => JSX.Element;
}

export const HourlyCarousel = <T,>({ data, renderItem }: CarouselProps<T>) => {
	const { t } = useTranslate('weather');

	return (
		<RoundView className={clsx('flex-1 py-4')}>
			<CardHeader icon={<ClockIcon />} header={t('hourlyforecast.title')} className={clsx('mb-4 px-4')} />
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: 10, paddingRight: 16, gap: 16 }}
			>
				{data.map((item, index) => renderItem(item, index))}
			</ScrollView>
		</RoundView>
	);
};

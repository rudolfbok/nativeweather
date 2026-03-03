import { useTranslate } from '@tolgee/react';
import { ScrollView } from 'react-native';
import { CardHeader } from 'app/components/common/ui/CardHeader';
import { RoundView } from 'app/components/common/ui/RoundView';
import { ClockIcon } from 'app/components/icons/ClockIcon';
import { clsx } from 'clsx';
import { JSX } from 'react';

interface HourlyCarouselProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => JSX.Element;
}

export const HourlyCarousel = <T,>({ data, renderItem }: HourlyCarouselProps<T>) => {
	const { t } = useTranslate('weather');

	return (
		<RoundView style={{ paddingVertical: 16 }}>
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

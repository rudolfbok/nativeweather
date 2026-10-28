import { useTranslate } from '@tolgee/react';
import { StyledText } from '../../common/styled/StyledText';
import { ContentRow } from '../../common/layout/ContentRow';
import { ValuesList } from '../../common/modal/ValuesList';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { selectUnit } from '@nativeweather/core/utils/formatting/selectUnit';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const RangeModal = () => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');

	const rangeValues = [
		{ name: t('description.range.0'), value: selectUnit({ metric: '0 - 1km', imperial: '0 - 1mil', currentUnits }) },
		{ name: t('description.range.1'), value: selectUnit({ metric: '1 - 2km', imperial: '1 - 2mil', currentUnits }) },
		{ name: t('description.range.2'), value: selectUnit({ metric: '2 - 4km', imperial: '2 - 3mil', currentUnits }) },
		{ name: t('description.range.3'), value: selectUnit({ metric: '4 - 10km', imperial: '3 - 6mil', currentUnits }) },
		{ name: t('description.range.4'), value: selectUnit({ metric: '10 - 20km', imperial: '6 - 12mil', currentUnits }) },
		{
			name: t('description.range.5'),
			value: selectUnit({ metric: '20 - 50km', imperial: '12 - 30mil', currentUnits }),
		},
		{ name: t('description.range.6'), value: selectUnit({ metric: '> 50km', imperial: '> 30mil', currentUnits }) },
	];

	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('modal.description')}>
				<StyledText type="body">{t('range.text')}</StyledText>
			</ContentRow>
			<ContentRow title={t('range.values')}>
				<ValuesList values={rangeValues} valueColor="!text-[#39C1C7]" />
			</ContentRow>
		</View>
	);
};

import { useTranslate } from '@tolgee/react';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { ContentRow } from '@nativeweather/ui/components/common/layout/ContentRow';
import { ValuesList } from '@nativeweather/ui/components/common/modal/ValuesList';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const RangeModal = () => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');

	const switchUnits = (kilometeres: string, miles: string) =>
		currentUnits === 'metric' ? kilometeres + 'km' : miles + 'mil';

	const rangeValues = [
		{
			name: t('description.range.0'),
			value: switchUnits('0 - 1', '0 - 1'),
		},
		{
			name: t('description.range.1'),
			value: switchUnits('1 - 2', '1 - 2'),
		},
		{
			name: t('description.range.2'),
			value: switchUnits('2 - 4', '2 - 3'),
		},
		{
			name: t('description.range.3'),
			value: switchUnits('4 - 10', '3 - 6'),
		},
		{
			name: t('description.range.4'),
			value: switchUnits('10 - 20', '6 - 12'),
		},
		{
			name: t('description.range.5'),
			value: switchUnits('20 - 50', '12 - 30'),
		},
		{
			name: t('description.range.6'),
			value: switchUnits('> 50', '> 30'),
		},
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

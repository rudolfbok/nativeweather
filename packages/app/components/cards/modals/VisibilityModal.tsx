import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/ui/ContentRow';
import { ValuesList } from 'app/components/common/ui/ValuesList';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const VisibilityModal = () => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');

	const switchUnits = (kilometeres: string, miles: string) =>
		currentUnits === 'metric' ? kilometeres + 'km' : miles + 'mil';

	const visibilityValues = [
		{
			name: t('description.visibility.0'),
			value: switchUnits('0 - 1', '0 - 1'),
		},
		{
			name: t('description.visibility.1'),
			value: switchUnits('1 - 2', '1 - 2'),
		},
		{
			name: t('description.visibility.2'),
			value: switchUnits('2 - 4', '2 - 3'),
		},
		{
			name: t('description.visibility.3'),
			value: switchUnits('4 - 10', '3 - 6'),
		},
		{
			name: t('description.visibility.4'),
			value: switchUnits('10 - 20', '6 - 12'),
		},
		{
			name: t('description.visibility.5'),
			value: switchUnits('20 - 50', '12 - 30'),
		},
		{
			name: t('description.visibility.6'),
			value: switchUnits('> 50', '> 30'),
		},
	];

	return (
		<View className={clsx('gap-2')}>
			<ContentRow title={t('modal.description')}>
				<StyledText type="body">{t('visibility.text')}</StyledText>
			</ContentRow>
			<ContentRow title={t('visibility.values')}>
				<ValuesList values={visibilityValues} valueColor="!text-[#39C1C7]" />
			</ContentRow>
		</View>
	);
};

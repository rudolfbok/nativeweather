import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { useTranslate } from '@tolgee/react';
import { Eye } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { useStorageString } from 'app/storage/useStorageString';
import { RoundView } from 'app/components/common/RoundView';
import { Separator } from 'app/components/common/Separator';
import { clsx } from 'clsx';
import { ModalValueItem } from './ModalValueItem';

export const VisibilityModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
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
			value: switchUnits('>50', '>30'),
		},
	];

	return (
		<StyledModal visible={visible} icon={<Eye color="#39C1C7" />} header={t('visibility.title')} onClose={onClose}>
			<View className={clsx('gap-2')}>
				<StyledText type="body">{t('visibility.text')}</StyledText>
				<RoundView className={clsx('gap-4 p-4')}>
					{visibilityValues.map(({ name, value }, index) => (
						<View key={index} className={clsx('gap-4')}>
							<ModalValueItem showItemIndex={false} textcolor="dark:text-blue-600" name={name} value={value} />
							{index < visibilityValues.length - 1 && <Separator />}
						</View>
					))}
				</RoundView>
			</View>
		</StyledModal>
	);
};

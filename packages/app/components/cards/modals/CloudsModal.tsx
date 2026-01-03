import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import { Separator } from 'app/components/common/Separator';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { CloudsIcon } from 'app/components/icons/CloudsIcon';
import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';
import { ModalValueItem } from './ModalValueItem';

export const CloudsModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');

	const cloudCoverValues = [
		{
			name: t('description.cloudcover.0'),
			value: '0 - 12%',
		},
		{
			name: t('description.cloudcover.1'),
			value: '12 - 50%',
		},
		{
			name: t('description.cloudcover.2'),
			value: '50 - 75%',
		},
		{
			name: t('description.cloudcover.3'),
			value: '75 - 10%',
		},
	];

	return (
		<StyledModal visible={visible} icon={<CloudsIcon />} header={t('cloudcover.title')} onClose={onClose}>
			<View className={clsx('gap-2')}>
				<StyledText type="subtitle">{t('cloudcover.percentage.title')}</StyledText>
				<RoundView className={clsx('p-4')}>
					<StyledText type="body">{t('cloudcover.percentage.text')}</StyledText>
				</RoundView>
				<StyledText type="subtitle">{t('cloudcover.percentage.values')}</StyledText>
				<RoundView className={clsx('gap-4 p-4')}>
					{cloudCoverValues.map(({ name, value }, index) => (
						<View key={index} className={clsx('gap-4')}>
							<ModalValueItem showItemIndex={false} name={name} value={value} />
							{index < cloudCoverValues.length - 1 && <Separator />}
						</View>
					))}
				</RoundView>
			</View>
		</StyledModal>
	);
};

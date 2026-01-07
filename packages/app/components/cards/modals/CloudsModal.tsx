import { useTranslate } from '@tolgee/react';
import { ContentRow } from 'app/components/common/ContentRow';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { ValuesList } from 'app/components/common/ValuesList';
import { CloudsIcon } from 'app/components/icons/CloudsIcon';
import { clsx } from 'clsx';
import { GestureResponderEvent, View } from 'react-native';

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
				<ContentRow title={t('cloudcover.percentage.title')}>
					<StyledText type="body">{t('cloudcover.percentage.text')}</StyledText>
				</ContentRow>
				<ContentRow title={t('cloudcover.percentage.values')}>
					<ValuesList values={cloudCoverValues} />
				</ContentRow>
			</View>
		</StyledModal>
	);
};

import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { clsx } from 'clsx';
import { Sunset } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';

export const SunsetModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');

	return (
		<StyledModal visible={visible} icon={<Sunset color="#F75B02" />} header={t('sunset.modaltitle')} onClose={onClose}>
			<View className={clsx('gap-2')}>
				<RoundView className={clsx('p-4')}>
					<StyledText type="body">{t('sunset.text')}</StyledText>
				</RoundView>
				<StyledText type="subtitle">{t('sunset.twilight.title')}</StyledText>
				<RoundView className={clsx('p-4')}>
					<StyledText type="body">{t('sunset.twilight.text')}</StyledText>
				</RoundView>
			</View>
		</StyledModal>
	);
};

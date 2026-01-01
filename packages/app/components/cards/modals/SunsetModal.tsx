import { useTranslate } from '@tolgee/react';
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
				<StyledText type="body">{t('sunset.text')}</StyledText>
				<View>
					<StyledText type="subtitle">{t('sunset.twilight.title')}</StyledText>
					<StyledText type="body">{t('sunset.twilight.text')}</StyledText>
				</View>
			</View>
		</StyledModal>
	);
};

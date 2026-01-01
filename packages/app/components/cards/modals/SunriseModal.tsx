import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { useTranslate } from '@tolgee/react';
import { Sunrise } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { clsx } from 'clsx';

export const SunriseModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');

	return (
		<StyledModal
			visible={visible}
			icon={<Sunrise color="#FFBF04" />}
			header={t('sunrise.modaltitle')}
			onClose={onClose}
		>
			<View className={clsx('gap-2')}>
				<StyledText type="body">{t('sunrise.text')}</StyledText>
				<View>
					<StyledText type="subtitle">{t('sunrise.dawn.title')}</StyledText>
					<StyledText type="body">{t('sunrise.dawn.text')}</StyledText>
				</View>
			</View>
		</StyledModal>
	);
};

import { useTranslate } from '@tolgee/react';
import { ContentRow } from 'app/components/common/ContentRow';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { clsx } from 'clsx';
import { Sunrise } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';

export const SunriseModal = ({
	visible,
	onClose
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
				<ContentRow title={t('modal.description')}>
					<StyledText type="body">{t('sunrise.text')}</StyledText>
				</ContentRow>
				<ContentRow title={t('sunrise.dawn.title')}>
					<StyledText type="body">{t('sunrise.dawn.text')}</StyledText>
				</ContentRow>
			</View>
		</StyledModal>
	);
};

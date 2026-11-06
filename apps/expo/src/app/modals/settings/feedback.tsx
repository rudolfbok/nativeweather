import { FeedbackForm, ModalScreen } from '@/ui';
import { useTranslate } from '@tolgee/react';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function FeedbackModal() {
	const { t } = useTranslate('settings');
	const { stacked, onBack, onClose } = useStackedModal();

	return (
		<ModalScreen header={t('feedback.title')} stacked={stacked} onBack={onBack} onClose={onClose}>
			<FeedbackForm />
		</ModalScreen>
	);
}

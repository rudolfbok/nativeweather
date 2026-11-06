import { FeedbackForm } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { AppModalScreen } from '@/components/AppModalScreen';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function FeedbackModal() {
	const { t } = useTranslate('settings');
	const { stacked, onBack, onClose } = useStackedModal();

	return (
		<AppModalScreen header={t('feedback.title')} stacked={stacked} onBack={onBack} onClose={onClose}>
			<FeedbackForm />
		</AppModalScreen>
	);
}

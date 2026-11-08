import { AboutContent, ModalScreen } from '@/ui';
import { useTranslate } from '@tolgee/react';
import { useStackedModal } from '@/hooks/useStackedModal';
import { openExternal } from '@/openExternal';

export default function AboutModal() {
	const { t } = useTranslate('settings');
	const { stacked, onBack, onClose } = useStackedModal();

	return (
		<ModalScreen header={t('about.title')} stacked={stacked} onBack={onBack} onClose={onClose}>
			<AboutContent openUrl={openExternal} />
		</ModalScreen>
	);
}

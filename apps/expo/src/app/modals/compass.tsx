import { Compass, ModalScreen } from '@/ui';
import { useTranslate } from '@tolgee/react';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function CompassModal() {
	const { t } = useTranslate('weather');
	const { stacked, onBack, onClose } = useStackedModal();

	return (
		<ModalScreen size="narrow" header={t('compass.title')} stacked={stacked} onBack={onBack} onClose={onClose}>
			<Compass />
		</ModalScreen>
	);
}

import { Compass } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { AppModalScreen } from '@/components/AppModalScreen';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function CompassModal() {
	const { t } = useTranslate('weather');
	const { stacked, onBack, onClose } = useStackedModal();

	return (
		<AppModalScreen size="narrow" header={t('compass.title')} stacked={stacked} onBack={onBack} onClose={onClose}>
			<Compass />
		</AppModalScreen>
	);
}

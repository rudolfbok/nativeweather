import { AboutContent } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { AppModalScreen } from '@/components/AppModalScreen';
import { useStackedModal } from '@/hooks/useStackedModal';
import { openExternal } from '@/openExternal';

export default function AboutModal() {
	const { t } = useTranslate('settings');
	const { stacked, onBack, onClose } = useStackedModal();

	return (
		<AppModalScreen header={t('about.title')} stacked={stacked} onBack={onBack} onClose={onClose}>
			<AboutContent openUrl={openExternal} />
		</AppModalScreen>
	);
}

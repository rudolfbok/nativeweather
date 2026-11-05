import { isPollutant, ModalScreen, PollutantDetail, pollutants } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function PollutantModal() {
	const { pollutant } = useLocalSearchParams<{ pollutant: string }>();
	const { t } = useTranslate('weather');
	const { stacked, onBack, onClose } = useStackedModal();

	if (!isPollutant(pollutant)) return <Redirect href="/" />;

	return (
		<ModalScreen
			header={t(`airquality.item.${pollutants[pollutant].itemKey}`)}
			stacked={stacked}
			onBack={onBack}
			onClose={onClose}
		>
			<PollutantDetail pollutant={pollutant} />
		</ModalScreen>
	);
}

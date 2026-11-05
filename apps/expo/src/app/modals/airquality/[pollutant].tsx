import { isPollutant, PollutantDetail, pollutants } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useStackedModal } from '@/hooks/useStackedModal';
import { AppModalScreen } from '@/components/AppModalScreen';

export default function PollutantModal() {
	const { pollutant } = useLocalSearchParams<{ pollutant: string }>();
	const { t } = useTranslate('weather');
	const { stacked, onBack, onClose } = useStackedModal();

	if (!isPollutant(pollutant)) return <Redirect href="/" />;

	return (
		<AppModalScreen
			header={t(`airquality.item.${pollutants[pollutant].itemKey}`)}
			stacked={stacked}
			onBack={onBack}
			onClose={onClose}
		>
			<PollutantDetail pollutant={pollutant} />
		</AppModalScreen>
	);
}

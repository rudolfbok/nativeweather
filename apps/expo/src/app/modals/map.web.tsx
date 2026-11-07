import { MapIcon, ModalScreen } from '@/ui';
import { MapLibreView } from '@/ui/components/maps/MapLibreView.web';
import { useTranslate } from '@tolgee/react';
import { View } from 'react-native';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function MapModal() {
	const { t } = useTranslate('weather');
	const { stacked, onBack, onClose } = useStackedModal();

	return (
		<ModalScreen
			size="wide"
			icon={<MapIcon />}
			header={t('maps.title')}
			stacked={stacked}
			onBack={onBack}
			onClose={onClose}
		>
			<View className="h-[70vh]">
				<MapLibreView interactive />
			</View>
		</ModalScreen>
	);
}

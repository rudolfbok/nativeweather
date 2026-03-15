import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { AlertModal } from 'app/components/weather/alerts/AlertModal';

export default function AlertModalScreen() {
	return (
		<ModalScrollView>
			<AlertModal />
		</ModalScrollView>
	);
}

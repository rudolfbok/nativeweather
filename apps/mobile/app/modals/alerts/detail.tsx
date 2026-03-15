import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { AlertDetail } from 'app/components/weather/alerts/AlertDetail';

export default function AlertDetailScreen() {
	return (
		<ModalScrollView>
			<AlertDetail />
		</ModalScrollView>
	);
}

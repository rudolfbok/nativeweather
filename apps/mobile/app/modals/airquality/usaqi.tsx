import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { USAQIDetail } from 'app/components/weather/airquality/USAQIDetail';

export default function USAQIModalScreen() {
	return (
		<ModalScrollView>
			<USAQIDetail />
		</ModalScrollView>
	);
}

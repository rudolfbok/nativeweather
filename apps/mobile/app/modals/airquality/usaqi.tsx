import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';
import { USAQIDetail } from 'app/components/airquality/USAQIDetail';

export default function USAQIModalScreen() {
	return (
		<ModalScrollView>
			<USAQIDetail />
		</ModalScrollView>
	);
}

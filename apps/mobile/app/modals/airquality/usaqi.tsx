import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { USAQIDetail } from '@nativeweather/ui/components/airquality/USAQIDetail';

export default function USAQIModalScreen() {
	return (
		<ModalScrollView>
			<USAQIDetail />
		</ModalScrollView>
	);
}

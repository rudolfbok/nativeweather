import { EUAQIDetail } from 'app/components/weather/airquality/EUAQIDetail';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function EUAQIModalScreen() {
	return (
		<ModalScrollView>
			<EUAQIDetail />
		</ModalScrollView>
	);
}

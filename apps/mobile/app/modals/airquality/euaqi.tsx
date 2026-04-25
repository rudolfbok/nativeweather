import { EUAQIDetail } from 'app/components/weather/airquality/EUAQIDetail';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';
import { ScreenWrapper } from 'app/components/common/ui/ScreenWrapper';

export default function EUAQIModalScreen() {
	return (
		<ScreenWrapper>
			<EUAQIDetail />
		</ScreenWrapper>
	);
}

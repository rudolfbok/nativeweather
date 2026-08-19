import { EUAQIDetail } from 'app/components/airquality/EUAQIDetail';
import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';
import { ScreenWrapper } from 'app/components/layout/ScreenWrapper';

export default function EUAQIModalScreen() {
	return (
		<ScreenWrapper>
			<EUAQIDetail />
		</ScreenWrapper>
	);
}

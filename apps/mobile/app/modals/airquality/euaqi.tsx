import { EUAQIDetail } from '@nativeweather/ui/components/airquality/EUAQIDetail';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';
import { ScreenWrapper } from '@nativeweather/ui/components/common/layout/ScreenWrapper';

export default function EUAQIModalScreen() {
	return (
		<ScreenWrapper>
			<EUAQIDetail />
		</ScreenWrapper>
	);
}

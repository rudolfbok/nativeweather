import { UVModal } from '@nativeweather/ui/components/cards/uv/UVModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function UVScreen() {
	return (
		<ModalScrollView>
			<UVModal />
		</ModalScrollView>
	);
}

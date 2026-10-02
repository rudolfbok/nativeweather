import { FeedbackFeature } from '@nativeweather/ui/features/feedback/screen';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function FeedbackModalScreen() {
	return (
		<ModalScrollView>
			<FeedbackFeature />
		</ModalScrollView>
	);
}

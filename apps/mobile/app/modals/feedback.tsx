import { FeedbackFeature } from 'app/features/feedback/screen';
import { ModalScrollView } from 'app/components/common/modal/ModalScrollView';

export default function FeedbackModalScreen() {
	return (
		<ModalScrollView>
			<FeedbackFeature modal={true} />
		</ModalScrollView>
	);
}

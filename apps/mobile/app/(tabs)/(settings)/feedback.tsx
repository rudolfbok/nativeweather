import { ScreenWrapper } from 'app/components/common/ui/ScreenWrapper';
import { SendEmail } from 'app/components/settings/SendEmail';

export default function FeedbackScreen() {
	return (
		<ScreenWrapper>
			<SendEmail />
		</ScreenWrapper>
	);
}

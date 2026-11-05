// TEMP(phase-5): checks how a modal route presents on each platform; delete before Phase 6.
import { ModalScreen, RoundView, Text } from '@nativeweather/ui';
import { Redirect, router } from 'expo-router';

const ModalCheck = () => (
	<ModalScreen header="Modal route check" subHeader="Opened as an Expo Router route" onClose={() => router.back()}>
		<RoundView className="p-4">
			<Text type="body">The previous screen should stay visible behind the blur on web.</Text>
		</RoundView>
	</ModalScreen>
);

export default function ModalCheckRoute() {
	return __DEV__ ? <ModalCheck /> : <Redirect href="/" />;
}

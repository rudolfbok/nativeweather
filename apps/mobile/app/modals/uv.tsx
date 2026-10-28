import { useLocalSearchParams } from 'expo-router';
import { UVModal } from '@nativeweather/ui/components/cards/uv/UVModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function UVScreen() {
	const { date } = useLocalSearchParams<{ date?: string }>();
	return (
		<ModalScrollView>
			<UVModal initialDate={date} />
		</ModalScrollView>
	);
}

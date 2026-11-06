import { Share } from 'lucide-react-native';
import { Pressable } from 'react-native';

// Android's header action next to the favourite star; iOS has a native menu instead.
export const ShareButton = ({ label, onPress, color }: { label: string; onPress: () => void; color: string }) => (
	<Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
		<Share size={28} color={color} />
	</Pressable>
);

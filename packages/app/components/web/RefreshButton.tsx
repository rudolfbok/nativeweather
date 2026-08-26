'use client';

import { StyledButton } from 'app/components/common/styled/StyledButton';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { RefreshCw } from 'lucide-react-native';

export const RefreshButton = () => {
	const router = useRouter();

	return (
		<StyledButton
			className="px-6 py-3"
			icon={<RefreshCw color="#007AFF" size={22} />}
			onPress={() => router.push('/')}
			text="Refresh"
		/>
	);
};

'use client';

import { StyledButton } from 'app/components/common/styled/StyledButton';
import { RefreshCw } from 'lucide-react-native';

export const RefreshButton = () => (
	<StyledButton
		className="px-6 py-3"
		icon={<RefreshCw color="#007AFF" size={22} />}
		onPress={() => window.location.assign('/')}
		text="Refresh"
	/>
);

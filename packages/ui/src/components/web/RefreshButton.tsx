'use client';

import { StyledButton } from '../common/styled/StyledButton';
import { useRouter } from '../../hooks/navigation/useRouter';

export const RefreshButton = () => {
	const router = useRouter();

	return <StyledButton className="px-6 py-3" onPress={() => router.push('/')} text="Refresh" />;
};

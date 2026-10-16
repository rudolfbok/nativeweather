'use client';

import { StyledButton } from '@nativeweather/ui/components/common/styled/StyledButton';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';

export const RefreshButton = () => {
	const router = useRouter();

	return <StyledButton className="px-6 py-3" onPress={() => router.push('/')} text="Refresh" />;
};

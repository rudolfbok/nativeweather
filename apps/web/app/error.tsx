'use client';

import { StatusPage } from '@nativeweather/ui/components/web/StatusPage';
import { RefreshButton } from '@nativeweather/ui/components/web/RefreshButton';
import { useEffect } from 'react';
import { ErrorIcon } from '@nativeweather/ui/components/icons/ui/ErrorIcon';

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<StatusPage
			title="There was an error"
			icon={<ErrorIcon />}
			description="There was an error loading loading the application, please refresh and try again."
			actions={<RefreshButton />}
		/>
	);
}

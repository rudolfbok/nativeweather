'use client';

import { ReactNode, useEffect, useState } from 'react';

export const ClientOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (fallback && typeof window === undefined) return fallback;

	if (!mounted) return null;
	return <>{children}</>;
};

'use client';

import { ReactNode, useEffect, useState } from 'react';

export const ClientOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return fallback ?? null;
	return <>{children}</>;
};

'use client';

import { ReactNode, useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const ClientOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => {
	const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

	if (!mounted) return fallback ?? null;
	return <>{children}</>;
};

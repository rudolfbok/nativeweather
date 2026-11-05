import { router, useNavigation } from 'expo-router';
import { useSyncExternalStore } from 'react';

/** Back/close handlers for a modal route that may be pushed on top of another modal. */
export const useStackedModal = () => {
	const navigation = useNavigation();
	// Subscribed rather than read once: the stack state can still be the old one on a screen's first render.
	const index = useSyncExternalStore(
		(onChange) => navigation.addListener('state', onChange),
		() => navigation.getState()?.index ?? 0
	);
	const stacked = index > 0;

	return {
		stacked,
		// Stacked: back returns to the modal underneath, close dismisses both.
		onBack: stacked ? () => router.back() : undefined,
		onClose: () => {
			if (stacked) navigation.getParent()?.goBack();
			else if (router.canGoBack()) router.back();
			else router.replace('/');
		},
	};
};

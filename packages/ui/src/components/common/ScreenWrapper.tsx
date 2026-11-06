import type { ReactElement, ReactNode } from 'react';
import type { RefreshControlProps } from 'react-native';
import { Platform, ScrollView, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ScreenWrapperProps {
	refreshControl?: ReactElement<RefreshControlProps>;
	/** Colour revealed above the content when it is pulled down past the top (iOS bounce). */
	overscrollColor?: string;
	/** For screens with a text field: taps on content land while the keyboard is up, and dragging dismisses it. */
	dismissKeyboard?: boolean;
	children: ReactNode;
}

// The scroll view is the whole screen: iOS ties the large title and the blur under the header to it, so routes
// render this directly, with nothing around it.
// The overscroll colour is the scroll view's own background rather than a view in the content: a native
// pull-to-refresh spinner is drawn behind the content views, so anything opaque up there would hide it.
export const ScreenWrapper = ({ refreshControl, overscrollColor, dismissKeyboard, children }: ScreenWrapperProps) => {
	const bounce = Platform.OS === 'ios' && overscrollColor !== undefined;

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerClassName={twMerge('px-4 pt-2 pb-4', bounce && 'grow bg-screen-background')}
			style={bounce ? { backgroundColor: overscrollColor } : undefined}
			keyboardShouldPersistTaps={dismissKeyboard ? 'handled' : undefined}
			keyboardDismissMode={dismissKeyboard ? 'on-drag' : undefined}
			refreshControl={refreshControl}
		>
			{children}
			{/* Hides the sky colour again when the content is pulled past the bottom. */}
			{bounce && (
				<View pointerEvents="none" className="absolute inset-x-0 -bottom-[1000px] h-[1000px] bg-screen-background" />
			)}
		</ScrollView>
	);
};

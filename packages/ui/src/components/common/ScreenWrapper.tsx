import type { ReactElement, ReactNode } from 'react';
import type { RefreshControlProps } from 'react-native';
import { Platform, ScrollView, View } from 'react-native';

interface ScreenWrapperProps {
	refreshControl?: ReactElement<RefreshControlProps>;
	/** Colour revealed above the content when it is pulled down past the top (iOS bounce). */
	overscrollColor?: string;
	children: ReactNode;
}

// The colour is the scroll view's own background rather than a view in the content: a native pull-to-refresh
// spinner is drawn behind the content views, so anything opaque up there would hide it.
export const ScreenWrapper = ({ refreshControl, overscrollColor, children }: ScreenWrapperProps) => {
	const bounce = Platform.OS === 'ios' && overscrollColor !== undefined;

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerClassName="grow bg-screen-background px-4 pt-2"
			style={bounce ? { backgroundColor: overscrollColor } : undefined}
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

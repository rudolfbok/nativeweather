import type { ReactElement, ReactNode } from 'react';
import type { RefreshControlProps } from 'react-native';
import { ScrollView } from 'react-native';

interface ScreenWrapperProps {
	refreshControl?: ReactElement<RefreshControlProps>;
	children: ReactNode;
}

export const ScreenWrapper = ({ refreshControl, children }: ScreenWrapperProps) => (
	<ScrollView
		contentInsetAdjustmentBehavior="automatic"
		contentContainerClassName="px-4 pt-2"
		refreshControl={refreshControl}
	>
		{children}
	</ScrollView>
);

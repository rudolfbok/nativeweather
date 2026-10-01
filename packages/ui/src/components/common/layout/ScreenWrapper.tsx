import { ReactElement, ReactNode } from 'react';
import { RefreshControlProps, ScrollView } from 'react-native';

interface ScreenWrapperProps {
	refreshControl?: ReactElement<RefreshControlProps>;
	children: ReactNode;
}

export const ScreenWrapper = ({ refreshControl, children }: ScreenWrapperProps) => {
	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerClassName="px-4"
			refreshControl={refreshControl}
		>
			{children}
		</ScrollView>
	);
};

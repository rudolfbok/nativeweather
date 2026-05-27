import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

interface ScreenWrapperProps {
	refreshControl?: any;
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

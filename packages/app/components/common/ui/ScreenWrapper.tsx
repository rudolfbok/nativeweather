import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

interface ScreenWrapperProps {
	children: ReactNode;
	contentContainerClassName?: string;
	refreshControl?: any;
}

export const ScreenWrapper = ({ children, refreshControl, contentContainerClassName }: ScreenWrapperProps) => {
	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerClassName="px-4 pb-4"
			refreshControl={refreshControl}
		>
			{children}
		</ScrollView>
	);
};

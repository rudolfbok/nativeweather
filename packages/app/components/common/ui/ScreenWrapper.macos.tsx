import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

interface ScreenWrapperProps {
	children: ReactNode;
}

export const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerClassName="px-40 py-4">
			{children}
		</ScrollView>
	);
};

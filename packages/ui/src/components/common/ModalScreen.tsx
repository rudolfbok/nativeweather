import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { ModalHeader } from './ModalHeader';
import type { ModalHeaderProps } from './ModalHeader';

interface ModalScreenProps extends ModalHeaderProps {
	children: ReactNode;
}

export const ModalScreen = ({ children, ...headerProps }: ModalScreenProps) => (
	<View className="flex-1 bg-modal-background px-4 pt-4">
		<ModalHeader {...headerProps} />
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			showsVerticalScrollIndicator={false}
			contentContainerClassName="pb-4"
		>
			{children}
		</ScrollView>
	</View>
);

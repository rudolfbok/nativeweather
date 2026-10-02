import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { StyledText } from '../styled/StyledText';

interface ModalHeaderProps {
	icon?: ReactNode;
	header?: string;
}

export const ModalHeader = ({ icon, header }: ModalHeaderProps) => {
	return (
		<View className={clsx('flex-row items-center gap-2')}>
			{icon}
			<StyledText type="title" className="font-bold">
				{header}
			</StyledText>
		</View>
	);
};

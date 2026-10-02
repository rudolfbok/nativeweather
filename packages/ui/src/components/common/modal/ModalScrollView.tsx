import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

export const ModalScrollView = ({ children }: { children: ReactNode }) => {
	return (
		<ScrollView
			className={clsx('flex-1 bg-secondarySystemBackground dark:bg-[#0E0E0F]')}
			contentInsetAdjustmentBehavior="always"
			contentContainerClassName={clsx('px-4 pt-2')}
		>
			{children}
		</ScrollView>
	);
};

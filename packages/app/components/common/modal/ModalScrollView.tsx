import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

export const ModalScrollView = ({ children }: { children: ReactNode }) => {
	return (
		<ScrollView
			className={clsx('bg-secondarySystemBackground flex-1 dark:bg-[#0E0E0F]')}
			contentInsetAdjustmentBehavior="always"
			contentContainerClassName={clsx('px-4')}
		>
			{children}
		</ScrollView>
	);
};

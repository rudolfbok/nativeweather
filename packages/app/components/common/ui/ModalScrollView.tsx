import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

export const ModalScrollView = ({ children }: { children: ReactNode }) => {
	return (
		<ScrollView
			className={clsx('bg-secondarySystemBackground flex-1 px-4 pt-20 dark:bg-[#0E0E0F]')}
			contentContainerclassName={clsx('pb-6')}
		>
			{children}
		</ScrollView>
	);
};

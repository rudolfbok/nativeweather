import { ReactNode, useRef } from 'react';
import { ScrollView } from 'react-native';
import { clsx } from 'clsx';

interface ScreenWrapperProps {
	className?: string;
	children: ReactNode;
	resetKey?: string;
}

export const ScreenWrapper = ({ className, children }: ScreenWrapperProps) => {
	const scrollRef = useRef<ScrollView>(null);
	const resetPending = useRef(false);

	// useEffect(() => {
	// 	resetPending.current = true;
	// 	scrollRef.current?.scrollTo({ y: 0, animated: false });
	// }, [resetKey]);

	return (
		<ScrollView
			ref={scrollRef}
			automaticallyAdjustContentInsets={false}
			contentContainerClassName={clsx('p-4', className)}
			onContentSizeChange={() => {
				if (!resetPending.current) return;

				scrollRef.current?.scrollTo({ y: 0, animated: false });
				resetPending.current = false;
			}}
		>
			{children}
		</ScrollView>
	);
};

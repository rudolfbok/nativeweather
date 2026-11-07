import type { ReactNode } from 'react';
import { View } from 'react-native';
import { ErrorIcon } from '../icons/ui/ErrorIcon';
import { NotFoundIcon } from '../icons/ui/NotFoundIcon';
import { Text } from './Text';

export type StatusIcon = 'notfound' | 'error';

interface StatusViewProps {
	icon: StatusIcon;
	title: string;
	message: string;
	/** Buttons or links below the message. */
	children?: ReactNode;
}

const icons = { notfound: NotFoundIcon, error: ErrorIcon };

/** A centred illustration, title and message in place of a page that has nothing to show. */
export const StatusView = ({ icon, title, message, children }: StatusViewProps) => {
	const Icon = icons[icon];

	return (
		<View role="status" className="w-full items-center gap-4 px-4 pt-8 pb-12">
			<Icon />
			<View className="max-w-md items-center gap-2">
				<Text type="herotitle" className="text-center font-semibold">
					{title}
				</Text>
				<Text type="body" className="text-center text-secondary-label">
					{message}
				</Text>
			</View>
			{children && <View className="mt-2 w-full max-w-md items-center gap-3">{children}</View>}
		</View>
	);
};

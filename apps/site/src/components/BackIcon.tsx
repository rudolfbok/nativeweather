import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Text } from './Text';

interface BackIconProps {
	to?: string;
}

export const BackIcon = ({ to = '/' }: BackIconProps) => {
	return (
		<Link to={to} className="mb-4 inline-flex items-center gap-4">
			<div className="rounded-full border border-black/10 p-1.5 dark:border-white/30">
				<ChevronLeft aria-hidden="true" className="h-5 w-5 text-black dark:text-white" />
			</div>
			<Text>Back</Text>
		</Link>
	);
};

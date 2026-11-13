import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface TextProps {
	as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	children: ReactNode;
	className?: string;
}

export const Text = ({ as, children, className }: TextProps) => {
	const Tag = as ?? 'span';

	return <Tag className={clsx('text-center dark:text-white', className)}>{children}</Tag>;
};

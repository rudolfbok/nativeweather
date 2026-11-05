import type { TextProps as NativeTextProps } from 'react-native';
import { Text as NativeText } from 'react-native';
import { twMerge } from 'tailwind-merge';

const textStyles = {
	screentitle: 'text-3xl font-bold web:text-xl',
	herotitle: 'text-3xl font-medium web:text-2xl web:md:text-3xl',
	display: 'text-[42px]/12 web:text-4xl',
	locationmeta: 'text-xl opacity-70 web:text-lg web:md:text-xl',
	sectiontitle: 'text-[17px]/6 font-semibold web:text-base web:md:text-lg',
	title: 'text-[17px]/6 font-semibold web:text-lg',
	body: 'text-base',
	caption: 'text-sm',
	data: 'text-[26px]/8 font-normal web:text-2xl',
	link: 'text-base font-semibold text-primary-blue web:hover:underline',
};

export type TextType = keyof typeof textStyles;

export interface TextProps extends NativeTextProps {
	type: TextType;
}

export const Text = ({ type, className, ...props }: TextProps) => (
	<NativeText className={twMerge('text-label', textStyles[type], className)} {...props} />
);

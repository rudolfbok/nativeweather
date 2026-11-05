import type { TextProps as NativeTextProps } from 'react-native';
import { Text as NativeText } from 'react-native';
import { twMerge } from 'tailwind-merge';

const textStyles = {
	screentitle: 'text-4xl font-bold web:text-xl',
	herotitle: 'text-4xl font-medium web:text-2xl web:md:text-3xl max-xs:text-xl',
	display: 'text-5xl web:text-4xl max-xs:text-3xl',
	locationmeta: 'text-2xl opacity-70 web:text-lg web:md:text-xl max-xs:text-base',
	sectiontitle: 'text-xl font-semibold web:text-base web:md:text-lg max-xs:text-[15px]',
	title: 'text-xl font-semibold web:text-lg max-xs:text-[16px]',
	body: 'text-lg web:text-base max-xs:text-[14px]',
	caption: 'text-base web:text-sm',
	data: 'text-3xl font-normal web:text-2xl max-xs:text-xl',
	link: 'text-lg font-semibold text-primary-blue web:text-base web:hover:underline',
};

export type TextType = keyof typeof textStyles;

export interface TextProps extends NativeTextProps {
	type: TextType;
}

export const Text = ({ type, className, ...props }: TextProps) => (
	<NativeText className={twMerge('text-label', textStyles[type], className)} {...props} />
);

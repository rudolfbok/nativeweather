import { clsx } from 'clsx';
import { Text, TextProps } from 'react-native';

const textStyles = {
	screentitle: 'text-4xl web:text-xl font-bold',
	maintitle: 'text-xl web:text-xl font-bold',
	link: 'text-primaryblue dark:text-primaryblue text-lg web:text-base font-semibold hover:underline',

	maintemp: 'text-5xl web:text-4xl',
	country: 'text-2xl web:text-lg web:md:text-xl text-black/60 dark:text-white/60',
	city: 'text-4xl web:text-2xl web:md:text-3xl font-medium',
	title: 'text-xl web:text-lg font-semibold',
	data: 'text-3xl web:text-2xl font-normal',
	subtitle: 'text-lg web:text-base web:md:text-lg font-semibold native:font-bold',
	body: 'text-lg web:text-base',
	bodysecondary: 'text-base web:text-sm',
	rainchance: 'text-sm web:text-xs text-primaryblue font-semibold',
	localtime: 'text-base web:text-sm text-primaryblue dark:text-primaryblue',
};

interface StyledTextProps extends TextProps {
	children: React.ReactNode;
	className?: string;
	type: keyof typeof textStyles;
}

export const StyledText = ({ children, type, className, ...rest }: StyledTextProps) => {
	return (
		<Text className={clsx('text-label dark:text-label_dark', textStyles[type], className)} {...rest}>
			{children}
		</Text>
	);
};

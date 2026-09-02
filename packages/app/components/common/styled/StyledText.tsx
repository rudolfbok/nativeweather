import { clsx } from 'clsx';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

const textStyles = {
	screentitle: 'text-4xl web:text-xl font-bold',
	maintitle: 'text-xl web:text-xl font-bold',
	link: 'text-primaryblue dark:text-primaryblue text-lg web:text-base font-semibold hover:underline',

	maintemp: 'text-5xl web:text-4xl max-xs:text-3xl',
	country: 'text-2xl web:text-lg web:md:text-xl opacity-70 max-xs:text-base',
	city: 'text-4xl web:text-2xl web:md:text-3xl font-medium max-xs:text-xl',
	title: 'text-xl web:text-lg font-semibold max-xs:text-[16px]',
	data: 'text-3xl web:text-2xl font-normal max-xs:text-xl',
	subtitle: 'text-xl web:text-base web:md:text-lg font-semibold native:font-bold max-xs:text-[15px]',
	body: 'text-lg web:text-base max-xs:text-base max-xs:text-[14px]',
	bodysecondary: 'text-base web:text-sm',
	rainchance: 'text-sm web:text-xs text-primaryblue font-semibold',
	localtime: 'text-base web:text-sm text-primaryblue dark:text-primaryblue',
};

interface StyledTextProps extends TextProps {
	children: React.ReactNode;
	className?: string;
	type: keyof typeof textStyles;
	style?: StyleProp<TextStyle>;
}

export const StyledText = ({ children, type, className, style, ...rest }: StyledTextProps) => {
	return (
		<Text className={clsx('text-label dark:text-label_dark', textStyles[type], className)} style={style} {...rest}>
			{children}
		</Text>
	);
};

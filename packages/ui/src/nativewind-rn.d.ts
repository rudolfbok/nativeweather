import 'react-native';

declare module 'react-native' {
	interface ViewProps {
		className?: string;
		cssInterop?: boolean;
	}
	interface TextProps {
		className?: string;
		cssInterop?: boolean;
	}
	interface PressableProps {
		className?: string;
		cssInterop?: boolean;
	}
	interface ScrollViewProps {
		className?: string;
		contentContainerClassName?: string;
		indicatorClassName?: string;
	}
	interface TextInputProps {
		className?: string;
		placeholderClassName?: string;
	}
	interface ImagePropsBase {
		className?: string;
		cssInterop?: boolean;
	}
	interface ImageBackgroundProps {
		imageClassName?: string;
	}
	interface FlatListProps<ItemT> {
		columnWrapperClassName?: string;
	}
}

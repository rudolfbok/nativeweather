import 'react-native/Libraries/Components/ScrollView/ScrollView';
import 'react-native/Libraries/Components/View/ViewPropTypes';
import 'react-native/Libraries/Text/Text';

declare module 'react-native/Libraries/Components/ScrollView/ScrollView' {
	interface ScrollViewProps {
		contentContainerClassName?: string;
		indicatorClassName?: string;
	}
}

declare module 'react-native/Libraries/Components/View/ViewPropTypes' {
	interface ViewProps {
		className?: string;
		cssInterop?: boolean;
	}
}

declare module 'react-native/Libraries/Text/Text' {
	interface TextProps {
		className?: string;
		cssInterop?: boolean;
	}
}

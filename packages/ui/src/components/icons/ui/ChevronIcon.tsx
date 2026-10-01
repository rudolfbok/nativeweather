import { useThemeColors } from '@nativeweather/ui/hooks/theme/useThemeColors';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';

export const ChevronIcon = () => {
	const { text } = useThemeColors();

	return <ChevronRight color={text} size={26} />;
};

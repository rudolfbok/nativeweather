import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';

export const ChevronIcon = () => {
	const chevronColor = useSwitchColors('black', 'white');

	return <ChevronRight color={chevronColor} size={26} />;
};

import type { NormalizedData } from '@nativeweather/types';
import { Star } from '@/ui/components/icons/lucide';
import { Pressable } from 'react-native';
import { useCSSVariable } from 'uniwind';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';

interface FavoriteStarProps {
	weather: NormalizedData;
	/** Defaults to the favourite colour. */
	color?: string;
	className?: string;
}

// iOS has a native menu instead; web shows this in the main card and Android in the header.
export const FavoriteStar = ({ weather, color, className }: FavoriteStarProps) => {
	const favorite = useCSSVariable('--color-favorite') as string;
	const { isFavorite, label, toggle } = useFavoriteToggle(weather);
	const tint = color ?? favorite;

	return (
		<Pressable onPress={toggle} accessibilityRole="button" accessibilityLabel={label(isFavorite)} className={className}>
			<Star size={30} color={tint} fill={isFavorite ? tint : 'transparent'} />
		</Pressable>
	);
};

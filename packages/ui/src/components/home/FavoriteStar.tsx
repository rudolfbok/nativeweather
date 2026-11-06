import { Star } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useCSSVariable } from 'uniwind';

interface FavoriteStarProps {
	isFavorite: boolean;
	label: string;
	onPress: () => void;
	/** Defaults to the favourite colour. */
	color?: string;
	className?: string;
}

// iOS has a native menu instead; web shows this in the main card and Android in the header.
export const FavoriteStar = ({ isFavorite, label, onPress, color, className }: FavoriteStarProps) => {
	const favorite = useCSSVariable('--color-favorite') as string;
	const tint = color ?? favorite;

	return (
		<Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} className={className}>
			<Star size={30} color={tint} fill={isFavorite ? tint : 'transparent'} />
		</Pressable>
	);
};

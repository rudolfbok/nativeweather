import type { NormalizedData } from '@nativeweather/types';
import { FavoriteStar } from '@nativeweather/ui';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';

export const FavoriteButton = ({
	weather,
	color,
	className,
}: {
	weather: NormalizedData;
	color?: string;
	className?: string;
}) => {
	const { isFavorite, label, toggle } = useFavoriteToggle(weather);

	return (
		<FavoriteStar
			isFavorite={isFavorite}
			label={label(isFavorite)}
			onPress={toggle}
			color={color}
			className={className}
		/>
	);
};

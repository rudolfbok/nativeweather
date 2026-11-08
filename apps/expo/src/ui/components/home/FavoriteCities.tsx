import { getCityRegion } from '@/core';
import type { useFavoriteCityWeather } from '@/core';
import type { City } from '@nativeweather/types';
import { useTranslate } from '@tolgee/react';
import { Check, Trash2 } from '@/ui/components/icons/lucide';
import { useState } from 'react';
import { Pressable as NativePressable, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { CardSkeleton } from '../common/CardSkeleton';
import { Pressable } from '../common/Pressable';
import { RoundView } from '../common/RoundView';
import { Text } from '../common/Text';
import { EditIcon } from '../icons/ui/EditIcon';
import { CityWeatherCard, cityCardGrid } from './CityWeatherCard';

const CheckIcon = withUniwind(Check);
const TrashIcon = withUniwind(Trash2);

interface FavoriteCitiesProps {
	favorites: ReturnType<typeof useFavoriteCityWeather>;
	onOpen: (city: City) => void;
	onRemove: (city: City) => void;
	/** Overrides the viewport-based column count, e.g. for a narrow sidebar. */
	gridClassName?: string;
}

export const FavoriteCities = ({ favorites, onOpen, onRemove, gridClassName = cityCardGrid }: FavoriteCitiesProps) => {
	const { t } = useTranslate('common');
	const [editing, setEditing] = useState(false);
	const { favoritesData, favoriteCount, loading } = favorites;

	return (
		<View className="gap-2">
			<View className="min-h-10 flex-row items-center justify-between">
				<Text type="sectiontitle">{t('favorites.title')}</Text>
				{favoriteCount > 0 && (
					<Pressable
						onPress={() => setEditing((isEditing) => !isEditing)}
						accessibilityRole="button"
						className="items-center justify-center rounded-full border border-hairline p-1.5"
					>
						{editing ? (
							<CheckIcon colorClassName="accent-label" size={24} />
						) : (
							<EditIcon colorClassName="accent-label" />
						)}
					</Pressable>
				)}
			</View>
			{favoritesData.length === 0 && !loading && (
				<RoundView className="w-full items-center p-4">
					<Text type="body" className="text-center">
						{t(favoriteCount > 0 ? 'favorites.error' : 'favorites.nosaved')}
					</Text>
				</RoundView>
			)}
			<View className={gridClassName}>
				{loading &&
					favoritesData.length === 0 &&
					Array.from({ length: favoriteCount }, (_, index) => <CardSkeleton key={index} />)}
				{favoritesData.map(({ city, weather }) => (
					<View key={`${city.name}-${city.region}-${city.country}`}>
						<CityWeatherCard
							name={city.name}
							region={getCityRegion(city)}
							weather={weather}
							onPress={() => onOpen(city)}
						/>
						{editing && (
							<NativePressable
								onPress={() => onRemove(city)}
								accessibilityRole="button"
								accessibilityLabel={t('favorites.delete')}
								className="absolute right-0 -bottom-2 rounded-full bg-system-red p-1 web:cursor-pointer web:hover:opacity-80"
							>
								<TrashIcon colorClassName="accent-ui-foreground" size={22} />
							</NativePressable>
						)}
					</View>
				))}
			</View>
		</View>
	);
};

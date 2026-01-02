import { useTranslate } from '@tolgee/react';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { clsx } from 'clsx';
import { Trash, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { RoundView } from '../../common/RoundView';
import { StyledPressable } from '../../common/StyledPressable';
import { StyledText } from '../../common/StyledText';
import { EditIcon } from '../../icons/EditIcon';
import { CityCard } from '../CityCard';
import { useSearchController } from 'app/hooks/useSearchController';
import { LoadingIndicator } from 'app/components/common/LoadingIndicator';

export const FavoriteCities = () => {
	const { t } = useTranslate(['common']);
	const [showDeleteCity, setShowDeleteCity] = useState<boolean>(false);
	const { favoritesData, handleRemoveCity, refreshFavoriteCities, loading } = useFavoriteCities();
	const { handleCityPress } = useSearchController();

	useEffect(() => {
		refreshFavoriteCities({ displayToast: false });
	}, []);

	// if (loading) {
	// 	return <LoadingIndicator text={t('favorites.loading')} />;
	// }

	return (
		<View>
			<View className={clsx('mb-3 flex min-h-6 flex-row items-center justify-between')}>
				<StyledText type="screentitle">{t('favorites.title')}</StyledText>
				{favoritesData.length > 0 && (
					<StyledPressable onPress={() => setShowDeleteCity((prev) => !prev)} className={clsx('rounded-3xl p-1.5')}>
						{showDeleteCity ? <X size={26} color="#007AFF" /> : <EditIcon />}
					</StyledPressable>
				)}
			</View>
			{loading && <LoadingIndicator text={t('favorites.loading')} />}
			{favoritesData.length === 0 && !loading && (
				<RoundView className={clsx('w-full items-center place-self-center p-4 md:w-fit')}>
					<StyledText type="body" className={clsx('text-center')}>
						{t('favorites.nosaved')}
					</StyledText>
				</RoundView>
			)}
			<View className={clsx('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
				{favoritesData.map(({ city, weather }, index) => {
					return (
						<View key={index} className={clsx('flex-row')}>
							<CityCard
								onPress={() => handleCityPress(city)}
								city={city.name}
								conditionCode={weather.current.condition.code}
								isDay={weather.current.is_day}
								tempC={weather.current.temp_c}
								tempF={weather.current.temp_f}
								displayTime={true}
								timeZone={weather.location.tz_id}
								region={city.region}
							/>
							{showDeleteCity && (
								<Pressable
									onPress={() => handleRemoveCity(city)}
									className={clsx(
										'absolute -top-1 right-0 h-fit w-fit justify-center rounded-3xl rounded-full bg-red-600 p-1.5 hover:bg-red-700'
									)}
								>
									<Trash color="white" size={22} />
								</Pressable>
							)}
						</View>
					);
				})}
			</View>
		</View>
	);
};

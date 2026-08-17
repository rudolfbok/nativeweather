import { useTranslate } from '@tolgee/react';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { LoadingIndicator } from 'app/components/common/ui/LoadingIndicator';
import { RoundView } from 'app/components/common/ui/RoundView';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useSearchController } from 'app/hooks/search/useSearchController';
import { weatherLandscapeBg } from 'app/utils/mappings/mapBgLandscapes';
import { clsx } from 'clsx';
import { Edit, Trash2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { CloseIcon } from '../icons/ui/CloseIcon';
import { CityCard } from './CityCard';
import { EditIcon } from '../icons/ui/EditIcon';

export const FavoriteCities = ({ hook }: { hook: ReturnType<typeof useFavoriteCities> }) => {
	const { t } = useTranslate('common');
	const [showDeleteCity, setShowDeleteCity] = useState(false);
	const { favoritesData, handleRemoveCity, loading, refreshFavoriteCities } = hook;
	const { handleCityPress } = useSearchController();

	useEffect(() => {
		if (Platform.OS === 'web') {
			refreshFavoriteCities({ displayToast: false });
		}
	}, []);

	return (
		<View className={clsx('gap-2')}>
			<View className={clsx('flex min-h-6 flex-row items-center justify-between')}>
				<StyledText type="maintitle">{t('favorites.title')}</StyledText>
				{favoritesData.length > 0 && (
					<StyledPressable onPress={() => setShowDeleteCity((prev) => !prev)} className={clsx('rounded-3xl p-1.5')}>
						{showDeleteCity ? <CloseIcon size={26} /> : <EditIcon />}
					</StyledPressable>
				)}
			</View>
			{loading && !favoritesData && <LoadingIndicator text={t('favorites.loading')} />}
			{favoritesData.length === 0 && !loading && (
				<RoundView className={clsx('w-full items-center place-self-center p-4 md:w-fit')}>
					<StyledText type="body" className={clsx('text-center')}>
						{t('favorites.nosaved')}
					</StyledText>
				</RoundView>
			)}
			<View
				className={clsx(
					Platform.OS === 'web' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'gap-4'
				)}
			>
				{favoritesData.map(({ city, weather }, index) => {
					const tintColor = weatherLandscapeBg({ isDay: weather.current.isDay, code: weather.current.condition.code });
					return (
						<View key={index} className={clsx('flex-row')}>
							<CityCard
								onPress={() => handleCityPress(city)}
								city={city.name}
								conditionCode={weather.current.condition.code}
								isDay={weather.current.isDay}
								tempC={weather.current.tempC}
								tempF={weather.current.tempF}
								displayTime={true}
								timeZone={weather.location.tzId}
								region={city.region}
								tintColor={tintColor}
								colorScheme="auto"
							/>
							{showDeleteCity && (
								<AnimatedView duration={30}>
									<Pressable
										onPress={() => handleRemoveCity(city)}
										className={clsx(
											'absolute -top-1 right-1 h-fit w-fit justify-center rounded-full bg-red-600 p-1 hover:bg-red-800'
										)}
										style={{ cursor: 'pointer' }}
									>
										<Trash2 color="white" size={22} />
									</Pressable>
								</AnimatedView>
							)}
						</View>
					);
				})}
			</View>
		</View>
	);
};

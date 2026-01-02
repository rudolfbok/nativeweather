import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { Pencil, SquarePen, Trash, X } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { RoundView } from '../../common/RoundView';
import { StyledPressable } from '../../common/StyledPressable';
import { StyledText } from '../../common/StyledText';
// import { EditIcon } from '../../icons/EditIcon';
import { LoadingIndicator } from 'app/components/common/LoadingIndicator';
import { useSearchController } from 'app/hooks/useSearchController';
import { CityCard } from '../CityCard';
import { useFocusEffect } from '@react-navigation/native';
import { EditIcon } from 'app/components/icons/EditIcon';

export const FavoriteCities = ({ hook }: { hook: any }) => {
	const { t } = useTranslate(['common']);
	const [showDeleteCity, setShowDeleteCity] = useState<boolean>(false);
	const { favoritesData, handleRemoveCity, loading, refreshFavoriteCities } = hook;
	const { handleCityPress } = useSearchController();

	if (Platform.OS === 'ios') {
		useFocusEffect(
			useCallback(() => {
				refreshFavoriteCities({ displayToast: false });
			}, [])
		);
	}

	if (Platform.OS === 'web') {
		useEffect(() => {
			refreshFavoriteCities({ displayToast: false });
		}, []);
	}

	return (
		<View>
			<View className={clsx('mb-3 flex min-h-6 flex-row items-center justify-between')}>
				<StyledText type="screentitle" className="!text-2xl">
					{t('favorites.title')}
				</StyledText>
				{favoritesData.length > 0 && (
					<StyledPressable onPress={() => setShowDeleteCity((prev) => !prev)} className={clsx('rounded-3xl p-1.5')}>
						{showDeleteCity ? <X size={26} color="#007AFF" style={{ pointerEvents: 'none' }} /> : <EditIcon />}
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
										'absolute -top-1.5 right-0 h-fit w-fit justify-center rounded-3xl rounded-full bg-red-600 p-1.5 hover:bg-red-800'
									)}
								>
									<Trash color="white" size={26} style={{ pointerEvents: 'none' }} />
								</Pressable>
							)}
						</View>
					);
				})}
			</View>
		</View>
	);
};

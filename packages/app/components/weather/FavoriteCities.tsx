import { useFocusEffect } from '@react-navigation/native';
import { useTranslate } from '@tolgee/react';
import { AnimatedView } from 'app/components/common/animated/AnimatedView';
import { LoadingIndicator } from 'app/components/common/ui/LoadingIndicator';
import { RoundView } from 'app/components/common/ui/RoundView';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { EditIcon } from 'app/components/icons/EditIcon';
import { useSearchController } from 'app/hooks/useSearchController';
import { clsx } from 'clsx';
import { Trash, X } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { CityCard } from './CityCard';

export const FavoriteCities = ({ hook }: { hook: any }) => {
	const { t } = useTranslate(['common']);
	const [showDeleteCity, setShowDeleteCity] = useState<boolean>(false);
	const { favoritesData, handleRemoveCity, loading, refreshFavoriteCities } = hook;
	const { handleCityPress } = useSearchController();

	if (Platform.OS === 'ios' && favoritesData.length > 1) {
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
		<View className={clsx('gap-2')}>
			<View className={clsx('flex min-h-6 flex-row items-center justify-between')}>
				<StyledText type="maintitle">{t('favorites.title')}</StyledText>
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
								isDay={weather.current.isDay}
								tempC={weather.current.tempC}
								tempF={weather.current.tempF}
								displayTime={true}
								timeZone={weather.location.tzId}
								region={city.region}
							/>
							{showDeleteCity && (
								<AnimatedView duration={30}>
									<Pressable
										onPress={() => handleRemoveCity(city)}
										className={clsx(
											'absolute -top-1 right-1 h-fit w-fit justify-center rounded-3xl rounded-full bg-red-600 p-1 hover:bg-red-800'
										)}
									>
										<Trash color="white" size={22} style={{ pointerEvents: 'none' }} />
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

import { useTranslate } from '@tolgee/react';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useSearchController } from 'app/hooks/useSearchController';
import { clsx } from 'clsx';
import { useFocusEffect } from 'expo-router';
import { Share, Trash } from 'lucide-react-native';
import { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { RoundView } from 'app/components/common/RoundView';
import { StyledText } from 'app/components/common/StyledText';
import { CityCard } from 'app/components/weather/CityCard';

export const ReanimatedTest = ({ hook }: { hook: ReturnType<typeof useFavoriteCities> }) => {
	const { t } = useTranslate('common');
	const { favoritesData, handleRemoveCity, refreshFavoriteCities } = hook;
	const { handleCityPress } = useSearchController();

	useFocusEffect(
		useCallback(() => {
			refreshFavoriteCities({ displayToast: false });
		}, [])
	);

	return (
		<View>
			<StyledText type="screentitle" className={clsx('mb-2 !text-2xl')}>
				{t('favorites.title')}
			</StyledText>
			<View className={clsx('flex gap-4')}>
				{favoritesData.length === 0 && (
					<RoundView className={clsx('w-full items-center place-self-center p-4 md:w-fit')}>
						<StyledText type="body" className={clsx('text-center')}>
							{t('favorites.nosaved')}
						</StyledText>
					</RoundView>
				)}
				{favoritesData.map(({ city, weather }, index) => {
					const leftSwipeActions = () => {
						return (
							<Pressable
								className={clsx(
									'bg-primaryblue -mr-5 items-center justify-center gap-2 rounded-3xl rounded-br-none rounded-tr-none pr-5'
								)}
							>
								<Share color="white" />
								<StyledText type="body" className={clsx('text-label_dark px-4 font-semibold')}>
									{t('favorites.share')}
								</StyledText>
							</Pressable>
						);
					};

					const rightSwipeActions = () => {
						return (
							<Pressable
								onPress={() => handleRemoveCity(city)}
								className={clsx(
									'-ml-5 items-center justify-center gap-2 rounded-3xl rounded-bl-none rounded-tl-none bg-red-500 pl-5'
								)}
							>
								<Trash color="white" />
								<StyledText type="body" className={clsx('text-label_dark px-4 font-semibold')}>
									{t('favorites.delete')}
								</StyledText>
							</Pressable>
						);
					};
					return (
						<GestureHandlerRootView key={index}>
							<ReanimatedSwipeable
								renderLeftActions={leftSwipeActions}
								renderRightActions={rightSwipeActions}
								overshootRight={false}
								overshootLeft={false}
								containerStyle={{ borderRadius: 16 }}
							>
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
							</ReanimatedSwipeable>
						</GestureHandlerRootView>
					);
				})}
			</View>
		</View>
	);
};

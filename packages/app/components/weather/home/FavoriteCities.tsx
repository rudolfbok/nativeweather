import { useTranslate } from '@tolgee/react';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { RoundView } from 'app/components/common/styled/RoundView';
import { useFavoriteCities } from 'app/hooks/weather/useFavoriteCities';
import { useSearchController } from 'app/hooks/search/useSearchController';
import { weatherLandscapeBg } from 'app/utils/mappings/landscapeColors';
import { clsx } from 'clsx';
import { Check, Edit, Trash2, XIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { CloseIcon } from '../../icons/ui/CloseIcon';
import { Card } from '../card/Card';
import { CardSkeleton } from '../card/CardSkeleton';
import { EditIcon } from '../../icons/ui/EditIcon';
import { border } from 'app/constants/border';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';

export const FavoriteCities = ({ hook }: { hook: ReturnType<typeof useFavoriteCities> }) => {
	const { t } = useTranslate('common');
	const { text } = useThemeColors();
	const [showDeleteCity, setShowDeleteCity] = useState(false);
	const { favoritesData, favoriteCount, handleRemoveCity, loading } = hook;
	const { handleCityPress } = useSearchController();

	return (
		<View className={clsx('gap-2')}>
			<View className={clsx('flex h-fit min-h-6 flex-row items-center justify-between')}>
				<StyledText type="sectiontitle">{t('favorites.title')}</StyledText>
				{favoriteCount > 0 && (
					<StyledPressable
						onPress={() => setShowDeleteCity((prev) => !prev)}
						className={clsx(
							'macos:p-1 macos:h-10 macos:w-10 items-center justify-center self-end rounded-full p-1.5',
							border
						)}
					>
						{showDeleteCity ? <Check size={24} color={text} /> : <EditIcon />}
					</StyledPressable>
				)}
			</View>
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
				{loading &&
					favoritesData.length === 0 &&
					Array.from({ length: favoriteCount }, (_, index) => <CardSkeleton key={index} />)}
				{favoritesData.map(({ city, weather }, index) => {
					const tintColor = weatherLandscapeBg({ isDay: weather.current.isDay, code: weather.current.condition.code });
					return (
						<View key={index} className={clsx('flex-row')}>
							<Card
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
							/>
							{showDeleteCity && (
								<Pressable
									onPress={() => handleRemoveCity(city)}
									className={clsx(
										'absolute -bottom-1 right-0 h-fit w-fit justify-center rounded-full bg-red-600 p-1 hover:bg-red-800'
									)}
									style={{ cursor: 'pointer' }}
								>
									<Trash2 color="white" size={20} />
								</Pressable>
							)}
						</View>
					);
				})}
			</View>
		</View>
	);
};

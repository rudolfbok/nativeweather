'use client';

import { Accordion } from 'app/components/common/Accordion';
import { Header } from 'app/components/common/Header';
import { StyledText } from 'app/components/common/StyledText';
import { FavoriteCities } from 'app/components/weather/favorites/FavoriteCities';
import { LocalWeather } from 'app/components/weather/local/LocalWeather';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Platform, RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeFeature = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const favoriteCitiesHook = useFavoriteCities();

	return (
		<View className={clsx('w-full flex-1')}>
			{Platform.OS === 'ios' && <Header />}
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				// contentContainerStyle={{ paddingBottom: 16 }}
				contentContainerClassName={clsx('px-4 pb-4')}
				refreshControl={
					<RefreshControl
						tintColor="blue"
						refreshing={refreshing}
						onRefresh={() => favoriteCitiesHook.refreshFavoriteCities({ displayToast: true, setRefreshing })}
						progressViewOffset={insets.top + 100}
						style={{ zIndex: 100 }}
					/>
				}
			>
				<View className={clsx('gap-4')}>
					<Accordion title="Native accordion">
						<StyledText type="body">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula quis metus vitae vulputate.
							Pellentesque quis accumsan dui. Ut vel odio scelerisque, laoreet neque eget, euismod nibh. Aenean faucibus
							bibendum sollicitudin. Quisque scelerisque, libero eget pretium placerat, purus lorem porta purus, at
							vehicula nisl justo nec dolor. Praesent dictum, augue a consectetur vestibulum, nunc magna gravida neque,
							et dignissim quam nulla at lorem. Quisque eleifend massa leo, sed vulputate nisl varius at. Nunc
							convallis, turpis vel aliquam dignissim, velit risus varius tellus, eu faucibus felis mauris in velit.
							Nullam vehicula neque dapibus, suscipit eros eu, vehicula ligula. Cras et tincidunt felis.
						</StyledText>
					</Accordion>
					{showLocalWeather && <LocalWeather />}
					<FavoriteCities hook={favoriteCitiesHook} />
				</View>
			</ScrollView>
		</View>
	);
};

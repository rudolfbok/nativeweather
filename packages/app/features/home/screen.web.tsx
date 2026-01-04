'use client';

import { Accordion } from 'app/components/common/Accordion.web';
import { AnimatedView } from 'app/components/common/AnimatedView.web';
import { StyledText } from 'app/components/common/StyledText';
import { FavoriteCities } from 'app/components/weather/favorites/FavoriteCities';
import { LocalWeather } from 'app/components/weather/local/LocalWeather.web';
import { useFavoriteCities } from 'app/hooks/useFavoriteCities';
import { useStorageBoolean } from 'app/storage/useStorageBoolean';
import { clsx } from 'clsx';
import { ScrollView, View } from 'react-native';

export const HomeFeature = () => {
	const [showLocalWeather] = useStorageBoolean('showLocalWeather');

	const favoriteCitiesHook = useFavoriteCities();

	return (
		<AnimatedView transition={{ duration: 300 }}>
			<View className={clsx('flex-1')}>
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 16 }}
				>
					<View className={clsx('flex-1 gap-4')}>
						<Accordion title="Accordion title">
							<StyledText type="body">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula quis metus vitae vulputate.
								Pellentesque quis accumsan dui. Ut vel odio scelerisque, laoreet neque eget, euismod nibh. Aenean
								faucibus bibendum sollicitudin. Quisque scelerisque, libero eget pretium placerat, purus lorem porta
								purus, at vehicula nisl justo nec dolor. Praesent dictum, augue a consectetur vestibulum, nunc magna
								gravida neque, et dignissim quam nulla at lorem. Quisque eleifend massa leo, sed vulputate nisl varius
								at. Nunc convallis, turpis vel aliquam dignissim, velit risus varius tellus, eu faucibus felis mauris in
								velit. Nullam vehicula neque dapibus, suscipit eros eu, vehicula ligula. Cras et tincidunt felis.
							</StyledText>
						</Accordion>
						{showLocalWeather && <LocalWeather />}
						<FavoriteCities hook={favoriteCitiesHook} />
					</View>
				</ScrollView>
			</View>
		</AnimatedView>
	);
};

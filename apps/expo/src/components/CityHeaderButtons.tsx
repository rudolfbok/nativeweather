import { MenuView } from '@expo/ui/community/menu';
import type { NormalizedData } from '@nativeweather/types';
import { shareWeather } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { GlassView } from 'expo-glass-effect';
import { router, Stack } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable } from 'react-native';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';

// A clear glass circle; the icon is 24 and the padding 10 on every side.
const circle = { borderRadius: 999, padding: 10 } as const;
const circleSize = 44;

const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

// iOS header, all in SF Symbols: back on the left and a native menu with the favourite and share actions on the
// right. Both triggers are our own glass buttons with white icons, so they can be styled; the left item replaces
// the system back button.
export const CityHeaderButtons = ({ weather }: { weather: NormalizedData }) => {
	const { t } = useTranslate('common');
	const { isFavorite, toggle } = useFavoriteToggle(weather);

	return (
		<>
			<Stack.Toolbar placement="left">
				<Stack.Toolbar.View hidesSharedBackground>
					<Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={goBack}>
						<GlassView glassEffectStyle="clear" isInteractive style={circle}>
							<SymbolView name="chevron.left" size={24} weight="semibold" tintColor="white" />
						</GlassView>
					</Pressable>
				</Stack.Toolbar.View>
			</Stack.Toolbar>
			<Stack.Toolbar placement="right">
				<Stack.Toolbar.View hidesSharedBackground>
					<MenuView
						style={{ width: circleSize, height: circleSize }}
						actions={[
							{
								id: 'favorite',
								title: t(isFavorite ? 'favorites.remove' : 'favorites.add'),
								image: isFavorite ? 'star.slash' : 'star',
							},
							{ id: 'share', title: t('favorites.share'), image: 'square.and.arrow.up' },
						]}
						onPressAction={({ nativeEvent }) => {
							if (nativeEvent.event === 'favorite') toggle();
							else void shareWeather(weather.location);
						}}
					>
						<GlassView glassEffectStyle="clear" isInteractive style={circle}>
							<SymbolView name="ellipsis" size={24} weight="semibold" tintColor="white" />
						</GlassView>
					</MenuView>
				</Stack.Toolbar.View>
			</Stack.Toolbar>
		</>
	);
};

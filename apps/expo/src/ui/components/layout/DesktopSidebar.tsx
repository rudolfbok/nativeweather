import { extractCity, getFavoriteCities, useLocalWeather } from '@/core';
import { usePathname } from 'expo-router';
import { useEffect } from 'react';
import { create } from 'zustand';
import { FavoriteCities } from '../home/FavoriteCities';
import { LocalWeather } from '../home/LocalWeather';
import { useHomeLists } from '@/hooks/useHomeLists';
import { openCity, replaceWithCity } from '@/navigation';

const sidebarGrid = 'gap-4';

/** Whether the launch-time choice of a city is made; until then the home page shows a skeleton. */
export const useStartupCitySettled = create<{ settled: boolean }>(() => ({ settled: false }));

export const DesktopSidebar = () => {
	const { showLocalWeather, favorites, error, onRemove } = useHomeLists();
	useOpenFirstCity(showLocalWeather && !error);

	return (
		<>
			{showLocalWeather && <LocalWeather error={error} onOpen={openCity} gridClassName={sidebarGrid} />}
			<FavoriteCities favorites={favorites} onOpen={openCity} onRemove={onRemove} gridClassName={sidebarGrid} />
		</>
	);
};

/** On launch the page beside the sidebar would be empty, so it opens local weather, or else the first favourite. */
const useOpenFirstCity = (waitForLocalWeather: boolean) => {
	const pathname = usePathname();
	const localWeather = useLocalWeather((state) => state.weatherData);
	const settled = useStartupCitySettled((state) => state.settled);

	useEffect(() => {
		if (settled) return;
		const settle = () => useStartupCitySettled.setState({ settled: true });
		// Started on another page, or left home before local weather arrived.
		if (pathname !== '/') return settle();
		if (waitForLocalWeather && !localWeather) return;

		const city = waitForLocalWeather && localWeather ? extractCity(localWeather) : getFavoriteCities()[0];
		if (city) replaceWithCity(city);
		settle();
	}, [settled, pathname, waitForLocalWeather, localWeather]);
};

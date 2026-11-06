import { FavoriteCities, LocalWeather } from '@nativeweather/ui';
import { useHomeLists } from '@/hooks/useHomeLists';
import { openCity } from '@/navigation';

const sidebarGrid = 'gap-4';

export const DesktopSidebar = () => {
	const { showLocalWeather, favorites, error, onRemove } = useHomeLists();

	return (
		<>
			{showLocalWeather && <LocalWeather error={error} onOpen={openCity} gridClassName={sidebarGrid} />}
			<FavoriteCities favorites={favorites} onOpen={openCity} onRemove={onRemove} gridClassName={sidebarGrid} />
		</>
	);
};

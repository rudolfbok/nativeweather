import { getFavoriteCities } from './crudMMKVService';

export const initStorageDefaults = () => {
	// Settings use hook defaults until explicitly saved; only seed favorites.
	getFavoriteCities();
};

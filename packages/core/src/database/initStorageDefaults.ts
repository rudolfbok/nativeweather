import { storage } from './initStorage';
import { booleanStorageDefaults, stringStorageDefaults } from './storageDefaults';

export const initStorageDefaults = () => {
	for (const [key, value] of Object.entries(stringStorageDefaults)) {
		if (storage.getString(key) === undefined) storage.set(key, value);
	}
	for (const [key, value] of Object.entries(booleanStorageDefaults)) {
		if (storage.getBoolean(key) === undefined) storage.set(key, value);
	}
};

import { useMMKVBoolean, useMMKVObject, useMMKVString } from 'react-native-mmkv';
import { storage } from './initStorage';
import { booleanStorageDefaults, stringStorageDefaults } from './storageDefaults';

const booleanDefaults: Partial<Record<string, boolean>> = booleanStorageDefaults;
const stringDefaults: Partial<Record<string, string>> = stringStorageDefaults;

type Fallback<K extends string, Defaults, T> = K extends keyof Defaults ? T : T | undefined;

export const useStorageBoolean = <K extends string>(key: K) => {
	const [value, setValue] = useMMKVBoolean(key, storage);
	return [value ?? booleanDefaults[key], setValue] as [
		Fallback<K, typeof booleanStorageDefaults, boolean>,
		ReturnType<typeof useMMKVBoolean>[1],
	];
};

export const useStorageString = <K extends string>(key: K) => {
	const [value, setValue] = useMMKVString(key, storage);
	return [value ?? stringDefaults[key], setValue] as [
		Fallback<K, typeof stringStorageDefaults, string>,
		ReturnType<typeof useMMKVString>[1],
	];
};

export const useStorageObject = <T>(key: string) => useMMKVObject<T>(key, storage);

import { useMMKVBoolean, useMMKVObject, useMMKVString } from 'react-native-mmkv';
import { storage } from './initStorage';
import { booleanStorageDefaults, stringStorageDefaults } from './storageDefaults';

type BooleanStorage = ReturnType<typeof useMMKVBoolean>;
type StringStorage = ReturnType<typeof useMMKVString>;

const booleanDefaults: Partial<Record<string, boolean>> = booleanStorageDefaults;
const stringDefaults: Partial<Record<string, string>> = stringStorageDefaults;

export function useStorageBoolean(key: keyof typeof booleanStorageDefaults): [boolean, BooleanStorage[1]];
export function useStorageBoolean(key: string): BooleanStorage;
export function useStorageBoolean(key: string): BooleanStorage {
	const [value, setValue] = useMMKVBoolean(key, storage);
	return [value ?? booleanDefaults[key], setValue];
}

export function useStorageString(key: keyof typeof stringStorageDefaults): [string, StringStorage[1]];
export function useStorageString(key: string): StringStorage;
export function useStorageString(key: string): StringStorage {
	const [value, setValue] = useMMKVString(key, storage);
	return [value ?? stringDefaults[key], setValue];
}

export const useStorageObject = <T>(key: string) => useMMKVObject<T>(key, storage);

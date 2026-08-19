'use client';

import { useMMKVBoolean, useMMKVObject, useMMKVString } from 'react-native-mmkv';
import { storage } from './initStorage';

export const useStorageBoolean = (key: string) => {
	return useMMKVBoolean(key, storage);
};

export const useStorageObject = <T>(key: string) => {
	return useMMKVObject<T>(key, storage);
};

export const useStorageString = (key: string) => {
	return useMMKVString(key, storage);
};

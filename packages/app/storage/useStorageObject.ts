'use client';

import { useMMKVObject } from 'react-native-mmkv';
import { storage } from './storage';

export const useStorageObject = <T>(key: string) => {
	return useMMKVObject<T>(key, storage);
};

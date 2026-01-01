'use client';

import { useMMKVObject } from 'react-native-mmkv';
import { storage } from './storage';

export function useStorageObject<T>(key: string) {
	return useMMKVObject<T>(key, storage);
}

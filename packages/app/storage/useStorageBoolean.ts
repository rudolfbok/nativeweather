'use client';

import { useMMKVBoolean } from 'react-native-mmkv';
import { storage } from './storage';

export function useStorageBoolean(key: string) {
	return useMMKVBoolean(key, storage);
}

'use client';

import { useMMKVString } from 'react-native-mmkv';
import { storage } from './storage';

export function useStorageString(key: string) {
	return useMMKVString(key, storage);
}

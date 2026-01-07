'use client';

import { useMMKVBoolean } from 'react-native-mmkv';
import { storage } from './storage';

export const useStorageBoolean = (key: string) => {
	return useMMKVBoolean(key, storage);
};

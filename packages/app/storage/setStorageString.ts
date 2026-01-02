import { useState, useEffect } from 'react';
import { storage } from '../storage/storage';

export function useStorageString(key: string, defaultValue = '') {
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		const stored = storage.getString(key);
		if (stored !== undefined) setValue(stored);
	}, [key]);

	const setStored = (v: string) => {
		setValue(v);
		storage.set(key, v);
	};

	return [value, setStored] as const;
}

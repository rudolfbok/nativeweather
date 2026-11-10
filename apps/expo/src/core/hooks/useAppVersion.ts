import { getVersion } from '@tauri-apps/api/app';
import { isTauri } from '@tauri-apps/api/core';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

// The desktop app is versioned by tauri.conf.json; everywhere else it is the Expo config's version.
export const useAppVersion = () => {
	const [version, setVersion] = useState(Constants.expoConfig?.version);

	useEffect(() => {
		if (isTauri()) void getVersion().then(setVersion);
	}, []);

	return version;
};

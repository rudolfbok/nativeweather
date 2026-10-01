import React, { useEffect } from 'react';
import Layout from './app/Layout';
import './globals.css';
import { TolgeeProvider } from '@nativeweather/ui/provider/TolgeeProvider';
import { initStorageDefaults } from '@nativeweather/core/database/initStorageDefaults';
import { NavigationContainer } from '@react-navigation/native';
import { storage } from '@nativeweather/core/database/initStorage';

export default function App() {
	useEffect(() => {
		storage.clearAll();
		initStorageDefaults();
	}, []);

	return (
		<TolgeeProvider>
			<NavigationContainer>
				<Layout />
			</NavigationContainer>
		</TolgeeProvider>
	);
}

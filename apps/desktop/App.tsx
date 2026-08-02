import React, { useEffect } from 'react';
import Layout from './app/Layout';
import './globals.css';
import { TolgeeProvider } from 'app/provider/TolgeeProvider';
import { initStorageDefaults } from 'app/storage/initStorageDefaults';
import { NavigationContainer } from '@react-navigation/native';
import { storage } from 'app/storage/initStorage';

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

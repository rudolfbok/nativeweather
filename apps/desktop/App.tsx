import React, { useEffect } from 'react';
import Layout from './app/Layout';
import './globals.css';
import { TolgeeProvider } from 'app/provider/TolgeeProvider';
import { initStorageDefaults } from 'app/database/initStorageDefaults';
import { NavigationContainer } from '@react-navigation/native';
import { storage } from 'app/database/initStorage';

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

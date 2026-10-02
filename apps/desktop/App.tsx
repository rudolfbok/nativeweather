import React from 'react';
import Layout from './app/Layout';
import './globals.css';
import { TolgeeProvider } from '@nativeweather/ui/provider/TolgeeProvider';
import { initStorageDefaults } from '@nativeweather/core/database/initStorageDefaults';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
	initStorageDefaults();

	return (
		<TolgeeProvider>
			<NavigationContainer>
				<Layout />
			</NavigationContainer>
		</TolgeeProvider>
	);
}

import React, { useEffect } from 'react';
import Layout from './app/Layout';
import './globals.css';
import { TolgeeProvider } from 'app/provider/TolgeeProvider';
import { initStorageDefaults } from 'app/storage/initStorageDefaults';

export default function App() {
	useEffect(() => {
		initStorageDefaults();
	}, []);

	return <Layout />;
}

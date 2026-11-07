import { StatusView, SuggestedCities } from '@/ui';
import { useTranslate } from '@tolgee/react';
import Head from 'expo-router/head';
import { View } from 'react-native';
import { openCity } from '@/navigation';

export default function NotFound() {
	const { t } = useTranslate('common');

	return (
		<View className="flex-1 justify-center bg-screen-background p-6">
			<Head>
				<title>Page not found | NativeWeather</title>
				<meta name="robots" content="noindex, follow" />
			</Head>
			<StatusView icon="notfound" title={t('status.notfound.title')} message={t('status.notfound.message')}>
				<SuggestedCities onOpen={openCity} />
			</StatusView>
		</View>
	);
}

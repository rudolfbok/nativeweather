// STUB(phase-6): home screen arrives with slice 6.8.
import { ContentRow, ScreenWrapper, Text } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function HomeScreen() {
	const { t } = useTranslate('common');

	return (
		<View className="flex-1 bg-screen-background">
			<ScreenWrapper>
				<View className="gap-6 pt-12">
					<Text type="screentitle">{t('tab.home')}</Text>
					<ContentRow title="Router stub">
						<View className="gap-3">
							<Link href={{ pathname: '/[city]', params: { city: 'peshawar', r: 'north-west-frontier', cr: 'pk' } }}>
								<Text type="link">/peshawar?r=north-west-frontier&cr=pk</Text>
							</Link>
							<Link href="/compass">
								<Text type="link">/compass (reserved, should 404)</Text>
							</Link>
							{__DEV__ && (
								<>
									<Link href="/preview">
										<Text type="link">/preview (UI gallery, dev only)</Text>
									</Link>
									<Link href="/modal-check">
										<Text type="link">/modal-check (temporary modal route test)</Text>
									</Link>
								</>
							)}
						</View>
					</ContentRow>
				</View>
			</ScreenWrapper>
		</View>
	);
}

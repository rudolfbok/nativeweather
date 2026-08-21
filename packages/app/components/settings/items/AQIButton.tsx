import { useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/modal/StyledModal';
import { AirQualitySettingsIcon } from 'app/components/icons/settings/AirQualitySettingsIcon';
import { useStorageString } from 'app/database/useStorage';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { AQISelect } from '../selectors/AQISelect';
import { SettingsItem } from './SettingsItem';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';

export const AQIButton = () => {
	const { t } = useTranslate('settings');
	const [currentAQI] = useStorageString('currentAQI');
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();
	const { setModalScreen } = useNavigationScreen();
	const navigateToAQI = useModalNavigation({
		mobile: () => router.push('/aqi'),
		macos: () => setModalScreen('settings-aqi'),
		web: () => setShowModal(true),
	});

	const getLocale: Record<string, string> = {
		EU: t('airquality.european'),
		US: t('airquality.american'),
	};

	return (
		<>
			<SettingsItem
				icon={<AirQualitySettingsIcon />}
				iconbg="bg-primaryblue"
				title={Platform.OS === 'web' ? t('airquality.titleshort') : t('airquality.title')}
				variant="value"
				showModal={() => setShowModal(true)}
				onPress={navigateToAQI}
				currentValue={getLocale[currentAQI ?? 'EU']}
			/>
			{showModal && (
				<StyledModal
					visible={showModal}
					onClose={() => setShowModal(false)}
					header={t('airquality.titlefull')}
					settingsModal={true}
				>
					<AQISelect />
				</StyledModal>
			)}
		</>
	);
};

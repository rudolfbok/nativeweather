import { useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/StyledModal';
import { useStorageString } from 'app/storage/useStorageString';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'solito/navigation';
import { AirQualitySettingsIcon } from 'app/components/icons/settings/AirQualitySettingsIcon';
import { AQISelect } from '../selectors/AQISelect';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';

export const AQIButton = () => {
	const { t } = useTranslate('settings');
	const [currentAQI] = useStorageString('currentAQI');
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

	const getLocale: Record<string, string> = {
		EU: t('airquality.european'),
		USA: t('airquality.american'),
	};

	return (
		<>
			<SettingsItem
				icon={<AirQualitySettingsIcon />}
				iconbg="bg-primaryblue"
				title={Platform.OS === 'web' ? t('airquality.titleshort') : t('airquality.title')}
				variant="value"
				showModal={() => setShowModal(true)}
				onPress={() => router.push('/aqi')}
				currentValue={getLocale[currentAQI ?? 'EU']}
				className={clsx('rounded-bl-3xl rounded-br-3xl')}
			/>
			{showModal && (
				<StyledModal
					visible={showModal}
					onClose={() => setShowModal(false)}
					header={t('airquality.title')}
					settingsModal={true}
				>
					<AQISelect />
				</StyledModal>
			)}
		</>
	);
};

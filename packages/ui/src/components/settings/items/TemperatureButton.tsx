import { useTranslate } from '@tolgee/react';
import { StyledModal } from '@nativeweather/ui/components/common/modal/StyledModal';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { Thermometer } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { TemperatureSelect } from '../selectors/TemperatureSelect';
import { SettingsItem } from './SettingsItem';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';

export const TemperatureButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const [currentTemperature] = useStorageString('currentTemp');
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const navigateToTemperature = useModalNavigation({
		mobile: () => router.push('/temperature'),
		macos: () => setModalScreen('temperature'),
		web: () => setShowModal(true),
	});

	const getUpperCaseTemp: Record<string, string> = {
		celsius: t('temperatureScale.celsius'),
		fahrenheit: t('temperatureScale.fahrenheit'),
	};

	return (
		<>
			<SettingsItem
				icon={<Thermometer size={20} color="white" />}
				iconbg="bg-[#FF9500]"
				title={t('temperature')}
				variant="value"
				onPress={navigateToTemperature}
				showModal={() => setShowModal(true)}
				currentValue={getUpperCaseTemp[currentTemperature]}
				border={true}
			/>
			{showModal && (
				<StyledModal
					visible={showModal}
					onClose={() => setShowModal(false)}
					header={t('temperature')}
					settingsModal={true}
				>
					<TemperatureSelect />
				</StyledModal>
			)}
		</>
	);
};

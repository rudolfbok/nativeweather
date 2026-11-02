import { useTranslate } from '@tolgee/react';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { Ruler } from 'lucide-react-native';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { SettingsItem } from './SettingsItem';
import { useState } from 'react';
import { UnitsSelect } from '../selectors/UnitsSelect';
import { StyledModal } from '../../common/modal/StyledModal';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigationScreen';

export const UnitsButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const navigateToUnits = useModalNavigation({
		mobile: () => router.push('/units'),
		macos: () => setModalScreen('units'),
		web: () => setShowModal(true),
	});

	const getUpperCaseUnits: Record<string, string> = {
		metric: t('units.metric'),
		imperial: t('units.imperial'),
	};

	return (
		<>
			<SettingsItem
				icon={<Ruler size={20} color="white" />}
				iconbg="bg-[#00C4CA]"
				title={t('units.title')}
				variant="value"
				onPress={navigateToUnits}
				showModal={() => setShowModal(true)}
				currentValue={getUpperCaseUnits[currentUnits]}
				border={true}
			/>
			{showModal && (
				<StyledModal
					visible={showModal}
					onClose={() => setShowModal(false)}
					header={t('units.title')}
					settingsModal={true}
				>
					<UnitsSelect />
				</StyledModal>
			)}
		</>
	);
};

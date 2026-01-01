import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { Ruler } from 'lucide-react-native';
import { useRouter } from 'solito/navigation';
import { SettingsItem } from './SettingsItem';
import { useState } from 'react';
import { UnitsSelect } from '../selectors/UnitsSelect';
import { StyledModal } from 'app/components/common/StyledModal';

export const UnitsButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const [currentUnits] = useStorageString('currentUnits');
	const [showModal, setShowModal] = useState(false);

	const getUpperCaseUnits: Record<string, string> = {
		metric: t('units.metric'),
		imperial: t('units.imperial'),
	};

	return (
		<>
			<SettingsItem
				icon={<Ruler size={20} color="white" />}
				iconbg="bg-primaryblue"
				title={t('units.title')}
				variant="value"
				onPress={() => router.push('/units')}
				showModal={() => setShowModal(true)}
				currentValue={getUpperCaseUnits[currentUnits ?? 'metric']}
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

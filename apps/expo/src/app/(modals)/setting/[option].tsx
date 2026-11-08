import { getSettingOption, isSettingOptionKey, ModalScreen, OptionList } from '@/ui';
import { useTranslate } from '@tolgee/react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useStackedModal } from '@/hooks/useStackedModal';

export default function SettingOptionModal() {
	const { option } = useLocalSearchParams<{ option: string }>();
	const { t } = useTranslate('settings');
	const { stacked, onBack, onClose } = useStackedModal();

	if (!isSettingOptionKey(option)) return <Redirect href="/" />;

	const { titleKey, pageTitleKey } = getSettingOption(option);

	return (
		<ModalScreen size="narrow" header={t(pageTitleKey ?? titleKey)} stacked={stacked} onBack={onBack} onClose={onClose}>
			<OptionList option={option} />
		</ModalScreen>
	);
}

import { useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { CloudsIcon } from 'app/components/icons/main';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { DataCard } from '../DataCard';
import { CloudsModal } from './CloudsModal';

export const CloudsCard = ({ data }: { data: number }) => {
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToClouds = useModalNavigation({
		mobile: () => router.push('/modals/clouds'),
		macos: () => setModalScreen('clouds'),
		web: () => setShowModal(true),
	});

	const cloudCoverRanges = [
		{ max: 13, description: t('description.cloudcover.0') },
		{ max: 50, description: t('description.cloudcover.1') },
		{ max: 75, description: t('description.cloudcover.2') },
		{ max: Infinity, description: t('description.cloudcover.3') },
	];

	const description = cloudCoverRanges.find((range) => data < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={navigateToClouds}
			icon={<CloudsIcon />}
			title={t('cloudcover.title')}
			description={description}
			data={data + '%'}
			className={clsx(
				'native:!basis-[100%] web:!col-span-1 web:max-xl:!col-span-2 web:max-xl:!aspect-auto web:xl:hidden native:!aspect-auto min-w-full gap-6 md:h-full'
			)}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<CloudsIcon />}
						header={t('cloudcover.title')}
						onClose={() => setShowModal(false)}
					>
						<CloudsModal />
					</StyledModal>
				)
			}
		/>
	);
};

import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { useTranslate } from '@tolgee/react';
import { Snowflake } from 'lucide-react-native';
import { GestureResponderEvent } from 'react-native';

export const SnowModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');

	return (
		<StyledModal visible={visible} icon={<Snowflake color="#3796B8" />} header={t('snow.title')} onClose={onClose}>
			<StyledText type="body">
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo. Mauris dolor felis,
				sagittis at, luctus sed, aliquam non, tellus. Aenean fermentum risus id tortor. Aliquam erat volutpat. Morbi
				scelerisque luctus velit. Suspendisse nisl.
			</StyledText>
		</StyledModal>
	);
};

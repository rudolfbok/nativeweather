import { RoundView } from 'app/components/common/RoundView';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { CloudSnow, Snowflake } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { Separator } from 'app/components/common/Separator';
import { ModalValueItem } from './ModalValueItem';

export const SnowModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');

	const snowPrecipValues = [
		{
			name: t('precipitation.chance.0'),
			value: '0 - 10%',
			description: t('snow.chance.text.0'),
		},
		{
			name: t('precipitation.chance.1'),
			value: '10 - 30%',
			description: t('snow.chance.text.1'),
		},
		{
			name: t('precipitation.snow.chance.2'),
			value: '30 - 50%',
			description: t('snow.chance.text.2'),
		},
		{
			name: t('precipitation.chance.3'),
			value: '50 - 70%',
			description: t('snow.chance.text.3'),
		},
		{
			name: t('precipitation.chance.4'),
			value: '70 - 90%',
			description: t('snow.chance.text.4'),
		},
		{
			name: t('precipitation.chance.5'),
			value: '90 - 100%',
			description: t('snow.chance.text.5'),
		},
	];

	return (
		<StyledModal visible={visible} icon={<Snowflake color="#3796B8" />} header={t('snow.title')} onClose={onClose}>
			<View className={clsx('gap-2')}>
				<StyledText type="subtitle">{t('snow.chance.title')}</StyledText>
				<RoundView className={clsx('p-4')}>
					<StyledText type="body">{t('snow.chance.description')}</StyledText>
				</RoundView>
				<StyledText type="subtitle">{t('snow.chance.values')}</StyledText>
				<RoundView className={clsx('gap-2 p-4')}>
					{snowPrecipValues.map(({ name, value, description }, index) => (
						<View key={index} className={clsx('gap-4')}>
							<ModalValueItem
								showItemIndex={false}
								name={name}
								textcolor="!text-[#3796B8]"
								value={value}
								description={description}
							/>
							{index < snowPrecipValues.length - 1 && <Separator />}
						</View>
					))}
				</RoundView>
			</View>
		</StyledModal>
	);
};

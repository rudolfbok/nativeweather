import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import { Separator } from 'app/components/common/Separator';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { clsx } from 'clsx';
import { Sun } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { ModalValueItem } from './ModalValueItem';

export const UVIndexModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
}) => {
	const { t } = useTranslate('weather');

	const uvIndexValues = [
		{
			name: t('description.uvindex.0'),
			textcolor: '!text-[#009900]',
			value: '0 - 2',
			description: t('uvindex.text.0'),
		},
		{
			name: t('description.uvindex.1'),
			textcolor: '!text-[#FFC100]',
			value: '3 - 5',
			description: t('uvindex.text.1'),
		},
		{
			name: t('description.uvindex.2'),
			textcolor: '!text-[#FF6F00]',
			value: '6 - 7',
			description: t('uvindex.text.2'),
		},
		{
			name: t('description.uvindex.3'),
			textcolor: '!text-[#FF0000]',
			value: '8 - 10',
			description: t('uvindex.text.3'),
		},
		{
			name: t('description.uvindex.4'),
			textcolor: '!text-[#990099]',
			value: '11+',
			description: t('uvindex.text.4'),
		},
	];

	return (
		<StyledModal visible={visible} icon={<Sun color="purple" size={26} />} header="UV Index" onClose={onClose}>
			<View className={clsx('gap-2')}>
				<StyledText type="subtitle">{t('uvindex.radiation.title')}</StyledText>
				<RoundView className={clsx('p-4')}>
					<StyledText type="body">{t('uvindex.radiation.description')}</StyledText>
				</RoundView>
				<StyledText type="subtitle">{t('uvindex.index.title')}</StyledText>
				<RoundView className={clsx('gap-4 p-4')}>
					<StyledText type="body">{t('uvindex.index.description')}</StyledText>
					<View className={clsx('gap-4')}>
						{uvIndexValues.map(({ name, textcolor, value, description }, index) => (
							<View key={index} className={clsx('gap-4')}>
								<ModalValueItem
									showItemIndex={false}
									name={name}
									textcolor={textcolor}
									value={value}
									description={description}
								/>
								{index < uvIndexValues.length - 1 && <Separator />}
							</View>
						))}
					</View>
				</RoundView>
			</View>
		</StyledModal>
	);
};

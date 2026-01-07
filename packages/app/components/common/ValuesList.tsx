import { clsx } from 'clsx';
import { View } from 'react-native';
import { ModalValueItem } from '../cards/modals/ModalValueItem';
import { Separator } from './Separator';

interface ValuesListProps {
	values: {
		name: string;
		value?: any; //// ?????
		textColor?: string;
		description?: string;
		moonPhase?: React.ReactNode;
	}[];
	showIndex?: boolean;
	valueColor?: string;
}

export const ValuesList = ({ values, valueColor, showIndex = false }: ValuesListProps) => (
	<View className={clsx('gap-4')}>
		{values.map(({ name, value, description, textColor, moonPhase }, index) => (
			<View key={index} className={clsx('gap-4')}>
				<ModalValueItem
					index={showIndex ? index + 1 : undefined}
					name={name}
					value={value}
					textColor={textColor ? textColor : valueColor}
					description={description}
					showItemIndex={showIndex}
					moonPhase={moonPhase}
				/>
				{index < values.length - 1 && <Separator />}
			</View>
		))}
	</View>
);

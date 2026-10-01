import { Switch, View } from 'react-native';
import { clsx } from 'clsx';

interface StyledSwitchProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
}

export const StyledSwitch = ({ value, onValueChange }: StyledSwitchProps) => {
	return (
		<View className={clsx('justify-center')}>
			<Switch
				thumbColor="#fff"
				trackColor={{ false: '#939393', true: '#007AFF' }}
				value={value}
				onValueChange={onValueChange}
				// @ts-ignore
				activeThumbColor="#fff"
			/>
		</View>
	);
};

import { Switch as NativeSwitch } from 'react-native';
import { useCSSVariable } from 'uniwind';

interface SwitchProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
}

export const Switch = ({ value, onValueChange }: SwitchProps) => {
	const [on, off, thumb] = useCSSVariable(['--color-primary-blue', '--color-switch-off', '--color-ui-foreground']) as [
		string,
		string,
		string,
	];

	return (
		<NativeSwitch
			value={value}
			onValueChange={onValueChange}
			thumbColor={thumb}
			trackColor={{ false: off, true: on }}
			// RN Web colours the active thumb separately and defaults to teal.
			{...{ activeThumbColor: thumb }}
		/>
	);
};

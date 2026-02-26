interface SwitchTempProps {
	celsius: number;
	fahrenheit: number;
	currentTemp: string | undefined;
}

export const useSwitchTemp = ({ celsius, fahrenheit, currentTemp }: SwitchTempProps) => {
	const value = currentTemp === 'celsius' ? celsius : fahrenheit;
	return `${Math.round(value)}°`;
};

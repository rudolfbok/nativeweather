import { CircleAlert } from 'lucide-react-native';

export const AlertIcon = ({ mostSevere }: { mostSevere: string }) => {
	return (
		<CircleAlert color="black" fill={mostSevere} />
	);
};

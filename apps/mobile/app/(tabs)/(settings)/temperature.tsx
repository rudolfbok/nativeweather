import { ScreenWrapper } from 'app/components/common/layout/ScreenWrapper';
import { TemperatureSelect } from 'app/components/settings/selectors/TemperatureSelect';

export default function TemperatureSreen() {
	return (
		<ScreenWrapper>
			<TemperatureSelect />
		</ScreenWrapper>
	);
}

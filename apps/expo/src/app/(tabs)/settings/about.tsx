import { AboutContent, ScreenWrapper } from '@nativeweather/ui';
import { openExternal } from '@/openExternal';

export default function AboutScreen() {
	return (
		<ScreenWrapper>
			<AboutContent openUrl={openExternal} />
		</ScreenWrapper>
	);
}

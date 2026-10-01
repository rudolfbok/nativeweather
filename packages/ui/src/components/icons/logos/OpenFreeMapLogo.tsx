import { Image, Platform } from 'react-native';
import OpenFreeMapLogoImage from '@nativeweather/ui/assets/openfreemaplogo.jpg';
import { SolitoImage } from 'solito/image';

export const OpenFreeMapLogo = () => {
	if (Platform.OS === 'macos') {
		return <Image source={OpenFreeMapLogoImage} style={{ width: 50, height: 50 }} />;
	}

	return <SolitoImage alt="OpenFreeMap" src={OpenFreeMapLogoImage} width={50} height={50} />;
};

import { Redirect } from 'expo-router';

// The map is web-only (see map.web.tsx); Expo Router still needs a route for every platform.
export default function MapModal() {
	return <Redirect href="/" />;
}

import { Redirect } from 'expo-router';

// The compass is web-only (see compass.web.tsx); Expo Router still needs a route for every platform.
export default function CompassScreen() {
	return <Redirect href="/" />;
}

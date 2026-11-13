import { BackIcon } from '../components/BackIcon';
import { Section } from '../components/Section';
import { Text } from '../components/Text';

const effectiveDate = 'September 15, 2026';

const PolicyPage = () => {
	return (
		<main className="min-h-dvh px-4 py-6 text-zinc-900 sm:px-8 dark:text-zinc-100">
			<title>Privacy Policy · NativeWeather</title>
			<article className="mx-auto max-w-3xl leading-7">
				<BackIcon />
				<Text as="h1" className="text-left text-3xl font-semibold tracking-tight sm:text-4xl">
					Privacy Policy
				</Text>
				<Text as="p" className="mt-3 text-left text-sm opacity-70">
					Effective date: {effectiveDate}
				</Text>

				<Text as="p" className="mt-8 text-left">
					This Privacy Policy explains how NativeWeather (“NativeWeather,” “we,” “us,” or “our”) handles information
					when you use the NativeWeather mobile, desktop, and web applications (the “Service”).
				</Text>

				<Section title="1. Information we handle">
					<Text as="p" className="text-left">
						<strong>Location information.</strong> If you enable a location-based feature, the Service may receive your
						approximate or precise device location. We use it to identify a place and request weather or air-quality
						information. You control this permission through your device settings.
					</Text>
					<Text as="p" className="text-left">
						<strong>Locations you search for or save.</strong> Search terms and saved locations may be processed to
						provide the requested weather information. Saved locations and preferences are intended to remain on your
						device unless a particular version of the Service expressly states otherwise.
					</Text>
					<Text as="p" className="text-left">
						<strong>Technical information.</strong> The Service and its hosting or infrastructure providers may process
						information such as IP address, device and browser type, operating-system version, crash information,
						timestamps, and basic request information as part of delivering, securing, and troubleshooting the Service.
					</Text>
					<Text as="p" className="text-left">
						We do not require an account or password for the core Service, and we do not intentionally collect names,
						contacts, photos, or payment information through the core Service.
					</Text>
				</Section>
				<Section title="2. How information is used">
					<Text as="p" className="text-left">
						We use information to provide weather, forecast, map, location search, and air-quality features; remember
						local preferences; keep the Service secure; diagnose errors; understand performance; and comply with legal
						obligations. We do not use weather-location data to make decisions about your eligibility for credit,
						housing, employment, insurance, or similar services.
					</Text>
				</Section>
				<Section title="3. Service providers and disclosures">
					<Text as="p" className="text-left">
						To provide the Service, relevant queries or coordinates may be sent to third-party providers, including
						WeatherAPI for weather and location services, Open-Meteo for air-quality data, and map-tile providers such
						as OpenFreeMap or WeatherAPI. These providers may process information under their own privacy policies. We
						may also use hosting, crash-reporting, security, or infrastructure providers that process limited technical
						information on our behalf.
					</Text>
					<Text as="p" className="text-left">
						We may disclose information when required by law, to protect the rights or safety of users or others, to
						investigate abuse, or in connection with a merger, acquisition, financing, or transfer of assets. We do not
						sell personal information.
					</Text>
				</Section>
				<Section title="4. Analytics and cookies">
					<Text as="p" className="text-left">
						The NativeWeather website may use Umami Analytics to understand aggregate website usage and improve the
						site. The mobile or desktop application may have different analytics behavior depending on the released
						version and platform. Browser storage or similar local technologies may be used to remember preferences and
						saved data. You can manage browser storage through your browser settings and device permissions through your
						operating-system settings.
					</Text>
				</Section>
				<Section title="5. Retention and security">
					<Text as="p" className="text-left">
						We retain information only for as long as reasonably necessary for the purposes described above, to resolve
						disputes, enforce our agreements, and meet legal requirements. No method of transmission or storage is
						completely secure, so we cannot guarantee absolute security.
					</Text>
				</Section>
				<Section title="6. Your choices and rights">
					<Text as="p" className="text-left">
						You can refuse or revoke location permission, clear saved locations and local app data, and stop using the
						Service. Depending on where you live, you may have rights to request access to, correction or deletion of,
						or information about the processing of your personal information, and to object to or restrict certain
						processing. Send requests to the contact below. We may need to verify a request and may have to retain some
						information where the law requires it.
					</Text>
				</Section>
				<Section title="7. Children">
					<Text as="p" className="text-left">
						The Service is not directed to children under 13 (or the minimum age required in your country). We do not
						knowingly collect personal information from children. If you believe a child has provided us with personal
						information, contact us so we can take appropriate action.
					</Text>
				</Section>
				<Section title="8. International processing">
					<Text as="p" className="text-left">
						We and our service providers may process information in countries other than the country where you live.
						Where required, we use appropriate safeguards for cross-border transfers.
					</Text>
				</Section>
				<Section title="9. Changes and contact">
					<Text as="p" className="text-left">
						We may update this Policy from time to time. We will post the new version here and update the effective
						date. Questions or privacy requests can be sent to:
					</Text>
					<Text as="p" className="text-left">
						<a className="underline underline-offset-4" href="mailto:[REPLACE-WITH-PRIVACY-EMAIL]">
							[REPLACE-WITH-PRIVACY-EMAIL]
						</a>
					</Text>
				</Section>

				<Text as="p" className="mt-10 border-t border-zinc-200 pt-5 text-left text-sm opacity-70 dark:border-zinc-800">
					This page is a general privacy-policy draft and is not legal advice. Replace the bracketed contact before
					publishing and confirm that the final text matches the data practices of every released app version.
				</Text>
			</article>
		</main>
	);
};

export default PolicyPage;

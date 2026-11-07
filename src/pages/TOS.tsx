import { BackIcon } from "../components/BackIcon";
import { Section } from "../components/Section";
import { Text } from "../components/Text";

const effectiveDate = "September 15, 2026";

const TOSPage = () => {
  return (
    <main className="min-h-dvh px-4 py-6 text-zinc-900 dark:text-zinc-100 sm:px-8">
      <title>Terms of Service · NativeWeather</title>
      <article className="mx-auto max-w-3xl leading-7">
        <BackIcon />
        <Text
          as="h1"
          className="text-left text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Terms of Service
        </Text>
        <Text as="p" className="mt-3 text-left text-sm opacity-70">
          Effective date: {effectiveDate}
        </Text>

        <Text as="p" className="mt-8 text-left">
          These Terms of Service (the “Terms”) govern your use of NativeWeather,
          including its mobile, desktop, and web applications (collectively, the
          “Service”). The Service is provided by NativeWeather (“we,” “us,” or
          “our”). By downloading, installing, accessing, or using the Service,
          you agree to these Terms. If you do not agree, do not use the Service.
        </Text>

        <Section title="1. The Service">
          <Text as="p" className="text-left">
            NativeWeather is a weather-information application that may provide
            current conditions, forecasts, location search, saved locations,
            maps, and air-quality information. Features can vary by platform,
            region, device, and app version. An internet connection may be
            required, and some features depend on third-party data services.
          </Text>
        </Section>
        <Section title="2. Weather information is not emergency guidance">
          <Text as="p" className="text-left">
            Weather, air-quality, map, and forecast information is provided for
            general informational purposes only. It may be delayed, incomplete,
            inaccurate, or unavailable. Do not rely on NativeWeather for
            emergency response, life-safety decisions, navigation, medical
            decisions, or protection of people or property. Follow official
            warnings and instructions from relevant local authorities and
            emergency services.
          </Text>
        </Section>
        <Section title="3. Eligibility and acceptable use">
          <Text as="p" className="text-left">
            You may use the Service only in compliance with applicable law. You
            must not misuse the Service, interfere with its operation, attempt
            to access it through unauthorized means, reverse engineer it except
            where applicable law expressly permits that activity, or use its
            data to create a competing service without permission.
          </Text>
        </Section>
        <Section title="4. Third-party services and content">
          <Text as="p" className="text-left">
            The Service may rely on third-party providers for weather forecasts,
            geocoding, air-quality information, map tiles, hosting, analytics,
            operating-system services, and other functionality. Those providers
            control their own services and terms. We do not guarantee the
            availability, accuracy, or continued operation of any third-party
            service, and third-party terms and privacy policies may also apply.
          </Text>
        </Section>
        <Section title="5. Permissions and your device">
          <Text as="p" className="text-left">
            The Service may request access to device location when you choose a
            location-based feature. You can deny or later revoke that permission
            in your device settings, although location-based features may then
            be unavailable. You are responsible for maintaining your device,
            operating system, network connection, and any charges imposed by
            your carrier or internet provider.
          </Text>
        </Section>
        <Section title="6. Intellectual property">
          <Text as="p" className="text-left">
            The Service, including its software, design, branding, and original
            content, is owned by or licensed to us and is protected by
            applicable intellectual-property laws. Subject to these Terms, we
            grant you a limited, non-exclusive, non-transferable, revocable
            license to use the Service for your personal, non-commercial use. No
            rights are granted except those expressly stated here.
          </Text>
        </Section>
        <Section title="7. Availability, disclaimers, and liability">
          <Text as="p" className="text-left">
            We may change, suspend, or discontinue all or part of the Service at
            any time. To the maximum extent permitted by law, the Service is
            provided “as is” and “as available,” without warranties of any kind,
            express or implied. We do not warrant that the Service will be
            uninterrupted, secure, error-free, or accurate. To the maximum
            extent permitted by law, we will not be liable for indirect,
            incidental, special, consequential, or punitive damages, or for loss
            resulting from reliance on weather or air-quality information.
            Nothing in these Terms excludes liability that cannot legally be
            excluded or limits your rights as a consumer.
          </Text>
        </Section>
        <Section title="8. Apple App Store terms">
          <Text as="p" className="text-left">
            If you obtained the Service through Apple’s App Store, these Terms
            are between you and NativeWeather, not Apple. Apple has no
            obligation to provide maintenance or support for the Service and is
            not responsible for addressing claims relating to the Service. To
            the extent required by the App Store terms, Apple and its
            subsidiaries are third-party beneficiaries of these Terms and may
            enforce them against you. Your use must also comply with the terms
            of the Apple Media Services and any other applicable App Store
            rules.
          </Text>
        </Section>
        <Section title="9. Changes and termination">
          <Text as="p" className="text-left">
            We may update these Terms from time to time. The updated version
            will be posted at this URL with a revised effective date. Your
            continued use after an update means you accept the updated Terms.
            You may stop using the Service at any time. We may suspend or end
            access if you materially breach these Terms or if needed to protect
            the Service, users, or others.
          </Text>
        </Section>
        <Section title="10. Contact">
          <Text as="p" className="text-left">
            Questions about these Terms can be sent to the Service operator at{" "}
            <a
              className="underline underline-offset-4"
              href="mailto:[REPLACE-WITH-SUPPORT-EMAIL]"
            >
              [REPLACE-WITH-SUPPORT-EMAIL]
            </a>
            .
          </Text>
        </Section>

        <Text
          as="p"
          className="mt-10 text-left border-t border-zinc-200 pt-5 text-sm opacity-70 dark:border-zinc-800"
        >
          This page is a general product terms draft and is not legal advice.
          Replace the bracketed contact before publishing.
        </Text>
      </article>
    </main>
  );
};

export default TOSPage;

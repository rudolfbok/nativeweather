import { defineConfig, journey, nextAppRouter, step } from 'screenatlas';

export default defineConfig({
	baseURL: 'http://localhost:3000',
	browser: { channel: 'chrome' },
	webServer: { command: 'pnpm dev --port 3000', timeout: 120_000 },
	tall: true,
	locale: 'en-US',
	timezoneId: 'Europe/Prague',
	seedRandom: true,
	hide: ['nextjs-portal'],
	profiles: {
		local: {
			setup: async ({ page, baseURL }) => {
				await page.goto(baseURL);
				await page.evaluate(() => {
					// Only the capture browser uses these preferences.
					localStorage.setItem('app-storage\\showLocalWeather', 'false');
					localStorage.setItem('app-storage\\currentTheme', 'light');
					localStorage.setItem('app-storage\\currentLang', 'en-US');
				});
			},
		},
	},
	journeys: [
		journey('browse', { title: 'Browse weather', profile: 'local' }, [
			step('home', '/', { title: 'Favorite cities' }),
			step('search', '/', {
				title: 'Search for Prague',
				do: async ({ page }) => {
					await page.getByRole('textbox').fill('Prague');
					await page.getByText('Prague', { exact: true }).first().waitFor();
				},
			}),
			step('city', '/prague', { title: 'Prague forecast' }),
		]),
		journey('tools', { title: 'Settings and tools', profile: 'local' }, [
			step('settings', '/', {
				title: 'Settings drawer',
				do: async ({ page }) => {
					await page.locator('.hamburger-react').first().click();
				},
			}),
			step('compass', '/compass', { title: 'Compass' }),
		]),
	],
	routes: nextAppRouter({ appDir: 'app' }),
	sources: {
		include: [
			'app',
			'../../packages/ui/src',
			'../../packages/core/src',
			'../../packages/api/src',
			'../../packages/types/src',
		],
	},
	changes: {
		'globals.css': 'all',
		'tailwind.config.*': 'all',
		'../../packages/tailwind-config/**': 'all',
	},
});

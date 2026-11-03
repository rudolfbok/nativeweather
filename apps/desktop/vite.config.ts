import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { rnw } from "vite-plugin-rnw";
import { uniwind } from "uniwind/vite";
// @ts-expect-error type error without @types/node package
import process from "node:process";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(() => ({
	plugins: [
		rnw(),
		tailwindcss(),
		uniwind({ cssEntryFile: "./src/global.css", dtsFile: "./src/uniwind-types.d.ts" }),
	],
	clearScreen: false,
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr: host
			? {
					protocol: "ws",
					host,
					port: 1421,
				}
			: undefined,
		watch: {
			ignored: ["**/src-tauri/**"],
		},
	},
}));

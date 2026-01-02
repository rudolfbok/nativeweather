const webpack = require("webpack");
const path = require("path");

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "react-native",
    "react-native-web",
    "react-native-css-interop",
    "react-native-mmkv",
    "react-native-nitro-modules",
    "nativewind",
    "burnt",
    "app",
  ],
  compiler: {
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
    },
  },
  reactStrictMode: false, // reanimated doesn't support this on web
  webpack(config, { isServer }) {
    // Only for the client (browser) bundle
    if (!isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          global: "window", // <-- this makes "global" point to window
        })
      );
    }
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      app: path.resolve(__dirname, "../../packages/app"),
      // "react-native-mmkv": false,
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.ts",
      ".web.tsx",
      ".web.js",
      ...config.resolve.extensions,
    ];
    return config;
  },
};

export default nextConfig;

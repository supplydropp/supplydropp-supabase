const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Transpile RN + NativeWind + your shared packages
  transpilePackages: [
    "nativewind",
    "react-native-css-interop",
    "react-native",
    "react-native-web",
    "@repo/ui",
    "@repo/store",
    "@repo/types",
    "@repo/lib",
  ],

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),

      // React Native → React Native Web
      "react-native$": "react-native-web",
      "react-native": "react-native-web",

      // Safe Area Context mock for web (so Next doesn't crash)
      "react-native-safe-area-context": path.resolve(__dirname, "./safe-area-mock.js"),

      // monorepo package aliases
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@repo/store": path.resolve(__dirname, "../../packages/store"),
      "@repo/types": path.resolve(__dirname, "../../packages/types"),
      "@repo/lib": path.resolve(__dirname, "../../packages/lib"),
    };
    return config;
  },

  turbopack: {
    resolveAlias: {
      "react-native": "react-native-web",
      "react-native-safe-area-context": "./safe-area-mock.js",
      "@repo/ui": "../../packages/ui/src",
      "@repo/store": "../../packages/store",
      "@repo/types": "../../packages/types",
      "@repo/lib": "../../packages/lib",
    },
  },

  outputFileTracingRoot: path.join(__dirname, "../../"),

  outputFileTracingExcludes: {
    "*": ["**/page_client-reference-manifest.js"],
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;

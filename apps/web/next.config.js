import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": require.resolve("react-native-web"),
      "react-native": require.resolve("react-native-web"),
    };
    return config;
  },
  experimental: {
    // 👇 Make Turbopack also respect the alias
    turbo: {
      resolveAlias: {
        "react-native": "react-native-web",
      },
    },
  },
};

export default nextConfig;
